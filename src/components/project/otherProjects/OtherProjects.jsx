import PropTypes from "prop-types";
import React from "react";
import styles from "./OtherProjects.module.scss";

export default function OtherProjects({ projects }) {

	return (
		<section className={`container ${styles.container}`}>
			<header>
				<span className="main-section-subtitle">En voir plus</span>
				<h2 className="main-section-title">Autres projets</h2>
			</header>
			<ul className={styles.list}>
				{projects.map((project) => (
					<li className={styles.listItem} key={project.id}>
                        hi
					</li>
				))}
			</ul>
		</section>
	);
}

OtherProjects.defaultProp = {
	projects: []
};

OtherProjects.propTypes = {
	projects: PropTypes.array
};