import { useTranslation } from 'react-i18next';

export default function useValidationSchema(channels) {
  const { t } = useTranslation();

  return {
    required: t('modals.errors.required'),
    minLength: {
      value: 2,
      message: t('modals.errors.minLength'),
    },
    maxLength: {
      value: 20,
      message: t('modals.errors.maxLength'),
    },
    validate: (value) => {
      const isExist = !!channels.find((item) => item?.name === value);
      return !isExist || t('modals.errors.channelExist');
    },
  };
}
