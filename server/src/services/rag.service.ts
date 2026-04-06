import crypto from 'crypto';
import { JobStatus, Prisma, Priority } from '@prisma/client';
import { env } from '../config/env';
import { prisma } from '../config/prisma';
import { ApiError } from '../utils/ApiError';

type JobWithContacts = Prisma.JobGetPayload<{
  include: { contacts: true };
}>;

type AssistantDocumentRecord = Awaited<ReturnType<typeof prisma.assistantDocument.findMany>>[number];

type RagSource = {
  jobId: string;
  company: string;
  position: string;
  status: JobStatus;
  priority: Priority;
  score: number;
};

type AssistantResult = {
  answer: string;
  mode: 'rag' | 'fallback';
  sources: RagSource[];
};

const isRagEnabled = () => Boolean(env.OPENAI_API_KEY?.trim());

const sha256 = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

const chunkArray = <T,>(items: T[], size: number) => {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const openAiFetch = async <T>(path: string, body: Record<string, unknown>) => {
  if (!env.OPENAI_API_KEY) {
    throw new ApiError(503, 'Assistant is not configured');
  }

  const response = await fetch(`https://api.openai.com/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new ApiError(response.status, payload?.error?.message || 'OpenAI request failed');
  }

  return (await response.json()) as T;
};

const formatMoney = (min?: number | null, max?: number | null, currency?: string | null) => {
  if (min === undefined && max === undefined) {
    return null;
  }

  const resolvedCurrency = (currency?.trim() || 'USD').toUpperCase();

  let formatter: Intl.NumberFormat | null = null;

  try {
    formatter = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: resolvedCurrency,
      maximumFractionDigits: 0
    });
  } catch {
    formatter = null;
  }

  const formatValue = (value: number) =>
    formatter ? formatter.format(value) : `${resolvedCurrency} ${value.toLocaleString('en')}`;

  if (typeof min === 'number' && typeof max === 'number') {
    return `${formatValue(min)} - ${formatValue(max)}`;
  }

  if (typeof min === 'number') {
    return `From ${formatValue(min)}`;
  }

  return `Up to ${formatValue(max as number)}`;
};

const buildJobDocument = (job: JobWithContacts) => {
  const lines = [
    `Company: ${job.company}`,
    `Position: ${job.position}`,
    `Status: ${job.status}`,
    `Priority: ${job.priority}`,
    job.location ? `Location: ${job.location}` : null,
    formatMoney(job.salaryMin, job.salaryMax, job.salaryCurrency) ? `Salary: ${formatMoney(job.salaryMin, job.salaryMax, job.salaryCurrency)}` : null,
    job.appliedDate ? `Applied date: ${job.appliedDate.toISOString()}` : null,
    job.followUpDate ? `Follow up date: ${job.followUpDate.toISOString()}` : null,
    job.jobUrl ? `Job URL: ${job.jobUrl}` : null,
    job.tags.length > 0 ? `Tags: ${job.tags.join(', ')}` : null,
    job.description ? `Description: ${job.description}` : null,
    job.notes ? `Notes: ${job.notes}` : null,
    job.contacts.length > 0
      ? `Contacts: ${job.contacts
          .map((contact) => [contact.name, contact.role, contact.email, contact.phone].filter(Boolean).join(' | '))
          .join('; ')}`
      : null
  ].filter(Boolean);

  return lines.join('\n');
};

const buildAssistantPrompt = (question: string, context: string) => [
  'You are a job search copilot for a single user.',
  'Use only the supplied context from the user\'s job tracker.',
  'If the context does not contain enough information, say so plainly.',
  'Be concise, practical, and accurate.',
  'When useful, mention the relevant jobs by company and position.',
  `Question: ${question}`,
  '',
  'Context:',
  context
].join('\n');

const normalizeText = (value: string) => value.toLowerCase().trim();

const getFallbackAnswer = (question: string, jobs: JobWithContacts[]) => {
  const q = normalizeText(question);

  if (!q) {
    return 'Please ask a question about your applications.';
  }

  if (jobs.length === 0) {
    return 'You do not have any applications yet. Add some jobs first, then I can answer questions about them.';
  }

  const wantsCount = /(how many|count|number|total|breakdown|distribution)/.test(q);
  const wantsList = /(which|list|show|ones|what are)/.test(q);
  const statusOrder: JobStatus[] = ['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'];
  const priorityOrder: Priority[] = ['HIGH', 'MEDIUM', 'LOW'];

  const selectedStatus = statusOrder.find((status) => q.includes(status.toLowerCase()));
  const selectedPriority = priorityOrder.find((priority) => q.includes(priority.toLowerCase()));

  const formatJobs = (items: JobWithContacts[]) =>
    items.slice(0, 8).map((job) => `- ${job.company} - ${job.position}`).join('\n') || 'None.';

  if (selectedStatus) {
    const filtered = jobs.filter((job) => job.status === selectedStatus);

    if (wantsCount && !wantsList) {
      return `${selectedStatus}: ${filtered.length} application(s).`;
    }

    return `${selectedStatus} (${filtered.length}):\n${formatJobs(filtered)}`;
  }

  if (selectedPriority) {
    const filtered = jobs.filter((job) => job.priority === selectedPriority);

    if (wantsCount && !wantsList) {
      return `${selectedPriority} priority: ${filtered.length} application(s).`;
    }

    return `${selectedPriority} priority (${filtered.length}):\n${formatJobs(filtered)}`;
  }

  if (wantsCount || q.includes('summary')) {
    const breakdown = statusOrder.map((status) => `${status}: ${jobs.filter((job) => job.status === status).length}`).join('\n');
    return `You have ${jobs.length} total application(s).\n\nBy status:\n${breakdown}`;
  }

  if (wantsList || q.includes('all applications')) {
    return `All applications (${jobs.length}):\n${formatJobs(jobs)}`;
  }

  return [
    'I can help with your application counts and lists.',
    'Try asking:',
    '- How many applications are in each status?',
    '- Which ones are in interview?',
    '- Which jobs are high priority?'
  ].join('\n');
};

const getEmbedding = async (text: string) => {
  const result = await openAiFetch<{
    data: Array<{ embedding: number[] }>;
  }>('/embeddings', {
    model: env.OPENAI_EMBEDDING_MODEL,
    input: text
  });

  const embedding = result.data[0]?.embedding;

  if (!embedding) {
    throw new ApiError(500, 'Failed to generate embedding');
  }

  return embedding;
};

const cosineSimilarity = (left: number[], right: number[]) => {
  const length = Math.min(left.length, right.length);
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (let index = 0; index < length; index += 1) {
    const leftValue = left[index];
    const rightValue = right[index];
    dot += leftValue * rightValue;
    leftMagnitude += leftValue * leftValue;
    rightMagnitude += rightValue * rightValue;
  }

  if (leftMagnitude === 0 || rightMagnitude === 0) {
    return 0;
  }

  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
};

const upsertDocumentForJob = async (jobId: string) => {
  if (!isRagEnabled()) {
    return;
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { contacts: true }
  });

  if (!job) {
    return;
  }

  const content = buildJobDocument(job);
  const contentHash = sha256(content);
  const existingDocument = await prisma.assistantDocument.findUnique({
    where: { jobId },
    select: { contentHash: true }
  });

  if (existingDocument?.contentHash === contentHash) {
    return;
  }

  const embedding = await getEmbedding(content);

  await prisma.assistantDocument.upsert({
    where: { jobId },
    create: {
      jobId: job.id,
      userId: job.userId,
      title: `${job.company} · ${job.position}`,
      content,
      contentHash,
      status: job.status,
      priority: job.priority,
      embedding
    },
    update: {
      userId: job.userId,
      title: `${job.company} · ${job.position}`,
      content,
      contentHash,
      status: job.status,
      priority: job.priority,
      embedding
    }
  });
};

const deleteDocumentForJob = async (jobId: string) => {
  if (!isRagEnabled()) {
    return;
  }

  await prisma.assistantDocument.deleteMany({
    where: { jobId }
  });
};

const syncDocumentsForUser = async (userId: string) => {
  if (!isRagEnabled()) {
    return;
  }

  const [jobs, documents] = await Promise.all([
    prisma.job.findMany({
      where: { userId },
      include: { contacts: true },
      orderBy: { updatedAt: 'desc' }
    }),
    prisma.assistantDocument.findMany({
      where: { userId },
      select: { jobId: true, contentHash: true }
    })
  ]);

  const documentMap = new Map(documents.map((document) => [document.jobId, document.contentHash]));
  const staleJobs = jobs.filter((job) => documentMap.get(job.id) !== sha256(buildJobDocument(job)));

  for (const batch of chunkArray(staleJobs, 4)) {
    await Promise.all(batch.map((job) => upsertDocumentForJob(job.id)));
  }
};

const retrieveRelevantDocuments = async (userId: string, question: string) => {
  const queryEmbedding = await getEmbedding(question);

  const documents = await prisma.assistantDocument.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' }
  });

  const ranked = documents
    .map((document) => ({
      document,
      score: cosineSimilarity(queryEmbedding, document.embedding)
    }))
    .sort((left, right) => right.score - left.score);

  return ranked.slice(0, env.RAG_TOP_K).filter((item) => item.score > 0.1);
};

const generateRagAnswer = async (question: string, sources: Array<{ document: AssistantDocumentRecord; score: number }>) => {
  const context = sources
    .map((item, index) => [
      `Source ${index + 1}: ${item.document.title}`,
      `Status: ${item.document.status}`,
      `Priority: ${item.document.priority}`,
      `Relevance: ${item.score.toFixed(3)}`,
      item.document.content
    ].join('\n'))
    .join('\n\n---\n\n');

  const result = await openAiFetch<{
    choices: Array<{ message: { content?: string } }>;
  }>('/chat/completions', {
    model: env.OPENAI_CHAT_MODEL,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: [
          'You are a job search copilot.',
          'Answer only from the supplied context.',
          'If the context is insufficient, say so plainly.',
          'Be concise, useful, and factual.',
          'Mention source companies and positions when relevant.'
        ].join(' ')
      },
      {
        role: 'user',
        content: `Question: ${question}\n\nContext:\n${context}`
      }
    ]
  });

  const answer = result.choices[0]?.message?.content?.trim();

  if (!answer) {
    throw new ApiError(500, 'Assistant did not return an answer');
  }

  return answer;
};

export const ragService = {
  upsertJobDocument: upsertDocumentForJob,
  deleteJobDocument: deleteDocumentForJob,

  async answerQuestion(userId: string, question: string): Promise<AssistantResult> {
    const normalizedQuestion = question.trim();

    if (!normalizedQuestion) {
      throw new ApiError(400, 'Question is required');
    }

    const jobs = await prisma.job.findMany({
      where: { userId },
      include: { contacts: true },
      orderBy: { updatedAt: 'desc' }
    });

    if (!isRagEnabled()) {
      return {
        answer: getFallbackAnswer(normalizedQuestion, jobs),
        mode: 'fallback',
        sources: []
      };
    }

    await syncDocumentsForUser(userId);

    const retrieved = await retrieveRelevantDocuments(userId, normalizedQuestion);

    if (retrieved.length === 0) {
      return {
        answer: getFallbackAnswer(normalizedQuestion, jobs),
        mode: 'fallback',
        sources: []
      };
    }

    try {
      const answer = await generateRagAnswer(normalizedQuestion, retrieved);

      return {
        answer,
        mode: 'rag',
        sources: retrieved.map(({ document, score }) => ({
          jobId: document.jobId,
          company: document.title.split(' · ')[0] ?? document.title,
          position: document.title.split(' · ')[1] ?? '',
          status: document.status,
          priority: document.priority,
          score
        }))
      };
    } catch {
      return {
        answer: getFallbackAnswer(normalizedQuestion, jobs),
        mode: 'fallback',
        sources: retrieved.map(({ document, score }) => ({
          jobId: document.jobId,
          company: document.title.split(' · ')[0] ?? document.title,
          position: document.title.split(' · ')[1] ?? '',
          status: document.status,
          priority: document.priority,
          score
        }))
      };
    }
  }
};
