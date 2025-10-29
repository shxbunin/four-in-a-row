import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.recommended,
  {
    plugins: {
      prettier,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['*test*'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  },
];
