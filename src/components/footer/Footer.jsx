import Contact from "../contact/Contact";
import Logo from "../logo/Logo";
import React from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<footer className={styles.container}>
			<Contact />
			<nav className={`container ${styles.nav}`}>
				<a href="#top">
					<Logo className={styles.logo} />
				</a>
				<ul className="nav-list">
					<li className="nav-list-item">
						<a className="nav-list-link" href="#about">
                        À propos
						</a>
					</li>
					<li className="nav-list-item">
						<a className="nav-list-link" href="#projects">
                        Projets
						</a>
					</li>
					<li className="nav-list-item">
						<a className="nav-list-link" href="#contact">
                        Contact
						</a>
					</li>
				</ul>
			</nav>
			<small className={`container ${styles.copyright}`}>Copyright - Gabrielle Michaud, 2022. Made with <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React.js</a>.</small>
		</footer>
	);
}