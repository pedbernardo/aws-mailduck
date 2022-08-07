module.exports = {
  env: {
    commonjs: true,
    node: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: [
    'dist',
    '*.html'
  ],
  rules: {
  }
}
