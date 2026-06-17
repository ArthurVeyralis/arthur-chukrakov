export type Lang = 'en' | 'ru';

export interface Translations {
	nav: {
		home: string;
		about: string;
		projects: string;
		journey: string;
	};
	theme: {
		toggle: string;
	};
	lang: {
		switchTo: string;
		current: string;
	};
	home: {
		title: string;
		subtitle: string;
		description: string;
		cta: string;
		ctaLabel: string;
	};
	contact: {
		github: string;
		telegram: string;
		email: string;
		githubLabel: string;
		telegramLabel: string;
		emailLabel: string;
	};
}

export const translations: Record<Lang, Translations> = {
	en: {
		nav: {
			home: 'Home',
			about: 'About',
			projects: 'Projects',
			journey: 'Journey',
		},
		theme: {
			toggle: 'Toggle theme',
		},
		lang: {
			switchTo: 'Switch to Russian',
			current: 'EN',
		},
		home: {
			title: 'Arthur Chukrakov',
			subtitle: 'Student · AI Engineer in the making · Building Veyralis',
			description:
				'Working toward a future where technology, spirituality, ecology, and health are one — the foundation of eco-futurism.',
			cta: 'See My Projects',
			ctaLabel: 'View my projects',
		},
		contact: {
			github: 'GitHub',
			telegram: 'Telegram',
			email: 'Email',
			githubLabel: 'GitHub profile',
			telegramLabel: 'Telegram',
			emailLabel: 'Email',
		},
	},
	ru: {
		nav: {
			home: 'Главная',
			about: 'Обо мне',
			projects: 'Проекты',
			journey: 'Путь',
		},
		theme: {
			toggle: 'Переключить тему',
		},
		lang: {
			switchTo: 'Переключить на английский',
			current: 'RU',
		},
		home: {
			title: 'Артур Чукраков',
			subtitle: 'Студент · Начинающий AI-инженер · Создаю Veyralis',
			description:
				'Стремлюсь к будущему, где технологии, духовность, экология и здоровье едины — основа эко-футуризма.',
			cta: 'Мои проекты',
			ctaLabel: 'Посмотреть мои проекты',
		},
		contact: {
			github: 'GitHub',
			telegram: 'Telegram',
			email: 'Почта',
			githubLabel: 'Профиль GitHub',
			telegramLabel: 'Telegram',
			emailLabel: 'Электронная почта',
		},
	},
};

export function t(lang: Lang, ...keys: string[]): string {
	let current: unknown = translations[lang];
	for (const key of keys) {
		if (current === undefined || typeof current !== 'object') {
			return keys.join('.');
		}
		current = (current as Record<string, unknown>)[key];
	}
	return typeof current === 'string' ? current : keys.join('.');
}