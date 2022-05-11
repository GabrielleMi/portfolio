import Nav from "./nav/Nav";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Header.module.scss";

export default function Header({ subtitle, title, children }) {
	return (
		<header className={styles.container} id="top">
			<Nav />
			<div className={styles.titleGroup}>
				<hgroup className="container">
					<h1 className={styles.title}>{title || "Gabrielle Michaud"}</h1>
					{(!title || (title && subtitle)) && <h2 className={styles.subtitle}>{subtitle || "Développeuse web"}</h2>}
				</hgroup>
				{children}
			</div>
		</header>
	);
}

Header.propTypes = {
	children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.element), PropTypes.element ]),
	subtitle: PropTypes.string,
	title: PropTypes.string
};