export const THEME_DARK = "dark";
export const THEME_LIGHT = "light";

/**
 * @param {MODE_DARK|MODE_LIGHT} theme
 */
export const toggleTheme = (theme) => {
	if(theme === THEME_DARK) {
		document.documentElement.classList.add(THEME_DARK);
	} else {
		document.documentElement.classList.remove(THEME_DARK);
	}

	window.localStorage.setItem("theme", theme);
};