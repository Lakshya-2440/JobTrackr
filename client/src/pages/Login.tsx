import logo from '@/assets/logo.svg';
import { LoginForm } from '@/components/forms/LoginForm';

export const Login = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#090909] px-4">
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-soft backdrop-blur">
      <img src={logo} alt="JobTrackr" className="h-12 w-auto" />
      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Stay on top of every application
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Sign in to manage your pipeline, reminders, and analytics.
        </p>
      </div>

      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  </div>
);

