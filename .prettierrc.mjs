/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
};

export default config;
