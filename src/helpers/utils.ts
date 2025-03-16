export const delay = (ms: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

/**
 * Compare two strings in a case-insensitive way
 */
export const isEqualCi = (str1: string, str2: string) => str1.toLowerCase() === str2.toLowerCase();

export const INDEX_NOT_FOUND = -1;