import { createHead } from '@unhead/react/client';
import { TemplateParamsPlugin } from '@unhead/react/plugins';

export const head = createHead({
  plugins: [TemplateParamsPlugin],
});
