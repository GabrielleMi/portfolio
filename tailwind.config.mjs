const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	plugins: [],
	theme: {
		container: {
			center: true,
		},
		colors: {
			transparent: 'transparent',
			currentColor: 'currentColor',
			white: "rgb(var(--color-white) / <alpha-value>)",
			black: "#000000",
			red: colors.red,
			blue: colors.blue,
			highlight: "rgb(var(--color-highlight) / <alpha-value>)",
			primary: {
				950: 'rgb(var(--color-primary-950) / <alpha-value>)',
				900: 'rgb(var(--color-primary-900) / <alpha-value>)',
				800: 'rgb(var(--color-primary-800) / <alpha-value>)',
				700: 'rgb(var(--color-primary-700) / <alpha-value>)'
			}
		}
	}
};
