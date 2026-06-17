<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { lang } from '$lib/i18n/store';
	import { t } from '$lib/i18n/translations';
	import { page } from '$app/stores';

	// Технологический стек
	const techStack = ['Python', 'AI', 'Linux', 'Svelte'];

	let currentLang = $state<'en' | 'ru'>('en');

	$effect(() => {
		const unsubscribe = lang.subscribe((l) => {
			currentLang = l;
		});
		return unsubscribe;
	});

	// Базовый URL для OG мета-тегов
	const baseUrl = 'https://arthurveyralis.com'; // Замени на свой домен
	const currentUrl = $derived(`${baseUrl}${$page.url.pathname}`);
</script>

<svelte:head>
	<title>{t(currentLang, 'home', 'title')} — Developer</title>
	<meta name="description" content={t(currentLang, 'home', 'description')} />
	<meta name="author" content="Arthur Chukrakov" />
	<meta name="theme-color" content="#fafaf9" />

	<!-- Canonical URL -->
	<link rel="canonical" href={currentUrl} />

	<!-- Hreflang для мультиязычности -->
	<link rel="alternate" hreflang="en" href={`${currentUrl}?lang=en`} />
	<link rel="alternate" hreflang="ru" href={`${currentUrl}?lang=ru`} />
	<link rel="alternate" hreflang="x-default" href={currentUrl} />

	<!-- Open Graph (Facebook, LinkedIn, Telegram) -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={`${t(currentLang, 'home', 'title')} — Developer`} />
	<meta property="og:description" content={t(currentLang, 'home', 'description')} />
	<meta property="og:image" content={`${baseUrl}/og-image.png`} />
	<meta property="og:locale" content={currentLang === 'en' ? 'en_US' : 'ru_RU'} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={currentUrl} />
	<meta name="twitter:title" content={`${t(currentLang, 'home', 'title')} — Developer`} />
	<meta name="twitter:description" content={t(currentLang, 'home', 'description')} />
	<meta name="twitter:image" content={`${baseUrl}/og-image.png`} />
</svelte:head>

<main class="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-8 md:py-12 max-w-3xl mx-auto">
	<div class="flex flex-col items-center text-center animate-fade-in">
		<h1 class="text-4xl md:text-5xl text-balance">
			{t(currentLang, 'home', 'title')}
		</h1>

		<p class="text-xl text-saffron font-medium mt-3">
			{t(currentLang, 'home', 'subtitle')}
		</p>

		<p class="text-stone text-lg mt-4 text-pretty">
			{t(currentLang, 'home', 'description')}
		</p>

		<!-- Теги -->
		<div class="flex flex-wrap justify-center gap-2.5 mt-8">
			{#each techStack as tech}
				<span class="tech-tag">
					{tech}
				</span>
			{/each}
		</div>

		<!-- Кнопки контактов -->
		<div class="flex flex-wrap justify-center gap-3 mt-8">
			<a
				href="https://github.com/ArthurVeyralis"
				target="_blank"
				rel="noopener noreferrer me"
				class="contact-btn"
				aria-label={t(currentLang, 'contact', 'githubLabel')}
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
				</svg>
				{t(currentLang, 'contact', 'github')}
			</a>

			<a
				href="https://t.me/ArthurVeyralis"
				target="_blank"
				rel="noopener noreferrer me"
				class="contact-btn"
				aria-label={t(currentLang, 'contact', 'telegramLabel')}
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
				</svg>
				{t(currentLang, 'contact', 'telegram')}
			</a>

			<a
				href="mailto:arthur.veyralis@gmail.com"
				class="contact-btn"
				aria-label={t(currentLang, 'contact', 'emailLabel')}
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
				{t(currentLang, 'contact', 'email')}
			</a>
		</div>

		<!-- CTA -->
		<a
			href="/projects"
			class="cta-button"
			aria-label={t(currentLang, 'home', 'ctaLabel')}
		>
			<span>{t(currentLang, 'home', 'cta')}</span>
			<ArrowRight
				size={16}
				strokeWidth={2}
				class="transition-transform duration-200 group-hover:translate-x-1"
			/>
		</a>
	</div>
</main>