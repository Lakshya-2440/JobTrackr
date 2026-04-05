import { useEffect, useState } from 'react';
import { Menu, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDebounce } from '@/hooks/useDebounce';
import { useJobStore } from '@/store/jobStore';
import { useUiStore } from '@/store/uiStore';

interface NavbarProps {
  title: string;
}

export const DashboardNavbar = ({ title }: NavbarProps) => {
  const search = useJobStore((state) => state.search ?? '');
  const setSearch = useJobStore((state) => state.setSearch);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const openAddJob = useUiStore((state) => state.openAddJob);
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-400 shadow-sm transition hover:border-slate-600 hover:text-slate-200 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Job Search Command Center
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1 sm:min-w-[280px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by company or role..."
              className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 pl-10 pr-4 text-sm text-slate-100 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
            />
          </label>
          <Button onClick={() => openAddJob()}>
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </div>
      </div>
    </header>
  );
};
