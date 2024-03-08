export const delay = (ms: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

export const INDEX_NOT_FOUND = -1;