export type JobStatus = 'WISHLIST' | 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type SortOrder = 'asc' | 'desc';
export type JobSortBy =
  | 'createdAt'
  | 'updatedAt'
  | 'company'
  | 'position'
  | 'appliedDate'
  | 'followUpDate'
  | 'priority'
  | 'status';

export interface IContact {
  id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
}

export interface IJob {
  id: string;
  userId: string;
  company: string;
  position: string;
  status: JobStatus;
  priority: Priority;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  jobUrl?: string;
  description?: string;
  notes?: string;
  resumeUrl?: string;
  appliedDate?: string;
  followUpDate?: string;
  tags: string[];
  contacts: IContact[];
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[] | undefined>;
}

export interface PaginatedResponse<T> {
  jobs: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AnalyticsSummary {
  totalApplications: number;
  byStatus: Record<JobStatus, number>;
  byPriority: Record<Priority, number>;
  applicationsByMonth: { month: string; count: number }[];
  responseRate: number;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
}

export interface JobFilters {
  status?: JobStatus;
  priority?: Priority;
  search?: string;
  sortBy?: JobSortBy;
  order?: SortOrder;
  page?: number;
  limit?: number;
}

export interface JobPayload {
  company: string;
  position: string;
  status?: JobStatus;
  priority?: Priority;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  jobUrl?: string;
  description?: string;
  notes?: string;
  resumeUrl?: string;
  appliedDate?: string;
  followUpDate?: string;
  tags?: string[];
}

