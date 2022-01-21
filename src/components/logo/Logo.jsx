import PropTypes from "prop-types";
import React from 'react';

/**
 * @param {Object} props
 * @param {string|number} [props.width]
 * @param {string|number} [props.height]
 * @param {string} [props.className]
 * @returns {JSX.IntrinsicElements.svg}
 */
export default function Logo ({
	className,
	height = '100%',
	width = '100%'
}) {


	return (
		<svg
			className={className}
			height={height}
			viewBox="0 0 77.51 45.79"
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<path
				d="M77.27,38.52,65.09,6.75c0-.07-.08-.14-.11-.21s-.11-.25-.18-.36a2.83,2.83,0,0,0-.2-.28,2.09,2.09,0,0,0-.23-.29,3.07,3.07,0,0,0-.26-.25l-.26-.23-.33-.21-.22-.13-.07,0a2.35,2.35,0,0,0-.37-.14l-.32-.11-.33,0-.37,0c-.11,0-.21,0-.32,0s-.26,0-.39,0l-.3.06-.4.11-.08,0c-.07,0-.13.08-.21.11s-.24.11-.36.18a2.83,2.83,0,0,0-.28.2,2.09,2.09,0,0,0-.29.23,3.07,3.07,0,0,0-.25.26,2.85,2.85,0,0,0-.23.26c-.08.11-.14.23-.21.34s-.09.13-.13.21L47.11,29,33.53,0,20.25,20.46a3.67,3.67,0,1,0,6.15,4l6.09-9.39,2.93,6.23a3.74,3.74,0,0,0-.12.89A14,14,0,1,1,12.92,11a3.66,3.66,0,1,0-4.4-5.85,21.3,21.3,0,1,0,31.8,26.62l6.58,14L61.22,17.14l9.21,24a3.66,3.66,0,0,0,3.42,2.35,3.74,3.74,0,0,0,1.31-.24A3.66,3.66,0,0,0,77.27,38.52Z"
			/>
		</svg>
	);
}

Logo.propTypes = {
	className: PropTypes.string,
	height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
	width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
};