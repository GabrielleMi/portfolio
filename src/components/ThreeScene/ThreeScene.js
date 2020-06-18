import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
    EffectComposer,
    RenderPass,
    EffectPass,
    ChromaticAberrationEffect
} from 'postprocessing';
import './ThreeScene.scss';
import { WaterEffect } from "../../customEffects/WaterEffect";
import { ModelObject } from './Models/ModelObject';
import { Text } from './Texts/Text';
import {Vector2, Vector3} from "three";

class ThreeScene extends Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.addCube = this.addCube.bind(this);
        this.initCamera = this.initCamera.bind(this);
        this.initLights = this.initLights.bind(this);
        this.initComposer = this.initComposer.bind(this);
        this.onResize = this.onResize.bind(this);
    }
    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.assets = {};
        this.initCamera(width, height);
        this.initLights();
        const near = 1;
        const far = 15;
        const color = 0xffffff;
        this.scene.fog = new THREE.Fog(color, near, far);
        this.scene.background = new THREE.Color(color);
        this.subjects = [
            new ModelObject(this, '/3d/octopus.gltf'),
            new Text(this, 'Gabrielle', 80),
        ];

        this.init = this.init.bind(this);
        this.loader = new GLTFLoader();
        this.loadAssets();
        const geometry = new THREE.BoxGeometry( 5, 5, 0.01, 32 );
        const material = new THREE.MeshPhongMaterial( {color: 0xffffff, flatShading: true,} );
        this.plane = new THREE.Mesh( geometry, material );
        this.plane.receiveShadow = true;
        this.plane.castShadow = false;
        this.plane.position.set(0,1.1,-9);
        this.plane.rotation.setFromVector3(new THREE.Vector3( -Math.PI / 2.3, 0, 0));
        this.scene.add( this.plane );
        this.initComposer(width, height);
        this.animate();

        this.onMouseMove = this.onMouseMove.bind(this);

        window.addEventListener("resize", this.onResize);
        document.getElementById('boardCanvas').addEventListener("mousemove", this.onMouseMove);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
        document.getElementById('boardCanvas').removeEventListener("mousemove", this.onMouseMove);
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }
    init() {
        alert("init");
        this.subjects.forEach(subject => subject.init());
    }
    loadAssets() {
        const loader = this.loader;
        return new Promise((resolve, reject) => {
            this.subjects.forEach(subject => subject.load(loader));
            loader.onComplete = () => {
                resolve();
            };
        });
    }
    initCamera(width, height) {
        this.camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 100);
        this.camera.position.x = 0;
        this.camera.position.y = 1.15;
        this.camera.position.z = -2;
    }
    initLights() {
        const lightColor = 0xffffff;

        this.light = new THREE.AmbientLight( lightColor,0.8 );
        this.directionLight1 = new THREE.DirectionalLight( 0xC2DFFF, 0.4 );
        this.directionLight2 = new THREE.DirectionalLight( 0xB22222, 0.3 );

        this.directionLight1.position.set( -3, 5, -3 );
        this.directionLight2.position.set( 10, -10, 3 );

        this.light.castShadow = true;
        this.directionLight1.castShadow = true;
        this.directionLight2.castShadow = true;

        this.scene.add(this.light);
        this.scene.add(this.directionLight1);
        this.scene.add(this.directionLight2);
    }
    initComposer(width, height) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.mount.appendChild(this.renderer.domElement);
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        this.waterEffect = new WaterEffect(this.camera, this.plane.position);
        const chromaticEffect = new ChromaticAberrationEffect();

        chromaticEffect.offset = new Vector2(0.002, 0.002);

        this.composer.addPass(new EffectPass(
            this.camera,
            this.waterEffect,
        ));
    }
    onMouseMove(e) {
        const targetZ = -8;
        let vec = new THREE.Vector3(); // create once and reuse
        let pos = new THREE.Vector3(); // create once and reuse

        vec.set(
            ( e.clientX / window.innerWidth ) * 2 - 1,
            - ( e.clientY / window.innerHeight ) * 2 + 1,
            0 );

        vec.unproject( this.camera );

        vec.sub( this.camera.position ).normalize();

        let distance = ( targetZ - this.camera.position.z ) / vec.z;

        pos.copy( this.camera.position ).add( vec.multiplyScalar( distance ) );

        this.waterEffect.setEpicenter(new Vector3(pos.x, pos.y, targetZ));
        this.waterEffect.explode();
    }
    animate() {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.composer.render(this.clock.getDelta());
    }
    addCube(cube) {
        this.scene.add(cube);
    }
    onResize() {
        this.composer.setSize(window.innerWidth, window.innerHeight);
        //this.composer.setViewport(0, 0, this.mount.clientWidth, this.mount.clientHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
    render() {
        return (
            <div id="three-scene">
                <div
                    id="boardCanvas"
                    style={{ width: "100%", height: "100vh" }}
                    ref={mount => {
                        this.mount = mount;
                    }}
                />
            </div>
        );
    }
}
export default ThreeScene;