import { useEffect, useRef, useState } from "react";

function getTresholds(amount) {
	const tresholds = [];

	for(let i = 0; i < amount; i++) {
		tresholds.push((1 / i).toFixed(2));
	}

	return tresholds;
}

const DEFAULT_TRESH_COUNT = 20;

export function useObserver(
	options = {
		root: null,
		rootMargin: "0px",
		tresholds: getTresholds(DEFAULT_TRESH_COUNT)
	}
) {
	const ref = useRef(null);
	const [ isIntersecting, setIntersecting ] = useState(false);
	const observer = useRef(new IntersectionObserver(([entry]) => setIntersecting(entry.intersectionRatio), options));

	useEffect(() => {
		const { current: theObserver } = observer;
		theObserver.disconnect();

		if(ref.current) {
			theObserver.observe(ref.current);
		}

		return () => {
			theObserver.disconnect();
		};
	}, [ref.current]);

	return [ ref, isIntersecting ];
}