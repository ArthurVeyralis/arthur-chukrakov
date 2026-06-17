import { writable } from 'svelte/store';
import type { Lang } from './translations';

function createLangStore() {
	const defaultLang: Lang = 'en';

	const { subscribe, set, update } = writable<Lang>(defaultLang);

	return {
		subscribe,
		set: (lang: Lang) => {
			set(lang);
			if (typeof window !== 'undefined') {
				localStorage.setItem('lang', lang);
				document.documentElement.lang = lang;
			}
		},
		toggle: () => {
			update((current) => {
				const newLang: Lang = current === 'en' ? 'ru' : 'en';
				if (typeof window !== 'undefined') {
					localStorage.setItem('lang', newLang);
					document.documentElement.lang = newLang;
				}
				return newLang;
			});
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const saved = localStorage.getItem('lang') as Lang | null;
				if (saved === 'en' || saved === 'ru') {
					set(saved);
					document.documentElement.lang = saved;
				}
			}
		},
	};
}

export const lang = createLangStore();
