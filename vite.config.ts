// Импортируем плагин Tailwind CSS v4 для Vite
// Он позволяет использовать Tailwind-классы прямо в .svelte файлах

// Импортируем адаптер Cloudflare для SvelteKit
// Он говорит SvelteKit, как собирать проект для деплоя на Cloudflare Workers
import adapter from '@sveltejs/adapter-cloudflare';
// Импортируем основной плагин SvelteKit для Vite
// Это "мост" между Vite и SvelteKit, без него SvelteKit не работает
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

// Импортируем функцию defineConfig из Vite
// Она нужна для типизации (TypeScript понимает структуру конфига)
import { defineConfig } from 'vite';

// Экспортируем конфигурацию Vite
// defineConfig даёт подсказки TypeScript при написании конфига
export default defineConfig({
	// Массив плагинов — каждый плагин добавляет функциональность
	plugins: [
		// Плагин Tailwind CSS
		// Без него классы вроде "text-moss", "bg-paper" не работали бы
		tailwindcss(),

		// Плагин SvelteKit с кастомными настройками
		sveltekit({
			// Опции компилятора Svelte
			compilerOptions: {
				// Принудительно включаем режим "runes" (новый синтаксис Svelte 5)
				// Runes — это новый способ работы с реактивностью ($state, $derived, etc.)
				// Эта функция проверяет: если файл в node_modules — не включаем runes
				// Иначе (для наших файлов) — включаем всегда
				// В Svelte 6 это будет по умолчанию, тогда эту строку можно удалить
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
			},

			// Указываем адаптер для деплоя
			// adapter() создаёт конфигурацию для Cloudflare Workers
			// Без этого SvelteKit не знал бы, как собирать проект для Cloudflare
			adapter: adapter(),
		}),
	],
});
