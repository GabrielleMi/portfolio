import { Link } from "react-router-dom";
import Logo from "../../logo/Logo";
import React from "react";
import styles from "./Nav.module.scss";

export default function Nav() {
	return (
		<nav className={`${styles.container} container`}>
			<Link to={{ hash: "#top", pathname: "/" }}>
				<Logo className={styles.logo} />
			</Link>
			<ul className={`nav-list ${styles.links}`}>
				<li className="nav-list-item">
					<Link className="nav-list-link" to={{ hash: "#about", pathname: "/" }}>
                        À propos
					</Link>
				</li>
				<li className="nav-list-item">
					<Link className="nav-list-link" to={{ hash: "#projects", pathname: "/" }}>
                        Projets
					</Link>
				</li>
				<li className="nav-list-item">
					<a className="nav-list-link" href="#contact">
                        Contact
					</a>
				</li>
			</ul>
		</nav>
	);
}