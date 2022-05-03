import { getRandomInt } from "./numeric";

export default function shuffle(list) {
	const prevList = [...list];
	const newList = [];

	for(let i = 0; i < list.length; i++) {
		const randIndex = Math.floor(getRandomInt(0, prevList.length));
		const [itemToMove] = prevList.splice(randIndex, 1);

		newList.push(itemToMove);
	}

	return newList;
}