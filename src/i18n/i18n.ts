import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationENUS from '@/i18n/locales/en-US/translation.json';
import translationRURU from '@/i18n/locales/ru-RU/translation.json';

export const ns = ['translation'] as const;
export const defaultNS = 'translation' as const;

export const resources = {
  'en-US': { translation: translationENUS },
  'ru-RU': { translation: translationRURU },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',

    ns,
    defaultNS,
    resources,

    partialBundledLanguages: true,

    fallbackLng: {
      default: ['en-US'],
      en: ['en-US'],
      ru: ['ru-RU'],
    },

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
