import { ChildrenType } from "../../../../helpers/propTypes";
import PropTypes from "prop-types";
import React from "react";
import { getDigitsCount } from "../../../../helpers/numeric";
import styles from "./LineNb.module.scss";

const DEFAULT_MAX = 99;

export default function LineNb({ maxLines = DEFAULT_MAX, children }) {
	return (
		<span
			className={styles.container}
			style={maxLines > DEFAULT_MAX ? { maxWidth: `${getDigitsCount(maxLines) + 1}ch` } : {}}
		>
			{children}
		</span>
	);
}

LineNb.defaultProps = {
	maxLines: 99
};

LineNb.propTypes = {
	children: ChildrenType,
	maxLines: PropTypes.number.isRequired
};