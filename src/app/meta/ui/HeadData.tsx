import { useHead } from '@unhead/react';
import { useTranslation } from 'react-i18next';

export const HeadData = () => {
  const { t, i18n } = useTranslation();
  const { resolvedLanguage } = i18n;

  useHead({
    htmlAttrs: {
      lang: resolvedLanguage,
    },
    titleTemplate: '%s %separator %siteName',
    templateParams: {
      separator: '—',
      siteName: t($ => $.app_name),
    },
    meta: [
      {
        name: 'description',
        content: t($ => $.app_name),
      },
    ],
  });

  return null;
};
