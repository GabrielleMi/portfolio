import { useState } from "react";

/**
 *
 * @param {boolean} initState
 * @returns {[ boolean, { close: function, open: function, toggle: function }]}
 */
export function useToggle(initState) {
	const [ isTrue, setIsTrue ] = useState(initState);

	const handleToggle = () => setIsTrue((prev) => !prev);
	const handleClose = () => setIsTrue(false);
	const handleOpen = () => setIsTrue(true);

	return [ isTrue, { onClose: handleClose, onOpen: handleOpen, onToggle: handleToggle }];
}