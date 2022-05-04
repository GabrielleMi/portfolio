import PropTypes from "prop-types";
import React from "react";
import styles from "./ZigZag.module.scss";

export default function ZigZag({ width, className }) {
	return <span className={`${styles.line}${className ? ` ${className}` : ""}`} style={width ? { width } : {}} />;
}

ZigZag.propTypes = {
	className: PropTypes.string,
	width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
};