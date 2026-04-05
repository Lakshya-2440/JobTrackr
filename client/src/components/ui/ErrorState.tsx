interface ErrorStateProps {
  title?: string;
  description: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  description
}: ErrorStateProps) => (
  <div className="rounded-2xl border border-rose-900/50 bg-rose-950/30 p-5 text-sm text-rose-300">
    <p className="font-semibold">{title}</p>
    <p className="mt-1">{description}</p>
  </div>
);

