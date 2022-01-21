import React from "react";
import styles from "./Contact.module.scss";

export default function Contact() {
	return (
		<section className={styles.container} id="contact">
			<header className="container">
				<span className="main-section-subtitle">Une tasse de café ?</span>
				<h2 className="main-section-title">Contact</h2>
			</header>
			<p className="container">Allons prendre un café, j&apos;t&apos;accro.</p>
			<address className="container">
				<span className={styles.addressItem}><i className="fa fa-envelope" /> gabrielle.mi@hotmail.com</span>
				<a className={styles.addressItem} href="https://github.com/" rel="noopener noreferrer" target="_blank">
					<i className="fab fa-github" /> GabrielleMi
				</a>
			</address>
		</section>
	);
}