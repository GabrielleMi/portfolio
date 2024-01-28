import { PerspectiveCamera } from "three";

export default function sceneCamera({ width, height }) {
	const fov = 10;
	const near = 0.1;
	const far = 1000;
	const camera = new PerspectiveCamera(fov, width / height, near, far);

	camera.position.x = 0;
	camera.position.y = 8;
	camera.position.z = -10;

	return camera;
}