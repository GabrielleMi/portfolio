import { useRef } from "react";

/**
 * @param {number} [fps=0]
 * @returns {[ function, function ]}
 */
export default function useTransition(fps = 60) {
	const timer = useRef();
	const timeout = useRef();
	const SECOND_MS = 1000;

	function cancelTransition() {
		cancelAnimationFrame(timer.current);
		clearTimeout(timeout.current);
		timer.current = null;
	}

	/**
     * @callback OnTransitionStep
     * @param {number} value
     * @param {number} msPassed
     * @returns {function} onTransitionEnd - optionaal
     */

	/**
     * @param {number} from
     * @param {number} to
     * @param {number} duration
     * @param {OnTransitionStep} fn
     */
	function transitionate(from, to, duration, fn) {
		const range = from - to;
		const steps = range / duration;
		let start = null;

		timer.current = requestAnimationFrame(function repeat(timestamp) {
			if(!start) {
				start = timestamp;
			}

			const elapsed = timestamp - start;
			const delta = steps * elapsed;
			const currentVal = from < to ? Math.min(from - delta, to) : Math.max(from - delta, to);
			const onTransitionEnd = fn(currentVal);

			if(elapsed >= duration) {
				if(onTransitionEnd) {
					onTransitionEnd();
				}

				cancelTransition();
			} else {
				timeout.current = setTimeout(() => requestAnimationFrame(repeat), SECOND_MS / fps);
			}
		});
	}

	return [ transitionate, cancelTransition ];
}