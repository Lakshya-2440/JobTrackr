import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { uploadResume } from '@/api/jobs.api';
import { getErrorMessage } from '@/utils/errors';
import { JOB_STATUSES, PRIORITY_OPTIONS, PRIORITY_LABELS, STATUS_LABELS } from '@/utils/constants';
import { JobFormValues, parseTagsInput } from '@/utils/validation';

interface JobFormFieldsProps {
  form: UseFormReturn<JobFormValues>;
  onSubmit: (values: JobFormValues) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
  onCancel: () => void;
}

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-900/40';

const extractResumeLabel = (resumeUrl?: string) => {
  if (!resumeUrl) {
    return '';
  }

  const segments = resumeUrl.split('/');
  const fileName = segments[segments.length - 1];
  return decodeURIComponent(fileName.split('?')[0] ?? 'Uploaded resume');
};

export const JobFormFields = ({
  form,
  onSubmit,
  submitLabel,
  isSubmitting,
  onCancel
}: JobFormFieldsProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = form;
  const [tagsInput, setTagsInput] = useState((watch('tags') ?? []).join(', '));
  const [resumeLabel, setResumeLabel] = useState(extractResumeLabel(watch('resumeUrl')));
  const watchedTags = watch('tags') ?? [];
  const watchedResumeUrl = watch('resumeUrl');

  useEffect(() => {
    setTagsInput(watchedTags.join(', '));
  }, [watchedTags.join('|')]);

  useEffect(() => {
    if (!watchedResumeUrl) {
      setResumeLabel('');
      return;
    }

    if (!resumeLabel) {
      setResumeLabel(extractResumeLabel(watchedResumeUrl));
    }
  }, [resumeLabel, watchedResumeUrl]);

  const uploadMutation = useMutation({
    mutationFn: uploadResume
  });

  const tagsPreview = watchedTags.filter(Boolean);

  const handleResumeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const toastId = toast.loading('Uploading resume...');

    try {
      const result = await uploadMutation.mutateAsync(file);
      setValue('resumeUrl', result.url, { shouldDirty: true, shouldValidate: true });
      setResumeLabel(file.name);
      toast.success('Resume uploaded', { id: toastId });
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to upload resume'), { id: toastId });
    } finally {
      event.target.value = '';
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('resumeUrl')} />

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Company*"
          placeholder="Acme Inc."
          registration={register('company')}
          error={errors.company?.message}
        />
        <Input
          label="Position*"
          placeholder="Frontend Engineer"
          registration={register('position')}
          error={errors.position?.message}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <span>Status</span>
          <select className={fieldClassName} {...register('status')}>
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <span>Priority</span>
          <select className={fieldClassName} {...register('priority')}>
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Location"
          placeholder="Remote / New York, NY"
          registration={register('location')}
          error={errors.location?.message}
        />
        <Input
          label="Currency"
          placeholder="USD"
          registration={register('salaryCurrency')}
          error={errors.salaryCurrency?.message}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Salary Min"
          type="number"
          placeholder="90000"
          registration={register('salaryMin', {
            setValueAs: (value) => (value === '' ? undefined : Number(value))
          })}
          error={errors.salaryMin?.message}
        />
        <Input
          label="Salary Max"
          type="number"
          placeholder="120000"
          registration={register('salaryMax', {
            setValueAs: (value) => (value === '' ? undefined : Number(value))
          })}
          error={errors.salaryMax?.message}
        />
      </div>

      <Input
        label="Job URL"
        type="url"
        placeholder="https://company.com/jobs/123"
        registration={register('jobUrl')}
        error={errors.jobUrl?.message}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Applied Date"
          type="date"
          registration={register('appliedDate')}
          error={errors.appliedDate?.message}
        />
        <Input
          label="Follow Up Date"
          type="date"
          registration={register('followUpDate')}
          error={errors.followUpDate?.message}
        />
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <span>Tags</span>
        <input
          type="text"
          value={tagsInput}
          onChange={(event) => {
            const nextValue = event.target.value;
            setTagsInput(nextValue);
            setValue('tags', parseTagsInput(nextValue), { shouldDirty: true });
          }}
          placeholder="remote, referral, fintech"
          className={fieldClassName}
        />
        {tagsPreview.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tagsPreview.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <span>Description</span>
        <textarea
          rows={4}
          className={fieldClassName}
          placeholder="Paste the role description or key highlights."
          {...register('description')}
        />
        {errors.description?.message && (
          <span className="text-xs font-medium text-rose-500">{errors.description.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <span>Notes</span>
        <textarea
          rows={4}
          className={fieldClassName}
          placeholder="Interview prep notes, recruiter feedback, or next steps."
          {...register('notes')}
        />
        {errors.notes?.message && (
          <span className="text-xs font-medium text-rose-500">{errors.notes.message}</span>
        )}
      </label>

      <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Resume Upload</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              PDF, DOC, or DOCX up to 5MB.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
            <Upload className="h-4 w-4" />
            {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
            />
          </label>
        </div>

        {resumeLabel && (
          <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-sm dark:bg-slate-950">
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900 dark:text-white">{resumeLabel}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                Resume attached to this application
              </p>
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              onClick={() => {
                setValue('resumeUrl', '', { shouldDirty: true, shouldValidate: true });
                setResumeLabel('');
              }}
              aria-label="Remove resume"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end dark:border-slate-800">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
