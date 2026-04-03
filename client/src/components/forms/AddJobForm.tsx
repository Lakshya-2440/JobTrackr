import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { useCreateJob } from '@/hooks/useJobs';
import { useUiStore } from '@/store/uiStore';
import { createJobSchema, JobFormValues, toJobPayload } from '@/utils/validation';
import { getDefaultJobFormValues } from './jobForm.utils';
import { JobFormFields } from './JobFormFields';

export const AddJobForm = () => {
  const { isAddJobOpen, addJobStatus, closeAddJob } = useUiStore();
  const createMutation = useCreateJob();
  const form = useForm<JobFormValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: getDefaultJobFormValues()
  });

  useEffect(() => {
    if (isAddJobOpen) {
      form.reset(getDefaultJobFormValues(addJobStatus));
    }
  }, [addJobStatus, form, isAddJobOpen]);

  const handleClose = () => {
    closeAddJob();
    form.reset(getDefaultJobFormValues());
  };

  const handleSubmit = async (values: JobFormValues) => {
    await createMutation.mutateAsync(toJobPayload(values));
    handleClose();
  };

  return (
    <Modal isOpen={isAddJobOpen} onClose={handleClose} title="Add job application" size="xl">
      <JobFormFields
        form={form}
        onSubmit={handleSubmit}
        submitLabel="Save Job"
        isSubmitting={createMutation.isPending}
        onCancel={handleClose}
      />
    </Modal>
  );
};

