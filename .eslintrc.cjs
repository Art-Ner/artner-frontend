module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['import'],
  settings: {
    next: {
      rootDir: ['./'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
    jest: false,
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.next/',
    'coverage/',
    'playwright-report/',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports' },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        'import/order': [
          'warn',
          {
            groups: [
              ['builtin', 'external'],
              ['internal'],
              ['parent', 'sibling', 'index'],
            ],
            alphabetize: { order: 'asc', caseInsensitive: true },
            'newlines-between': 'always',
            pathGroups: [
              { pattern: '@/**', group: 'internal', position: 'before' },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
      },
    },
    {
      files: ['src/tests/**/*.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
      env: {},
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
  ],
};
