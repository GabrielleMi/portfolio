import Photo from "./photo/Photo";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Album.module.scss";

export default function Album({ photos }) {
	return (
		<ul className={styles.container}>
			{
				photos.map((photo) => (
					<li key={photo.src}><Photo {...photo} /></li>
				))
			}
		</ul>
	);
}

Album.propTypes = {
	photos: PropTypes.array
};