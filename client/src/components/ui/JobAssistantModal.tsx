import { FormEvent, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Sparkles } from 'lucide-react';
import { askAssistant } from '@/api/assistant.api';
import { useJobs } from '@/hooks/useJobs';
import { answerJobQuestion } from '@/utils/jobAssistant';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { AssistantResponse } from '@/types';

interface JobAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  'How many applications are in each status?',
  'How many applications are in each priority?',
  'Which ones are in interview?'
] as const;

export const JobAssistantModal = ({ isOpen, onClose }: JobAssistantModalProps) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<AssistantResponse['sources']>([]);
  const [mode, setMode] = useState<AssistantResponse['mode']>('fallback');

  const jobsQuery = useJobs({
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 100
  });
  const assistantMutation = useMutation({
    mutationFn: askAssistant
  });

  const jobs = useMemo(() => jobsQuery.data?.jobs ?? [], [jobsQuery.data]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (jobsQuery.isError) {
      setAnswer('I could not load your applications right now. Please try again in a moment.');
      setSources([]);
      setMode('fallback');
      return;
    }

    try {
      const result = await assistantMutation.mutateAsync(question);
      setAnswer(result.answer);
      setSources(result.sources);
      setMode(result.mode);
    } catch {
      setAnswer(answerJobQuestion(question, jobs));
      setSources([]);
      setMode('fallback');
    }
  };

  const applyQuestion = async (value: string) => {
    setQuestion(value);

    if (jobsQuery.isError) {
      setAnswer('I could not load your applications right now. Please try again in a moment.');
      setSources([]);
      setMode('fallback');
      return;
    }

    try {
      const result = await assistantMutation.mutateAsync(value);
      setAnswer(result.answer);
      setSources(result.sources);
      setMode(result.mode);
    } catch {
      setAnswer(answerJobQuestion(value, jobs));
      setSources([]);
      setMode('fallback');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Application Assistant" size="lg">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-300">
            Ask about your applications and get retrieval-backed answers from your own data.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((item) => (
            <Button
              key={item}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void applyQuestion(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-300" htmlFor="rag-question">
            Your question
          </label>
          <textarea
            id="rag-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="e.g. Which ones are in Applied status?"
            className="min-h-[110px] w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
          />
          <div className="flex items-center justify-end">
            <Button
              type="submit"
              loading={assistantMutation.isPending || jobsQuery.isLoading}
              disabled={jobsQuery.isLoading || question.trim().length === 0}
            >
              <Sparkles className="h-4 w-4" />
              Ask Assistant
            </Button>
          </div>
        </form>

        <section className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
          <p className="mb-2 text-sm font-semibold text-white">Answer</p>
          {jobsQuery.isLoading ? (
            <p className="text-sm text-slate-400">Loading your applications...</p>
          ) : jobsQuery.isError ? (
            <p className="text-sm text-rose-300">
              I could not load your applications right now. Please try again in a moment.
            </p>
          ) : answer ? (
            <div className="space-y-4">
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-200">{answer}</pre>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                <span className="rounded-full border border-slate-700 px-2 py-1">{mode}</span>
                <span>{sources.length} source(s)</span>
              </div>
              {sources.length > 0 && (
                <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-slate-300">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Sources
                  </p>
                  {sources.map((source) => (
                    <div key={source.jobId} className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-white">
                          {source.company} · {source.position}
                        </p>
                        <p className="text-xs text-slate-500">
                          {source.status} · {source.priority}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">{source.score.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Ask a question to see your summary here.</p>
          )}
        </section>
      </div>
    </Modal>
  );
};
