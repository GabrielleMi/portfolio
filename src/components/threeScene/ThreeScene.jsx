import * as THREE from "three";
import { HEXA_WHITE, isWebGLSupported } from "./sceneUtils";
import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Octopus from "./assets/Octopus";
import { RenderPass } from "postprocessing";
import SceneCamera from "./assets/SceneCamera";
import SceneComposer from "./assets/SceneComposer";
import SceneLights from "./assets/SceneLights";
import ScenePlane from "./assets/ScenePlane";
import styles from "./ThreeScene.module.scss";

export default function ThreeScene() {
	const canvasRef = useRef();
	const animRef = useRef();

	useEffect(() => {
		let removeEventListeners = null;
		const canvas = canvasRef.current;

		if(isWebGLSupported() && !animRef.current && canvas) {
			const { clientWidth: width, clientHeight: height } = canvas;
			const scene = new THREE.Scene();
			const clock = new THREE.Clock();
			const color = new THREE.Color(HEXA_WHITE);
			const loader = new GLTFLoader();
			const camera = SceneCamera({ height, width });
			const composer = SceneComposer({ canvas, height, width });
			const plane = ScenePlane({ color });
			const lights = SceneLights({ color });
			const far = 700;

			const animate = () => {
				animRef.current = window.requestAnimationFrame(animate);
				composer.render(clock.getDelta());
			};

			const handleOnResize = () => {
				composer.setSize(window.innerWidth, window.innerHeight);
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
			};

			removeEventListeners = () => {
				window.removeEventListener("resize", handleOnResize);
				cancelAnimationFrame(animRef.current);
			};

			Octopus({ color, loader, onLoad: (model) => scene.add(model) });
			scene.fog = new THREE.Fog(color, 1, far);
			scene.background = color;

			lights.forEach((light) => scene.add(light));
			scene.add(plane);
			composer.addPass(new RenderPass(scene, camera));
			window.addEventListener("resize", handleOnResize);

			animate();
		}

		return () => {
			removeEventListeners?.();
		};

	}, []);

	return <canvas className={styles.canvas} id="three-octopus" ref={canvasRef} />;
}