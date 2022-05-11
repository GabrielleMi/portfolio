import SceneLoader from "../SceneLoader";

const MODEL_PATH = "/models/octopus/octopus.gltf";
const ROTATE = {
	x: 0.436332,
	y: -1.5708
};
const POS = {
	x: 0,
	y: 0,
	z: -500
};

export default function Octopus({ loader, color }) {
	return SceneLoader({ color, loader, path: MODEL_PATH })
		.then((octopus) => {
			octopus.rotateZ(0);
			octopus.rotateX(ROTATE.x);
			octopus.rotateY(ROTATE.y);
			octopus.position.set(POS.x, POS.y, POS.z);

			return octopus;
		})
		.catch(console.error);
}