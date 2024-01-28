import { Color } from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { HEXA_WHITE } from "../sceneUtils";
import React from "react";
import Robot from "../assets/models/Robot";
import ThreeScene from "../ThreeScene";

export default function ProjectScene() {
	const handleOnAddObject = (scene) => {
		const color = new Color(HEXA_WHITE);
		const loader = new FBXLoader();

		return Robot({ color, loader })
			.then((robot) => {
				if(robot) {
					scene.add(robot);

					return robot;
				}

				return null;
			});
	};

	return <ThreeScene addObject={handleOnAddObject} />;
}