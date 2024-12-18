module.exports = {
  root: true,
  env: { node: true, jest: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { project: 'tsconfig.json', tsconfigRootDir: __dirname, sourceType: 'module' },
  settings: { 'import/resolver': { typescript: true } },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Nestjs default rules
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Custom rules
    'no-restricted-imports': ['error', { patterns: ['src', '../**', '@/features/*/*/*'] }],
    'import/no-unresolved': ['error', { ignore: ['^@/'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [{ pattern: '@/**', group: 'external', position: 'after' }],
        alphabetize: { order: 'asc', caseInsensitive: false },
        'newlines-between': 'always',
      },
    ],
    'import/no-default-export': 'error',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
  },
};
