import * as THREE from "three";
import {Vector3} from "three";

export class Text {
    constructor(sceneManager, text, size) {
        this.sceneManager = sceneManager;
        this.mesh = null;
        this.text = text;
        this.size = size;
        this.initSize = new Vector3(0.005, 0.005, 0.005);
    }
    load(loader) {
        const fontLoader = new THREE.FontLoader();
        fontLoader.load( process.env.PUBLIC_URL + '/fonts/overpass_black_regular.json', ( font ) => {

            const textGeometry = new THREE.TextGeometry( 'GABRIELLE MICHAUD', {
                font: font,
                size: 12,
                height: 1,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false,
            });

            const textMaterial = new THREE.MeshStandardMaterial(
                { color: 0x2F2F2F, opacity: 1, flatShading: true, side: THREE.DoubleSide, }
            );

            this.mesh = new THREE.Mesh( textGeometry, textMaterial );
            this.mesh.geometry.center();
            this.mesh.castShadow = false;
            this.mesh.receiveShadow = false;
            this.center = this.mesh.geometry.center;
            this.mesh.position.set(0,1.15,-6);
            this.mesh.scale.set(this.initSize.x * this.sceneManager.mount.clientWidth / this.sceneManager.mount.clientHeight / 1.5,
                this.initSize.y * this.sceneManager.mount.clientWidth / this.sceneManager.mount.clientHeight / 1.5,
                this.initSize.z * this.sceneManager.mount.clientWidth / this.sceneManager.mount.clientHeight / 1.5);

            textGeometry.computeBoundingBox();

            this.sceneManager.scene.add( this.mesh );

        });
    }
    componentDidMount() {
        this.onResize = this.onResize.bind(this);
        window.addEventListener("resize", this.onResize);
    }
    onResize() {
        const size = this.initSize.x * this.sceneManager.mount.clientWidth / this.sceneManager.mount.clientHeight / 1.5;
        this.mesh.scale.set(size, size, size);
        this.mesh.aspect = this.sceneManager.mount.clientWidth / this.sceneManager.mount.clientHeight;
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }
}