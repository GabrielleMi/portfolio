import React, { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SkeletonImg from "../../../skeleton/SkeletonImg";
import styles from "./Photo.module.scss";
import useTransition from "../../../../helpers/useTransition";

const MODAL_ENUM = {
	closed: "CLOSED",
	closing: "CLOSING",
	open: "OPEN",
	opening: "OPENING"
};

export default function Photo({ alt, src }) {
	/**
     * @const {"CLOSED"|"OPENING"|"OPEN"|"CLOSING"}
     */
	const [ modalState, setModalState ] = useState(MODAL_ENUM.closed);
	const modalRef = useRef();
	const [ transitionate, cancelTransition ] = useTransition();
	const durationMs = 100;

	const handleOnOpen = () => {
		document.body.style.paddingLeft = `${window.innerWidth - document.documentElement.clientWidth}px`;
		document.body.classList.add("no-scroll");
		setModalState(MODAL_ENUM.opening);
	};

	const handleOnOpened = () => {
		setModalState(MODAL_ENUM.open);
	};

	const handleOnClosed = () => {
		setModalState(MODAL_ENUM.closed);
		document.body.classList.remove("no-scroll");
		document.body.style.paddingLeft = 0;
	};

	const handleOnClose = () => {
		setModalState(MODAL_ENUM.closing);
	};

	const handleTransition = (val) => {
		if(modalRef.current) {
			const roundedVal = val.toFixed(2);
			modalRef.current.style.opacity = roundedVal;
			// eslint-disable-next-line no-magic-numbers
			modalRef.current.children[0].style.transform = `translateY(${35 - (roundedVal * 35)}px)`;
		}
	};

	useLayoutEffect(() => {
		if(modalState === MODAL_ENUM.closing) {
			transitionate(1, 0, durationMs, (val) => {
				handleTransition(val);

				return () => handleOnClosed();
			});
		} else if(modalState === MODAL_ENUM.opening) {
			transitionate(0, 1, durationMs, (val) => {
				handleTransition(val);

				return () => handleOnOpened();
			});

		}

		return () => {
			cancelTransition();
		};
	}, [modalState]);

	return (
		<>
			<button className={styles.btn} onClick={handleOnOpen} type="button">
				<SkeletonImg
					imgProps={{
						alt,
						className: styles.preview,
						src
					}}
				/>
			</button>
			{
				modalState !== MODAL_ENUM.closed &&
					<aside className={styles.modal} ref={modalRef}>
						<div className={styles.modalInner}>
							<button className={styles.modalBtn} onClick={handleOnClose} type="button"><i className="fa fa-close" /></button>
							<img alt={alt} src={src} />
						</div>
					</aside>
			}
		</>
	);
}

Photo.propTypes = {
	alt: PropTypes.string,
	src: PropTypes.string
};