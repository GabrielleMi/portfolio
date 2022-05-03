import { PROJECTS_LIST } from "./projectsData";
import ProjectThumbnail from "./projectThumbnail.js/ProjectThumbnail";
import React from "react";
import styles from "./Projects.module.scss";

export default function Projects() {
	return (
		<section className="main-section container grid" id="projects">
			<header className="cell-12">
				<span className="main-section-subtitle">À temps plein et à temps partiel</span>
				<h2 className="main-section-title">Mes Projets</h2>
				<p className="cell-8">
                    Une liste des mes projets. La majorité sont des sites développés avec le framework React.js, mais d&apos;autres exemples montrent des développements avec du <code>C#</code>, Arduino ou <code>PHP</code>.
				</p>
			</header>
			<ul className={`cell-12 ${styles.list}`}>
				{Object.entries(PROJECTS_LIST).map(([ key, project ]) => (
					<li className={styles.listItem} key={key}>
						<ProjectThumbnail id={key} project={project} />
					</li>
				))}
			</ul>
		</section>
	);
}