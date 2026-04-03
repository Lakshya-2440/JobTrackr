import { useState } from 'react';
import { LogOut, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useUiStore } from '@/store/uiStore';
import { NAV_ITEMS } from '@/utils/constants';
import { cn } from '@/utils/cn';
import { getErrorMessage } from '@/utils/errors';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const { isSidebarOpen, closeSidebar } = useUiStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success('Signed out');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Unable to sign out'));
    } finally {
      setIsLoggingOut(false);
    }
  };

  const initials =
    user?.name
      ?.split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'JT';

  return (
    <>
      <button
        aria-label="Close sidebar backdrop"
        onClick={closeSidebar}
        className={cn(
          'fixed inset-0 z-30 bg-slate-950/30 transition-opacity lg:hidden',
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white p-4 shadow-soft transition-transform dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0 lg:shadow-none',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between">
          <img src={logo} alt="Job Tracker" className="h-10 w-auto" />
          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {user?.name ?? 'Guest'}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.email ?? 'No email'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            fullWidth
            className="mt-4 justify-start"
            onClick={handleLogout}
            loading={isLoggingOut}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

