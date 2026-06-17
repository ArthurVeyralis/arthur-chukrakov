<script lang="ts">
import { Compass, FolderKanban, Globe, House, User } from '@lucide/svelte';
import { page } from '$app/stores';
import { lang } from '$lib/i18n/store';
import { t } from '$lib/i18n/translations';
import './layout.css';

let { children } = $props();
let isDark = $state(false);
let currentLang = $state<'en' | 'ru'>('en');

// Инициализация при монтировании
$effect(() => {
	// Инициализируем язык из localStorage
	lang.init();

	// Подписываемся на изменения языка
	const unsubscribeLang = lang.subscribe((l) => {
		currentLang = l;
	});

	// Инициализируем тему из localStorage
	if (typeof window !== 'undefined') {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'dark') {
			isDark = true;
			document.documentElement.classList.add('dark');
		} else {
			isDark = false;
			document.documentElement.classList.remove('dark');
		}
	}

	return () => {
		unsubscribeLang();
	};
});

// Обновляем класс dark на <html>
$effect(() => {
	if (typeof document !== 'undefined') {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}
});

function toggleTheme() {
	isDark = !isDark;
}

function toggleLang() {
	lang.toggle();
}

function isActive(path: string): boolean {
	return $page.url.pathname === path;
}

function cn(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	>
</svelte:head>

<!-- Переключатели -->
<div class="fixed top-6 right-6 flex items-center gap-2 z-50">
	<!-- Переключатель темы -->
	<button
		onclick={toggleTheme}
		class="group flex items-center justify-center w-12 h-12 hover:bg-moss/5 rounded-full transition-all duration-200"
		aria-label={t(currentLang, 'theme', 'toggle')}
		title={t(currentLang, 'theme', 'toggle')}
	>
		{#if isDark}
			<!-- Солнце (тёмная тема) -->
			<svg
				class="w-6 h-6 transition-transform duration-500 group-hover:rotate-180"
				viewBox="0 0 24 24"
				fill="none"
			>
				<defs>
					<linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stop-color="#fbbf24" />
						<stop offset="100%" stop-color="#f59e0b" />
					</linearGradient>
				</defs>
				<circle cx="12" cy="12" r="5" fill="url(#sunGradient)" />
				<path
					stroke="url(#sunGradient)"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
				/>
			</svg>
		{:else}
			<!-- Луна (светлая тема) - тёмно-янтарная -->
			<svg
				class="w-6 h-6 transition-transform duration-500 group-hover:-rotate-12"
				viewBox="0 0 24 24"
				fill="none"
			>
				<defs>
					<linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stop-color="#d97706" />
						<stop offset="100%" stop-color="#b45309" />
					</linearGradient>
				</defs>
				<path
					fill="url(#moonGradient)"
					d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
				/>
			</svg>
		{/if}
	</button>

	<!-- Разделитель -->
	<div class="w-px h-8 bg-border dark:bg-stone/50"></div>

	<!-- Переключатель языка -->
	<button
		onclick={toggleLang}
		class="group flex items-center gap-1.5 px-3 h-12 text-sm font-medium hover:bg-moss/5 rounded-full transition-all duration-200"
		aria-label={t(currentLang, 'lang', 'switchTo')}
		title={t(currentLang, 'lang', 'switchTo')}
	>
		<Globe
			size={20}
			strokeWidth={2}
			class="text-moss transition-transform duration-300 group-hover:rotate-12 shrink-0"
		/>
		<span
			class="uppercase font-semibold w-8 text-center shrink-0 text-stone dark:text-stone-light group-hover:text-moss dark:group-hover:text-moss-light transition-colors duration-200"
		>
			{t(currentLang, 'lang', 'current')}
		</span>
	</button>
</div>

{@render children()}

<!-- Навигация -->
<nav
	class="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-2 text-sm bg-nav-bg backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full border border-nav-border shadow-lg shadow-nav-shadow z-50"
	aria-label="Main navigation"
>
	<a
		href="/"
		class={cn(
			'group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200',
			isActive('/')
				? 'bg-moss/10 text-moss font-semibold'
				: 'text-nav-text hover:text-moss hover:bg-moss/5',
		)}
		aria-current={isActive('/') ? 'page' : undefined}
	>
		<House size={16} strokeWidth={2} class="transition-transform duration-200 group-hover:scale-110" />
		<span class="hidden sm:inline">{t(currentLang, 'nav', 'home')}</span>
	</a>

	<a
		href="/about"
		class={cn(
			'group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200',
			isActive('/about')
				? 'bg-moss/10 text-moss font-semibold'
				: 'text-nav-text hover:text-moss hover:bg-moss/5',
		)}
		aria-current={isActive('/about') ? 'page' : undefined}
	>
		<User size={16} strokeWidth={2} class="transition-transform duration-200 group-hover:scale-110" />
		<span class="hidden sm:inline">{t(currentLang, 'nav', 'about')}</span>
	</a>

	<a
		href="/projects"
		class={cn(
			'group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200',
			isActive('/projects')
				? 'bg-moss/10 text-moss font-semibold'
				: 'text-nav-text hover:text-moss hover:bg-moss/5',
		)}
		aria-current={isActive('/projects') ? 'page' : undefined}
	>
		<FolderKanban
			size={16}
			strokeWidth={2}
			class="transition-transform duration-200 group-hover:scale-110"
		/>
		<span class="hidden sm:inline">{t(currentLang, 'nav', 'projects')}</span>
	</a>

	<a
		href="/journey"
		class={cn(
			'group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200',
			isActive('/journey')
				? 'bg-moss/10 text-moss font-semibold'
				: 'text-nav-text hover:text-moss hover:bg-moss/5',
		)}
		aria-current={isActive('/journey') ? 'page' : undefined}
	>
		<Compass size={16} strokeWidth={2} class="transition-transform duration-200 group-hover:scale-110" />
		<span class="hidden sm:inline">{t(currentLang, 'nav', 'journey')}</span>
	</a>
</nav>