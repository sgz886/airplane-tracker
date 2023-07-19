module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:react/jsx-runtime'],
  overrides: [
    {
      files: ['*.jsx', '*.js'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['dist/**', 'node_modules/**', '.idea/**'],
  rules: {
    'no-restricted-exports': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-unused-vars': 'warn',
    'jsx-quotes': ['error', 'prefer-single'],
  },
};
