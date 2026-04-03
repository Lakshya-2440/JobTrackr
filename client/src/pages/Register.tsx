import logo from '@/assets/logo.svg';
import { RegisterForm } from '@/components/forms/RegisterForm';

export const Register = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/30">
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <img src={logo} alt="Job Tracker" className="h-12 w-auto" />
      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
          Create your workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Build a calmer job search process
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Register to organize every role, recruiter, note, and next step in one place.
        </p>
      </div>

      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  </div>
);

