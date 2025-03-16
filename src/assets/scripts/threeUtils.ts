import {
    AmbientLight,
    AnimationMixer,
    Clock,
	Color,
    DirectionalLight,
    Group,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

export const HEXA_WHITE = 0xffffff;

export function isWebGLSupported() {
	try {
		return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl");
	} catch (e) {
		return false;
	}
}

export function createCamera(
    {
        width,
        height
    }
    :
    {
        width: number,
        height: number
    }
) {
    const fov = 10;
	const near = 0.1;
	const far = 1000;
	const camera = new PerspectiveCamera(fov, width / height, near, far);

	camera.position.x = 0;
	camera.position.y = 8;
	camera.position.z = 80;

	return camera;
}

export function createComposer({ canvas, width, height }) {
    const renderer = new WebGLRenderer({ alpha: true, antialias: true, canvas });

	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio);

	const composer = new EffectComposer(renderer);

	return composer;
}

export function createLights({ color }) {
	const lightIntensity = 0.5;
	const dirLight1Color = 0xff0000;
	const dirLight2Color = 0xB22222;
	const dirLight1Pos = {
		x: -1,
		y: 5,
		z: -3
	};
	const dirLight2Pos = {
		x: 10,
		y: -10,
		z: 3
	};
	const light = new AmbientLight(new Color(color), lightIntensity);

	const directionLight1 = new DirectionalLight( dirLight1Color, lightIntensity / 2 );
	const directionLight2 = new DirectionalLight( dirLight2Color, (lightIntensity / 2) - 1 );

	directionLight1.position.set(dirLight1Pos.x, dirLight1Pos.y, dirLight1Pos.z);
	directionLight2.position.set(dirLight2Pos.x, dirLight2Pos.y, dirLight2Pos.z);

	light.castShadow = true;
	directionLight1.castShadow = true;
	directionLight2.castShadow = true;

	return [ light, directionLight1, directionLight2 ];
}

export function loadScene({ color, loader, path }) {
    const standardMaterial = new MeshStandardMaterial({
		color,
		flatShading: true,
		fog: true
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
							child.material = standardMaterial;
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

export function createBaseScene({ canvas, color, onAnimate }: {
	canvas: HTMLElement,
	color: Color,
	onAnimate?: ((deltaTime: number)=>void)
}) {
    const { clientWidth: width, clientHeight: height } = canvas;
	const scene = new Scene();
	const clock = new Clock();
	const mixer = new AnimationMixer(scene);
	const camera = createCamera({ height, width });
	const composer = createComposer({ canvas, height, width });
	const lights = createLights({ color });

	mixer.timeScale = 0.3;

	lights.forEach((light) => scene.add(light));
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

	return {
		animate,
		composer,
		killScene,
		mixer,
		scene
	};
}

// Custom shader pass for post-processing effect
export const ghostingShader = {
	fragmentShader: `
		uniform sampler2D tDiffuse;
		uniform float scrollOffset;
		uniform int numGhosts;
		uniform float ghostSpacing;
		varying vec2 vUv;

		void main() {
			vec4 originalColor = texture2D(tDiffuse, vUv);
			vec4 ghostColor = vec4(0.0);
			vec2 offset = vec2(scrollOffset, 0.0); // Horizontal offset
		
			// Accumulate the colors of the ghost copies
			for (int i = 1; i <= numGhosts; i++) {
				vec2 ghostUv = vUv - offset * float(i) * ghostSpacing; // Use '-' to move behind
				ghostUv = clamp(ghostUv, vec2(0.0), vec2(1.0)); // Clamp UV coordinates within [0, 1] range
				ghostColor += texture2D(tDiffuse, ghostUv);
			}
		
			// Calculate the average color of the ghost copies
			ghostColor /= float(numGhosts);
		
			// Output the final color
			if (originalColor.a > 0.5) { // Adjust alpha threshold as needed
				gl_FragColor = originalColor; // Output original color if alpha is high enough
			} else {
				gl_FragColor = mix(originalColor, originalColor + ghostColor, 0.5); // Blend original and ghost colors
			}
		}
	`,
	uniforms: {
		"ghostSpacing": { value: 0.04 }, // Spacing between ghosts
		"numGhosts": { value: 2 }, // Number of ghost copies
		"scrollOffset": { value: 3 },
		"tDiffuse": { value: null }
	},
	vertexShader: `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`
};