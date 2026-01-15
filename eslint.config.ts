import path from 'node:path';
import globals from 'globals';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export const projectRoot = path.resolve('.');
export const gitignorePath = path.resolve(projectRoot, '.gitignore');

export default defineConfig([
  globalIgnores(['']),
  includeIgnoreFile(gitignorePath),
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,

  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  plugins.next,
  ...configs.next.recommended,

  plugins.typescriptEslint,
  ...configs.base.typescript,
  ...configs.react.typescript,
  ...configs.next.typescript,
  rules.typescript.typescriptEslintStrict,

  reactRefreshPlugin.configs.next,

  eslintPluginPrettierRecommended,

  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2024,
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: ['./tsconfig.json', './docs/tsconfig.json'],
        }),
      ],
    },
    rules: {
      // TODO: remove
      'no-console': 'off',
      'consistent-return': 'off',
      'import-x/no-cycle': 'off',
      'no-nested-ternary': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',

      'class-methods-use-this': 'off',
      'no-restricted-syntax': 'off',
      'no-promise-executor-return': 'off',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state', 'acc'],
        },
      ],
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],

      'import-x/extensions': 'off',
      'import-x/no-unresolved': 'error',
      'import-x/no-named-as-default': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/require-default-props': [
        // 'error',
        'off',
        {
          classes: 'ignore',
          functions: 'ignore',
          ignoreFunctionalComponents: true,
        },
      ],
    },
  },
  {
    files: plugins.typescriptEslint.files,
    rules: {
      // TODO: remove
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',

      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // TODO: uncomment
      // '@typescript-eslint/no-use-before-define': [
      //   'error',
      //   {
      //     functions: false,
      //   },
      // ],
    },
  },
]);
