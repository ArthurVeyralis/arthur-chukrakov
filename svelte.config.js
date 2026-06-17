import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
		}),
		paths: {
			base: dev ? '' : '/arthur-chukrakov',
			relative: false,  // ← ДОБАВЬ ЭТУ СТРОКУ
		},
	},
	compilerOptions: {
		runes: true,
	},
};

export default config;