// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		starlight({
			title: 'NEXO VR Game Engine',
			description: 'The next generation open-source game engine built specifically for VR headset developers.',
			logo: {
				src: './src/assets/nexo-logo.svg',
				alt: 'NEXO VR Game Engine',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/NexoEngine/game-engine' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/nexo' },
			],
			customCss: [
				'./src/styles/global.css',
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'VR Setup', slug: 'getting-started/vr-setup' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Creating Your First VR Scene', slug: 'guides/first-vr-scene' },
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'API Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Blog',
					link: '/blog/',
				},
			],
		}), 
		react()
	],
});