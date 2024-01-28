import ProjectThumbnail from "../../projects/projectThumbnail.js/ProjectThumbnail";
import PropTypes from "prop-types";
import React from "react";
import shuffle from "../../../helpers/arrays";
import styles from "./OtherProjects.module.scss";

export default function OtherProjects({ projects }) {
	const shuffledProjects = shuffle(projects);

	return (
		<section className={`container ${styles.container}`}>
			<header>
				<span className="main-section-subtitle">En voir plus</span>
				<h2 className="main-section-title">Autres projets</h2>
			</header>
			<ul className={styles.list}>
				{shuffledProjects.map((project) => (
					<li className={styles.listItem} key={project.id}>
						<ProjectThumbnail id={project.id} project={project} />
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