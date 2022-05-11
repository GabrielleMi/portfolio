import { AnimationMixer, Clock, Fog, Scene } from "three";
import { RenderPass } from "postprocessing";
import sceneCamera from "./SceneCamera";
import sceneComposer from "./SceneComposer";
import sceneLights from "./SceneLights";
import scenePlane from "./ScenePlane";

export default function SceneBase({ canvas, color, onAnimate }) {
	const { clientWidth: width, clientHeight: height } = canvas;
	const scene = new Scene();
	const clock = new Clock();
	const mixer = new AnimationMixer(scene);
	const camera = sceneCamera({ height, width });
	const composer = sceneComposer({ canvas, height, width });
	const plane = scenePlane({ color });
	const lights = sceneLights({ color });
	const far = 700;

	mixer.timeScale = 0.3;
	scene.fog = new Fog(color, 1, far);
	scene.background = color;

	lights.forEach((light) => scene.add(light));
	scene.add(plane);
	composer.addPass(new RenderPass(scene, camera));

	const animate = () => {
		const deltaTime = clock.getDelta();

		mixer.update(deltaTime);
		composer.render(deltaTime);
		onAnimate?.(deltaTime);
	};

	const handleOnResize = () => {
		composer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	};

	const killScene = () => {
		window.removeEventListener("resize", handleOnResize);
	};

	window.addEventListener("resize", handleOnResize);

	return { animate, killScene, mixer, scene };
}