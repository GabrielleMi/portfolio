/**
 * The value is no lower than min (or the next integer greater than min if min isn't an integer), and is less than (but not equal to) max.
 * @param {number} min
 * @param {number} max
 * @returns {number} Returns a random integer between the specified values.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor((Math.random() * (max - min)) + min);
}

export function clamp(nb, min, max) {
	return Math.max(Math.min(max, nb), min);
}

/**
 * Returns the amount of digits in a number
 * @param {number} nb
 * @see https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
 * @returns {number}
 */
export function getDigitsCount(nb) {
	return `${Math.abs(nb)}`.length;
}