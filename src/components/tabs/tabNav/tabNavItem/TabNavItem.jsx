import PropTypes from "prop-types";
import React from "react";
import { joinStrs } from "../../../../helpers/strings";
import styles from "./TabNavItem.module.scss";

/**
 * @param {object & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} props
 * @param {boolean} [props.isActive=false]
 * @returns {JSX.IntrinsicElements.li}
 */
export default function TabNavItem({ isActive = false, onClick, ...props }) {
	return (
		<li className={styles.btnContainer} onClick={onClick}>
			<button className={joinStrs(styles.btn, { [styles.isActive]: isActive })} type="button" {...props} />
		</li>
	);
}

TabNavItem.defaultProps = {
	isActive: false
};

TabNavItem.propTypes = {
	isActive: PropTypes.bool,
	onClick: PropTypes.func
};