import { HEXA_WHITE, isWebGLSupported } from "./sceneUtils";
import React, { useEffect, useRef } from "react";
import { Color } from "three";
import PropTypes from "prop-types";
import SceneBase from "./assets/SceneBase";
import styles from "./ThreeScene.module.scss";

export default function ThreeScene({ addObject }) {
	const canvasRef = useRef();
	const animRef = useRef();

	useEffect(() => {
		let removeEventListeners = null;
		const canvas = canvasRef.current;

		if(isWebGLSupported() && !animRef.current && canvas) {
			const color = new Color(HEXA_WHITE);
			const { scene, animate, mixer, killScene } = SceneBase({ canvas, color });

			const onAnimate = () => {
				animate();
				animRef.current = window.requestAnimationFrame(onAnimate);
			};

			const handleRemoveEventListeners = () => {
				cancelAnimationFrame(animRef.current);
				killScene();
			};

			addObject?.(scene)
				.then((obj) => {
					if(obj && obj.animations[0]) {
						mixer.clipAction(obj.animations[0]).play();
					}
				});

			removeEventListeners = handleRemoveEventListeners;

			onAnimate();
		}

		return () => {
			removeEventListeners?.();
		};

	}, []);

	return <canvas className={styles.canvas} id="three-octopus" ref={canvasRef} />;
}

ThreeScene.propTypes = {
	addObject: PropTypes.func
};