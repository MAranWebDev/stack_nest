module.exports = {
  root: true,
  env: { browser: true, node: true, es6: true },
  parser: '@typescript-eslint/parser',
  settings: { 'import/resolver': { typescript: {} } },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'dist', 'node_modules'],
  plugins: ['react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-restricted-imports': ['error', { patterns: ['../**', 'src', '@/*/*/*'] }],
    'import/no-unresolved': 'off',
    'import/default': 'off',
    'import/no-default-export': 'error',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      },
    ],
  },
};
