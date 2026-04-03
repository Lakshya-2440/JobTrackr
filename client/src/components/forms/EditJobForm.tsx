import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useJob, useUpdateJob } from '@/hooks/useJobs';
import { useUiStore } from '@/store/uiStore';
import { createJobSchema, JobFormValues, toJobPayload } from '@/utils/validation';
import { getDefaultJobFormValues, mapJobToFormValues } from './jobForm.utils';
import { JobFormFields } from './JobFormFields';

export const EditJobForm = () => {
  const { editingJobId, closeEditJob } = useUiStore();
  const jobQuery = useJob(editingJobId ?? undefined);
  const updateMutation = useUpdateJob();
  const form = useForm<JobFormValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: getDefaultJobFormValues()
  });

  useEffect(() => {
    if (jobQuery.data) {
      form.reset(mapJobToFormValues(jobQuery.data));
    }
  }, [form, jobQuery.data]);

  const handleClose = () => {
    closeEditJob();
    form.reset(getDefaultJobFormValues());
  };

  const handleSubmit = async (values: JobFormValues) => {
    if (!editingJobId) {
      return;
    }

    await updateMutation.mutateAsync({
      id: editingJobId,
      payload: toJobPayload(values)
    });

    handleClose();
  };

  return (
    <Modal isOpen={Boolean(editingJobId)} onClose={handleClose} title="Edit application" size="xl">
      {jobQuery.isLoading ? (
        <LoadingScreen compact label="Loading job details..." />
      ) : jobQuery.isError ? (
        <ErrorState description="We couldn't load this application. Try again in a moment." />
      ) : (
        <JobFormFields
          form={form}
          onSubmit={handleSubmit}
          submitLabel="Update Job"
          isSubmitting={updateMutation.isPending}
          onCancel={handleClose}
        />
      )}
    </Modal>
  );
};

