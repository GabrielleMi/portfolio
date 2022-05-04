import Badge from "../../badge/Badge";
import Btn from "../../btn/Btn";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { removeSpecialChars } from "../../../helpers/strings";
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
				<ul className="list-inline">
					{project.languages.map((lang) => (
						<Badge color={removeSpecialChars(lang).toLowerCase()} key={lang} tag="li">
							{lang}
						</Badge>
					))}
				</ul>
				<p>{project.shortDesc}</p>
				<Btn className="link-stretched" tag={Link} to={`/projets/${id}`}>
					Voir projet
				</Btn>
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