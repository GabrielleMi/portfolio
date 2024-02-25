import { Group, Mesh, MeshStandardMaterial } from "three";

export default function SceneLoader({ color, loader, path }) {
	const material = new MeshStandardMaterial({
		color, flatShading: true, fog: true
	});

	return new Promise(
		(resolve, reject) => {
			loader.load(
				path,
				(loadedObj) => {
					const theObject = loadedObj instanceof Group ? loadedObj : loadedObj.scene;

					theObject.castShadow = true;
					theObject.receiveShadow = true;
					theObject.traverse((child) => {
						if(child instanceof Mesh) {
							child.material = material;
							child.castShadow = true;
							child.receiveShadow = true;
						}
					});

					resolve(theObject);
				},
				null,
				reject
			);
		}
	);
}