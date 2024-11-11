module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    'cypress/globals': true,
  },
  extends: [
    'plugin:cypress/recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-standard',
    'plugin:prettier/recommended',
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  plugins: ['cypress', 'prettier'],
  overrides: [
    {
      files: ['cypress/**/*.js'],
      rules: {
        // 'no-unused-expressions': 'off',
        // 'no-undef': 'off'
      },
    },
  ],
};
