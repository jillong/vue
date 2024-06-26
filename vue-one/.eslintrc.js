module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2020, // 推荐升级到最新的 ECMAScript 版本
        sourceType: 'module',
        requireConfigFile: false // 使用 babel-eslint 时，这个是必需的设置
    },
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended'
    ],
    rules: {
        'vue/no-v-html': 'off',
        // 添加你的自定义规则
    }
};