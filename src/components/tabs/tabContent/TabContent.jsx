import { ChildrenType } from "../../../helpers/propTypes";
import PropTypes from "prop-types";
import React from "react";
import { joinStrs } from "../../../helpers/strings";
import styles from "./TabContent.module.scss";

/**
 *
 * @param {object} props
 * @param {boolean} props.isActive
 * @returns {JSX.IntrinsicElements.section}
 */
export default function TabContent({ isActive, children }) {
	return (
		<section className={joinStrs(styles.container, { [styles.isActive]: isActive })}>
			{children}
		</section>
	);
}

TabContent.defaultProps = {
	isActive: false
};

TabContent.propTypes = {
	children: ChildrenType,
	isActive: PropTypes.bool
};