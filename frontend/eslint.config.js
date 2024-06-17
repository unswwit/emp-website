module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
          jsx: true,
        },
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      eqeqeq: ['error', 'always'],
      curly: 'error',
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
];
