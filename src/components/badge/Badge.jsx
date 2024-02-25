import PropTypes from "prop-types";
import React from "react";
import styles from "./Badge.module.scss";

export default function Badge({ tag: Tag = "span", color, className, ...props }) {
	const theme = color && styles[color] ? ` ${styles[color]}` : "";

	return (
		<Tag className={`${className ? `${className} ` : ""}${styles.outer}${theme}`} {...props} />
	);
}

Badge.defaultProps = {
	tag: "span"
};

Badge.propTypes = {
	className: PropTypes.string,
	color: PropTypes.string,
	tag: PropTypes.oneOfType([ PropTypes.elementType, PropTypes.string ])
};