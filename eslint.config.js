const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    ignores: ['**/assets/**'],
  },
  ...compat.config({
    extends: ['./.eslintrc.js'],
  }),
];
