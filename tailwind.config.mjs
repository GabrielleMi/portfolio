// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	plugins: [],
	theme: {
		colors: {
			black: "#000000",
			blue: colors.blue,
			currentColor: 'currentColor',
			highlight: "rgb(var(--color-highlight) / <alpha-value>)",
			primary: {
				600: 'rgb(var(--color-primary-600) / <alpha-value>)',
				700: 'rgb(var(--color-primary-700) / <alpha-value>)',
				800: 'rgb(var(--color-primary-800) / <alpha-value>)',
				900: 'rgb(var(--color-primary-900) / <alpha-value>)',
				950: 'rgb(var(--color-primary-950) / <alpha-value>)'
			},
			red: colors.red,
			transparent: 'transparent',
			white: "rgb(var(--color-white) / <alpha-value>)"
		},
		container: {
			center: true
		}
	}
};
