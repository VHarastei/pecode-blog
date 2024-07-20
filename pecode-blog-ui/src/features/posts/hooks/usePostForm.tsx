import { useState } from 'react';
import { IPostForm } from '@types';
import { useRouter } from 'next/router';
import { ROUTES } from '@constants/routes';
import { enqueueSnackbar } from 'notistack';

type Props = {
  initialValue: IPostForm;
  onSubmit: (payload: IPostForm) => void;
};

export const usePostForm = ({ initialValue, onSubmit }: Props) => {
  const router = useRouter();
  const [form, setForm] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleResetForm = () => {
    setForm(initialValue);
  };

  const handleSubmitForm = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(form);
    } catch (err) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(ROUTES.POSTS);
  };

  return {
    form,
    isSubmitting,
    onChangeForm: handleChangeForm,
    onSubmitForm: handleSubmitForm,
    onResetForm: handleResetForm,
    onCancel: handleCancel,
  };
};
