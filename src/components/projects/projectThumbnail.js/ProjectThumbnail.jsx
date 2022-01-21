import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import styles from "./ProjectThumbnail.module.scss";

export default function ProjectThumbnail({ id, project }) {
	const { title, preview } = project;

	return (
		<article className={styles.card}>
			<figure className={styles.preview}>
				<img alt={title} className={styles.previewImg} src={preview} />
			</figure>
			<header className={styles.info}>
				<h2 className={styles.title}>{title}</h2>
				<Link className={styles.btn} to={`/projets/${id}`}>Voir projet</Link>
			</header>
		</article>
	);
}

ProjectThumbnail.propTypes = {
	id: PropTypes.string,
	project: PropTypes.objectOf({
		preview: PropTypes.string,
		title: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ])
	})
};