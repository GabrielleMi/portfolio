import Modal from "../../../modal/Modal";
import PropTypes from "prop-types";
import React from "react";
import SkeletonImg from "../../../skeleton/SkeletonImg";
import styles from "./Photo.module.scss";
import { useToggle } from "../../../../hooks/useToggle";

export default function Photo({ alt, src }) {
	const [ isOpen, { onOpen, onClose }] = useToggle(false);

	return (
		<>
			<button
				className={styles.btn}
				onClick={onOpen}
				type="button"
			>
				<SkeletonImg
					imgProps={{
						alt,
						className: styles.preview,
						src
					}}
				/>
			</button>
			<Modal isOpen={isOpen} toggle={onClose}>
				<img alt={alt} src={src} />
			</Modal>
		</>
	);
}

Photo.propTypes = {
	alt: PropTypes.string,
	src: PropTypes.string
};