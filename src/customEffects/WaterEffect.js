import {Effect} from "postprocessing";
import {
    Uniform,
    Vector2 as Vector2$1,
    Camera,
    WebGLRenderTarget,
    Vector3,
} from 'three';

let fragmentShader$x =
    "uniform sampler2D inputBuffer;" +
    "uniform bool active;" + // Si le frag est actif
    "uniform vec2 center;" + // point central du frag
    "uniform float waveSize;" + // grosseur de la vague
    "uniform float radius;" + //le rayon
    "uniform float maxRadius;" + // le rayon maximal
    "uniform float amplitude;" + // L'amplitude de la vague
    "varying float vSize;" +
    "varying vec2 vUv;" +
    "void mainUv(inout vec2 uv){" +
    "if(active){" +
    "vec2 aspectCorrection=vec2(aspect,1.0);" +
    "vec2 difference=uv*aspectCorrection-center*aspectCorrection;" +
    "float distance=sqrt(dot(difference,difference))*vSize;" +
    "if(distance>radius){" +
    "if(distance<radius+waveSize)" +
    "{float angle=(distance-radius)*PI2/waveSize;" +
    "float cosSin=(1.0-cos(angle))*0.5;" +
    "float extent=maxRadius+waveSize;" +
    "float decay=max(extent-distance*distance,0.0)/extent;" +
    "uv-=((cosSin*amplitude*difference)/distance)*decay;" +
    "vec4 cr = texture2D(inputBuffer, uv + 0.05);" +
    "vec4 cb = texture2D(inputBuffer, uv - 0.05);" +
    "vec4 cga = texture2D(inputBuffer, uv);" +
    "gl_FragColor = vec4(cr.r, cga.g, cb.b, 0.5);" +
    "}}}}";

let vertexShader$a = "uniform float size;" +
    "uniform float cameraDistance;" +
    "varying float vSize;" +
    "varying vec2 vUv;" +
    "void mainSupport(const in vec2 uv){" +
    "vSize=(0.1*cameraDistance)/size;" +
    "vUv = uv;" +
    "}";

/**
 * Half PI.
 *
 * @type {Number}
 * @private
 */

const HALF_PI = Math.PI * 0.5;

/**
 * A vector.
 *
 * @type {Vector3}
 * @private
 */

const v$1 = new Vector3();

/**
 * A vector.
 *
 * @type {Vector3}
 * @private
 */

const ab = new Vector3();

/**
 * A Water Wave effect.
 *
 * Based on a Gist by Jean-Philippe Sarda:
 *  https://gist.github.com/jpsarda/33cea67a9f2ecb0a0eda
 *
 * Warning: This effect cannot be merged with convolution effects.
 */

class WaterEffect extends Effect {

    /**
     * Constructs a new water wave effect.
     *
     * @param {Camera} camera - The main camera.
     * @param {Vector3} [epicenter] - The world position of the shock wave epicenter.
     * @param {Object} [options] - The options.
     * @param {Number} [options.speed=2.0] - The animation speed.
     * @param {Number} [options.maxRadius=1.0] - The extent of the water wave.
     * @param {Number} [options.waveSize=0.2] - The wave size.
     * @param {Number} [options.amplitude=0.05] - The distortion amplitude.
     */

    constructor(camera, epicenter = new Vector3(), {
        speed = 0.05,
        maxRadius = 0.01,
        waveSize = 0.05,
        amplitude = 0.005,
        inputBuffer = null,
    } = {}) {

        super("WaterEffect", fragmentShader$x, {

            vertexShader: vertexShader$a,

            uniforms: new Map([
                ["inputBuffer", new Uniform(null)],
                ["active", new Uniform(false)],
                ["center", new Uniform(new Vector2$1(0.5, 0.5))],
                ["cameraDistance", new Uniform(1.0)],
                ["size", new Uniform(1.0)],
                ["radius", new Uniform(-waveSize)],
                ["maxRadius", new Uniform(maxRadius)],
                ["waveSize", new Uniform(waveSize)],
                ["amplitude", new Uniform(amplitude)],
            ])

        });

        /**
         * The main camera.
         *
         * @type {Camera}
         */

        this.camera = camera;

        /**
         * The epicenter.
         *
         * @type {Vector3}
         */

        this.epicenter = epicenter;

        /**
         * The object position in screen space.
         *
         * @type {Vector3}
         * @private
         */

        this.screenPosition = this.uniforms.get("center").value;

        /**
         * The speed of the water wave animation.
         *
         * @type {Number}
         */

        this.speed = speed;

        /**
         * A time accumulator.
         *
         * @type {Number}
         * @private
         */

        this.time = 0.0;

        /**
         * Indicates whether the waterwave animation is active.
         *
         * @type {Boolean}
         * @private
         */

        this.active = false;

    }

    setEpicenter(epicenter) {
        this.epicenter = epicenter;
        this.time = 0.04;
        this.waveSize = this.maxRadius;
    }

    explode() {
        if(!this.active) {
            this.time = 0.0;
            this.active = true;
            this.uniforms.get("active").value = true;
        }
    }

    /**
     * Updates this effect.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
     * @param {Number} [delta] - The time between the last frame and the current one in seconds.
     */

    update(renderer, inputBuffer, delta) {

        let epicenter = this.epicenter;
        const camera = this.camera;
        const uniforms = this.uniforms;
        const uniformActive = uniforms.get("active");
        const uniformInputBuffer = uniforms.get("inputBuffer");
        let lastRt = inputBuffer.texture;

        if(this.active) {

            const waveSize = uniforms.get("waveSize").value;
            uniformInputBuffer.value = lastRt;

            // Calculate direction vectors.
            camera.getWorldDirection(v$1);
            ab.copy(camera.position).sub(epicenter);

            // Don't render the effect if the object is behind the camera.
            uniformActive.value = (v$1.angleTo(ab) > HALF_PI);

            if(uniformActive.value) {

                // Scale the effect based on distance to the object.
                //uniforms.get("cameraDistance").value = camera.position.distanceTo(epicenter);

                // Calculate the screen position of the epicenter.
                v$1.copy(epicenter).project(camera);
                this.screenPosition.set((v$1.x + 1.0) * 0.5, (v$1.y + 1.0) * 0.5);

            }

            // Update the shock wave radius based on time.
            this.time += delta * this.speed;
            const radius = this.time - waveSize;
            uniforms.get("radius").value = radius;

            if(radius >= (uniforms.get("maxRadius").value + waveSize) * 2.0) {

                this.active = false;
                uniformActive.value = false;

            }

        }

    }

}

export {WaterEffect};