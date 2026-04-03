import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/auth.api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/errors';
import { registerSchema, RegisterFormValues } from '@/utils/validation';

const passwordClassName = 'pr-11';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }: RegisterFormValues) =>
      registerUser({ name, email, password }),
    onSuccess: (payload) => {
      setSession(payload);
      toast.success('Account created!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Unable to create account'));
    }
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) => registerMutation.mutate(values))}
    >
      <Input
        label="Name"
        placeholder="Your name"
        registration={register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        registration={register('email')}
        error={errors.email?.message}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a password"
          registration={register('password')}
          error={errors.password?.message}
          className={passwordClassName}
        />
        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="absolute right-3 top-[42px] text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Re-enter your password"
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          className={passwordClassName}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((value) => !value)}
          className="absolute right-3 top-[42px] text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
        >
          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <Button type="submit" fullWidth loading={registerMutation.isPending}>
        Create Account
      </Button>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

