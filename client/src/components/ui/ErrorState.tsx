interface ErrorStateProps {
  title?: string;
  description: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  description
}: ErrorStateProps) => (
  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
    <p className="font-semibold">{title}</p>
    <p className="mt-1">{description}</p>
  </div>
);

