import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationENUS from '@/i18n/locales/en-US/translation.json';
import translationRU from '@/i18n/locales/ru/translation.json';

export const resources = {
  'en-US': { translation: translationENUS },
  ru: { translation: translationRU },
};

export const ns = ['translation'] as const;

export const defaultNS = 'translation' as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV === 'development',

    ns,
    defaultNS,
    partialBundledLanguages: true,

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
