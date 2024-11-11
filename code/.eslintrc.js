module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-standard'
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
