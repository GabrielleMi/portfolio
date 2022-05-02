import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "../../helpers/ui";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import useTransition from "../../hooks/useTransition";

const MODAL_ENUM = {
	closed: "CLOSED",
	closing: "CLOSING",
	open: "OPEN",
	opening: "OPENING"
};


export default function Modal({ isOpen, toggle, children }) {
	const modalRef = useRef();
	const [ modalState, setModalState ] = useState(MODAL_ENUM.closed);
	const [ transitionate, cancelTransition ] = useTransition();
	const durationMs = 200;

	const handleOnOpened = () => {
		setModalState(MODAL_ENUM.open);
	};

	const handleOnClosed = () => {
		setModalState(MODAL_ENUM.closed);
		unlockScroll();
	};

	const handleTransition = (val) => {
		if(modalRef.current) {
			const roundedVal = val.toFixed(2);
			modalRef.current.style.opacity = roundedVal;
			// eslint-disable-next-line no-magic-numbers
			modalRef.current.children[0].style.transform = `translateY(${35 - (roundedVal * 35)}px)`;
		}
	};

	const handleClosing = (val) => {
		handleTransition(val);

		return handleOnOpened;
	};

	const handleOpening = (val) => {
		handleTransition(val);

		return handleOnClosed;
	};

	useLayoutEffect(() => {
		if(modalState === MODAL_ENUM.closing) {
			transitionate(1, 0, durationMs, handleOpening);
		} else if(modalState === MODAL_ENUM.opening) {
			lockScroll();
			transitionate(0, 1, durationMs, handleClosing);
		}

		return cancelTransition;

	}, [modalState]);

	useEffect(() => {
		if(!(!isOpen && modalState === MODAL_ENUM.closed)) {
			setModalState(isOpen ? MODAL_ENUM.opening : MODAL_ENUM.closing);
		}
	}, [isOpen]);

	return (
		modalState !== MODAL_ENUM.closed &&
			<aside aria-modal="true" className={`${styles.container}${isOpen ? ` ${styles.isOpen}` : ""}`} ref={modalRef}>
				<div className={styles.inner}>
					<button
						aria-label="Fermer"
						className={styles.close}
						onClick={toggle}
						type="button"
					>
						<i aria-hidden className="fa fa-close" />
					</button>
					{children}
				</div>
			</aside>
	);
}

Modal.propTypes = {
	children: PropTypes.oneOfType([ PropTypes.arrayOf([PropTypes.element]), PropTypes.element ]),
	isOpen: PropTypes.bool,
	toggle: PropTypes.func
};