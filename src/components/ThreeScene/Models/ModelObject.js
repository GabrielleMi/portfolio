import * as THREE from "three";

export class ModelObject {
    constructor(sceneManager, path) {
        this.sceneManager = sceneManager;
        this.meshes = [];
        this.material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF, flatShading : true, fog: true,
        });
        this.model = null;
        this.path = path;
    }
    load(loader) {
        loader.load(process.env.PUBLIC_URL + this.path, (gltf) => {
            gltf.scene.scale.set(0.012, 0.012, 0.012);
            gltf.scene.rotateZ(0);
            gltf.scene.rotateX(0.436332);
            gltf.scene.rotateY(-1.5708);
            gltf.scene.position.set(0,1.05,-8);
            gltf.scene.castShadow = true;
            gltf.scene.receiveShadow = true;

            gltf.scene.traverse((child) => {
                if(child instanceof THREE.Mesh) {
                    child.material = this.material;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    this.meshes.push(child.meshes);
                }
            });
            this.sceneManager.scene.add(gltf.scene);
            this.model = gltf.scene;
        });
    };
    init() {
        this.initiated = true;
    }
}