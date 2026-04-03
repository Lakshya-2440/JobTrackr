import { create } from 'zustand';
import { JobStatus } from '@/types';

interface UiStoreState {
  isSidebarOpen: boolean;
  isAddJobOpen: boolean;
  addJobStatus?: JobStatus;
  jobDetailId: string | null;
  editingJobId: string | null;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openAddJob: (status?: JobStatus) => void;
  closeAddJob: () => void;
  openJobDetail: (jobId: string) => void;
  closeJobDetail: () => void;
  openEditJob: (jobId: string) => void;
  closeEditJob: () => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  isSidebarOpen: false,
  isAddJobOpen: false,
  addJobStatus: undefined,
  jobDetailId: null,
  editingJobId: null,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openAddJob: (status) => set({ isAddJobOpen: true, addJobStatus: status }),
  closeAddJob: () => set({ isAddJobOpen: false, addJobStatus: undefined }),
  openJobDetail: (jobDetailId) => set({ jobDetailId }),
  closeJobDetail: () => set({ jobDetailId: null }),
  openEditJob: (editingJobId) => set({ editingJobId }),
  closeEditJob: () => set({ editingJobId: null })
}));

