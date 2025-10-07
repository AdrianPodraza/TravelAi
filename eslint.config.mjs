// eslint.config.mjs
import ts from '@typescript-eslint/eslint-plugin';
import next from '@next/eslint-plugin-next';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['.next', 'node_modules'],
  },
  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      '@typescript-eslint': ts,
      '@next/next': next,
      prettier,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      '@next/next': next,
      prettier,
    },
    rules: {
      ...next.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];
