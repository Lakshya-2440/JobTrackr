import logo from '@/assets/logo.svg';
import { RegisterForm } from '@/components/forms/RegisterForm';

export const Register = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#090909] px-4">
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-soft backdrop-blur">
      <div className="flex items-center gap-3">
        <img src={logo} alt="JobTrackr" className="h-10 w-auto" />
        <span className="font-display text-2xl text-white">JobTrackr</span>
      </div>
      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
          Create your workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Build a calmer job search process
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Register to organize every role, recruiter, note, and next step in one place.
        </p>
      </div>

      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  </div>
);

