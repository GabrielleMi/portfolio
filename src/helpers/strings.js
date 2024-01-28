export function removeSpecialChars(str) {
	return str.replace(/[^a-zA-Z ]/g, "");
}

export function joinStrs() {
	const result = [];

	for(let i = 0; i < (arguments || []).length; i++) {
		const theArg = arguments[i];

		if(theArg) {
			switch (typeof theArg) {
			case "string":
				result.push(theArg);
				break;
			case "object":
				Object.entries(theArg).forEach(([ key, val ]) => {
					if(val) {
						result.push(key);
					}
				});
				break;
			default:
				break;
			}
		}
	}

	return result.join(' ');
}