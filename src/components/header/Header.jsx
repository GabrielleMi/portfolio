import Btn from "../btn/Btn";
import Nav from "./nav/Nav";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Header.module.scss";

export default function Header({ subtitle, title }) {
	return (
		<header className={styles.container} id="top">
			<Nav />
			<div className={styles.titleGroup}>
				<hgroup className="container">
					<h1 className={styles.title}>{title || "Gabrielle Michaud"}</h1>
					{(!title || (title && subtitle)) && <h2 className={styles.subtitle}>{subtitle || "Développeuse web"}</h2>}
				</hgroup>
				<Btn color="dark" type="button">Projets</Btn>
			</div>
		</header>
	);
}

Header.propTypes = {
	subtitle: PropTypes.string,
	title: PropTypes.string
};