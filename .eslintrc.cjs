/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': 'off',
    'import/prefer-default-export': 'off',
    'no-promise-executor-return': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: false
      }
    ],
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true,
        ignore: []
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ]
  }
}
