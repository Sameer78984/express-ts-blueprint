import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // 1. Files to lint
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  // 2. Global variables (Node.js)
  { languageOptions: { globals: globals.node } },

  // 3. Recommended configs
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 4. Prettier integration
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettierConfig, // Disables conflicting rules

  // 5. Custom Rules
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // We allowed console for env.ts, keeping it off or warning properly
    },
  },

  // 6. Ignores (replacing .eslintignore)
  {
    ignores: ['dist/*', 'node_modules/*', 'coverage/*'],
  },
];
