import { useRef } from "react";

/**
 * @param {number} [fps=0]
 * @returns {[ function, function ]}
 */
export default function useTransition(fps = 0) {
	const timer = useRef();

	function cancelTransition() {
		cancelAnimationFrame(timer.current);
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
				requestAnimationFrame(repeat);
			}
		});
	}

	return [ transitionate, cancelTransition ];
}