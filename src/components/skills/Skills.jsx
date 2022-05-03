import React from "react";
import styles from "./Skills.module.scss";

export default function Skills() {
	return (
		<section className={`container ${styles.section}`} id="skills">
			<ul className="grid">
				<li className="cell-4">
					<section className={styles.card}>
						<div className={`fa fa-code ${styles.icon}`} />
						<h3 className={styles.title}>Prog</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
					</section>
				</li>
				<li className="cell-4">
					<section className={styles.card}>
						<div className={`fa fa-users ${styles.icon}`} />
						<h3 className={styles.title}>UX</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
					</section>
				</li>
				<li className="cell-4">
					<section className={styles.card}>
						<div className={`fa fa-laptop ${styles.icon}`} />
						<h3 className={styles.title}>UI</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
					</section>
				</li>
			</ul>
		</section>
	);
}