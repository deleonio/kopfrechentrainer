import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
			globals: {
				...globals.browser,
				...globals.es2021,
				__COMMIT_SHA__: 'readonly',
				__APP_VERSION__: 'readonly',
				__APP_NAME__: 'readonly',
				__APP_AUTHOR__: 'readonly',
				__APP_HOMEPAGE__: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			'no-undef': 'off',
		},
	},
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
];
