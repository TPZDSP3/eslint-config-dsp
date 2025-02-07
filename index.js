import js from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import vitest from 'eslint-plugin-vitest';
import jestDom from 'eslint-plugin-jest-dom';
import prettier from 'eslint-plugin-prettier';
import next from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
      ...tsEslint.configs['stylistic-type-checked'].rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // React and NPM modules
            'internal', // Absolute imports from the same project
            ['parent', 'sibling', 'index'], // Relative imports
            'object', // TypeScript Type imports
          ],
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
          'pathGroups': [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
          ],
          'pathGroupsExcludedImportTypes': ['react'],
        },
      ],
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      vitest,
      'jest-dom': jestDom,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'jest-dom/prefer-checked': 'warn',
      'jest-dom/prefer-enabled-disabled': 'warn',
      'jest-dom/prefer-required': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
  {
    // Apply Next.js rules only when Next.js is detected
    ignores: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    plugins: {
      next,
    },
    rules: next.configs.recommended.rules,
    settings: {
      next: {
        rootDir: ['apps/*/', 'packages/*/'],
      },
    },
    when: (config) => config.env?.nextjs === true,
  },
];
