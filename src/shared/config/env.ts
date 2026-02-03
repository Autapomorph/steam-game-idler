import { z } from 'zod';

const validationSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  DEV: z.boolean(),
  PROD: z.boolean(),
  VITE_STEAM_DEV_ACCOUNTS: z
    .string()
    .optional()
    .transform(val => {
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val);
          if (!Array.isArray(parsed)) {
            throw new Error('Not an array');
          }

          return parsed as string[];
        } catch {
          throw new Error('VITE_STEAM_DEV_ACCOUNTS must be a valid JSON string array');
        }
      }

      return val;
    })
    .pipe(z.array(z.string())),
});

const validatedConfig = validationSchema.parse(import.meta.env);

export interface AppConfig {
  MODE: 'production' | 'development' | 'test';
  isProd: boolean;
  isDev: boolean;
  isTest: boolean;
  devAccountIds: string[];
}

const getConfig = (): AppConfig => {
  return {
    MODE: validatedConfig.MODE,
    isProd: validatedConfig.PROD || validatedConfig.MODE === 'production',
    isDev: validatedConfig.DEV || validatedConfig.MODE === 'development',
    isTest: validatedConfig.MODE === 'test',
    devAccountIds: validatedConfig.VITE_STEAM_DEV_ACCOUNTS ?? [],
  };
};

export const config = getConfig();
