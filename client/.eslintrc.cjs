module.exports = {
  root: true,
  env: { browser: true, node: true, es6: true },
  parser: '@typescript-eslint/parser',
  settings: { 'import/resolver': { typescript: true } },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'node_modules', 'dist'],
  plugins: ['react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    /* vite default rules */
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    /* custom rules */
    'no-restricted-imports': ['error', { patterns: ['src', '../**', 'features/*/*/*'] }],
    'import/no-unresolved': ['error', { ignore: ['^@/'] }],
    'import/order': [
      'error',
      {
        pathGroups: [{ pattern: '@/**', group: 'external', position: 'after' }],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    'import/no-default-export': 'error',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
  },
};
