import { PropsWithChildren } from 'react';
import { AddJobForm } from '@/components/forms/AddJobForm';
import { DashboardNavbar } from '@/components/layout/DashboardNavbar';
import { Sidebar } from '@/components/layout/Sidebar';

interface PageWrapperProps extends PropsWithChildren {
  title: string;
}

export const PageWrapper = ({ title, children }: PageWrapperProps) => (
  <div className="min-h-screen bg-[#090909] text-white">
    <Sidebar />
    <div className="lg:pl-72">
      <DashboardNavbar title={title} />
      <main className="px-4 py-6 lg:px-8">{children}</main>
    </div>
    <AddJobForm />
  </div>
);
