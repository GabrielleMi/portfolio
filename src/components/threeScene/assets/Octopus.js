import * as THREE from "three";

const MODEL_PATH = "/octopus/octopus.gltf";
const ROTATE = {
	x: 0.436332,
	y: -1.5708
};
const POS = {
	x: 0,
	y: 0,
	z: -500
};

export default function Octopus({ loader, onLoad, color }) {
	const material = new THREE.MeshStandardMaterial({
		color, flatShading: true, fog: true
	});

	loader.load(MODEL_PATH, (gltf) => {
		gltf.scene.rotateZ(0);
		gltf.scene.rotateX(ROTATE.x);
		gltf.scene.rotateY(ROTATE.y);
		gltf.scene.position.set(POS.x, POS.y, POS.z);
		gltf.scene.castShadow = true;
		gltf.scene.receiveShadow = true;

		gltf.scene.traverse((child) => {
			if(child instanceof THREE.Mesh) {
				child.material = material;
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});

		onLoad(gltf.scene);
	});
}