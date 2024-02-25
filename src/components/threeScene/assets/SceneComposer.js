import { EffectComposer } from "postprocessing";
import { WebGLRenderer } from "three";

export default function sceneComposer({ width, height, canvas }) {
	const renderer = new WebGLRenderer({ alpha: true, antialias: true, canvas });

	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio);

	const composer = new EffectComposer(renderer);

	return composer;
}