import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationENUS from '@/i18n/locales/en-US/translation.json';
import translationRURU from '@/i18n/locales/ru-RU/translation.json';

export const ns = ['translation'] as const;
export const defaultNS = 'translation' as const;

export const resources = {
  'en-US': { translation: translationENUS },
  'ru-RU': { translation: translationRURU },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns,
    defaultNS,
    resources,

    fallbackLng: {
      default: ['en-US'],
      en: ['en-US'],
      ru: ['ru-RU'],
    },

    debug: process.env.NODE_ENV === 'development',
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
