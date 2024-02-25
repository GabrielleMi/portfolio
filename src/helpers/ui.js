const getScrollbarWidth = () => {
	const outer = document.createElement('div');
	const inner = document.createElement('div');

	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll';
	outer.style.msOverflowStyle = 'scrollbar';

	document.body.appendChild(outer);
	outer.appendChild(inner);

	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

	outer.parentNode.removeChild(outer);

	return scrollbarWidth;

};

export const lockScroll = () => {
	document.body.style.paddingLeft = `${getScrollbarWidth()}px`;
	document.body.classList.add("no-scroll");
};

export const unlockScroll = () => {
	document.body.style.paddingLeft = 0;
	document.body.classList.remove("no-scroll");
};