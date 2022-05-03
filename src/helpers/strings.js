export function removeSpecialChars(str) {
	return str.replace(/[^a-zA-Z ]/g, "");
}