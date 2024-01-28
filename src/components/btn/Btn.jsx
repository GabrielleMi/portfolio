import PropTypes from "prop-types";
import React from "react";
import styles from "./Btn.module.scss";

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @param {object} props
 * @param {"primary"|"dark"|"light"} props.color
 * @param {string} props.className
 * @returns {JSX.IntrinsicElements.button}
 */
export default function Btn({ tag: Tag = "button", color, className, ...props }) {
	const btnColorClass = styles[`btn${capitalize(color)}`] ?? "";
	const btnClasses = `${styles.btn}${className ? ` ${className}` : ""}${btnColorClass ? ` ${btnColorClass}` : ""}`;


	return (
		<Tag className={btnClasses} {...props} />
	);
}

Btn.defaultProps = {
	color: "primary",
	tag: "button"
};

Btn.propTypes = {
	className: PropTypes.string,
	color: PropTypes.oneOf([ "primary", "dark", "light" ]),
	tag: PropTypes.oneOfType([ PropTypes.string, PropTypes.elementType ])
};