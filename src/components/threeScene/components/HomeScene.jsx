import { Color } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { HEXA_WHITE } from "../sceneUtils";
import Octopus from "../assets/models/Octopus";
import React from "react";
import ThreeScene from "../ThreeScene";

export default function HomeScene() {
	const handleOnAddObject = (scene) => {
		const color = new Color(HEXA_WHITE);
		const loader = new GLTFLoader();

		return Octopus({ color, loader })
			.then((octopus) => {
				if(octopus) {
					scene.add(octopus);

					return scene;
				}

				return null;
			});
	};

	return <ThreeScene addObject={handleOnAddObject} />;
}