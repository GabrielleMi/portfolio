import * as THREE from "three";


export default function scenePlane({ color }) {
	const pos = { x: 0, y: 1.1, z: -9 };
	const size = 5;
	const depth = 0.01;
	const segments = 32;
	const piDivider = 2.3;
	const geometry = new THREE.BoxGeometry( size, size, depth, segments );
	const material = new THREE.MeshPhongMaterial({ color, flatShading: true });
	const plane = new THREE.Mesh( geometry, material );

	plane.receiveShadow = true;
	plane.castShadow = false;
	plane.position.set(pos.x, pos.y, pos.z);
	plane.rotation.setFromVector3(new THREE.Vector3( -Math.PI / piDivider, 0, 0));

	return plane;
}