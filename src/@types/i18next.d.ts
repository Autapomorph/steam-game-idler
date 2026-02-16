import { defaultNS } from '@/i18n/i18n';
import translation from '@/i18n/locales/en-US/translation.json';

const resources = {
  translation,
};

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources;
    defaultNS: typeof defaultNS;
    enableSelector: true,
  }
}
