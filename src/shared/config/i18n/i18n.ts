import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { config } from '../env';
import translationENUS from './locales/en-US/translation.json';
import translationRU from './locales/ru/translation.json';

export const ns = ['translation'] as const;
export const defaultNS = 'translation' as const;

export const resources = {
  'en-US': { translation: translationENUS },
  'ru-RU': { translation: translationRU },
} as const;

export const initI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: config.isDev,

      ns,
      defaultNS,
      resources,

      partialBundledLanguages: true,

      fallbackLng: {
        default: ['en-US'],
        en: ['en-US'],
        ru: ['ru-RU'],
        be: ['ru-RU'],
        uk: ['ru-RU'],
        kk: ['ru-RU'],
      },

      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'locale',
        caches: ['localStorage'],
      },

      interpolation: {
        escapeValue: false,
      },
    });
};
