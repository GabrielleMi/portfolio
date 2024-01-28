import SceneLoader from "../SceneLoader";

const MODEL_PATH = "/models/robot/character";

const POS = {
	x: 0,
	y: -30,
	z: -500
};

export default function Robot({ loader, color }) {
	return SceneLoader({ color, loader, path: `${MODEL_PATH}@idle.fbx` })
		.then(async (robot) => {
			const walkingRobot = await SceneLoader({ color, loader, path: `${MODEL_PATH}@walk.fbx` });
			const runningRobot = await SceneLoader({ color, loader, path: `${MODEL_PATH}@run.fbx` });

			robot.animations.push(walkingRobot.animations[0]);
			robot.animations.push(runningRobot.animations[0]);
			robot.position.set(POS.x, POS.y, POS.z);

			return robot;
		})
		.catch(console.error);
}