import { FormEvent, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { answerJobQuestion } from '@/utils/jobAssistant';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

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

  const jobsQuery = useJobs({
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 100
  });

  const jobs = useMemo(() => jobsQuery.data?.jobs ?? [], [jobsQuery.data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (jobsQuery.isError) {
      setAnswer('I could not load your applications right now. Please try again in a moment.');
      return;
    }

    setAnswer(answerJobQuestion(question, jobs));
  };

  const applyQuestion = (value: string) => {
    setQuestion(value);

    if (jobsQuery.isError) {
      setAnswer('I could not load your applications right now. Please try again in a moment.');
      return;
    }

    setAnswer(answerJobQuestion(value, jobs));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Application Assistant" size="lg">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-300">
            Ask about your applications by status/priority and get quick answers from your data.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((item) => (
            <Button
              key={item}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => applyQuestion(item)}
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
            <Button type="submit" disabled={jobsQuery.isLoading || question.trim().length === 0}>
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
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-200">{answer}</pre>
          ) : (
            <p className="text-sm text-slate-400">Ask a question to see your summary here.</p>
          )}
        </section>
      </div>
    </Modal>
  );
};
