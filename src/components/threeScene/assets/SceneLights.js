import { AmbientLight, DirectionalLight } from "three";

export default function sceneLights({ color }) {
	const lightIntensity = 0.8;
	const dirLight1Color = 0xC2DFFF;
	const dirLight2Color = 0xB22222;
	const dirLight1Pos = {
		x: -3,
		y: 5,
		z: -3
	};
	const dirLight2Pos = {
		x: 10,
		y: -10,
		z: 3
	};
	const light = new AmbientLight(color, lightIntensity);

	const directionLight1 = new DirectionalLight( dirLight1Color, lightIntensity / 2 );
	const directionLight2 = new DirectionalLight( dirLight2Color, (lightIntensity / 2) - 1 );

	directionLight1.position.set(dirLight1Pos.x, dirLight1Pos.y, dirLight1Pos.z);
	directionLight2.position.set(dirLight2Pos.x, dirLight2Pos.y, dirLight2Pos.z);

	light.castShadow = true;
	directionLight1.castShadow = true;
	directionLight2.castShadow = true;

	return [ light, directionLight1, directionLight2 ];
}