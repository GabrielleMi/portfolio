import PropTypes from "prop-types";
import React from "react";
import styles from "./ScrollFade.module.scss";
import { useObserver } from "../../../hooks/useObserver";

export default function ScrollFade({ tag: Tag = "div", slide, className, ...props }) {
	const [ ref, isIntersecting ] = useObserver();
	const isVisible = isIntersecting > 0;
	const baseClassName = `${className ? `${className} ` : ""}${styles.observed}`;
	const visibilityClassName = styles[isVisible ? "isVisible" : "isInvisible"];
	const slideClassName = slide && isVisible ? ` ${styles.slide} ${styles[slide]}` : "";
	const completeClassName = `${baseClassName} ${visibilityClassName}${slideClassName}`;

	return <Tag className={completeClassName} ref={ref} {...props} />;
}

ScrollFade.propTypes = {
	className: PropTypes.string,
	slide: PropTypes.oneOf([ "top", "left", "right", "bottom" ]),
	tag: PropTypes.oneOfType([ PropTypes.string, PropTypes.elementType ])
};