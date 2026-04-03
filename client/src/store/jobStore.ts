import { create } from 'zustand';
import { JobFilters, JobSortBy, Priority, SortOrder } from '@/types';

interface JobStoreState extends JobFilters {
  sortBy: JobSortBy;
  order: SortOrder;
  page: number;
  limit: number;
  setSearch: (search: string) => void;
  setStatus: (status?: JobFilters['status']) => void;
  setPriority: (priority?: Priority) => void;
  setSortBy: (sortBy: JobSortBy) => void;
  setOrder: (order: SortOrder) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useJobStore = create<JobStoreState>((set) => ({
  search: '',
  status: undefined,
  priority: undefined,
  sortBy: 'createdAt',
  order: 'desc',
  page: 1,
  limit: 20,
  setSearch: (search) => set({ search, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPriority: (priority) => set({ priority, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setOrder: (order) => set({ order }),
  setPage: (page) => set({ page }),
  resetFilters: () =>
    set({
      search: '',
      status: undefined,
      priority: undefined,
      sortBy: 'createdAt',
      order: 'desc',
      page: 1,
      limit: 20
    })
}));

