interface LoadingScreenProps {
  label?: string;
  compact?: boolean;
}

export const LoadingScreen = ({
  label = 'Loading your workspace...',
  compact = false
}: LoadingScreenProps) => (
  <div
    className={
      compact
        ? 'flex min-h-[240px] items-center justify-center'
        : 'flex min-h-screen items-center justify-center bg-[#090909]'
    }
  >
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-400" />
      <p className="text-sm font-medium text-slate-400">{label}</p>
    </div>
  </div>
);

