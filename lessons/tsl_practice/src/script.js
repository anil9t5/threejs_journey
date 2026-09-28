import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  sin,
  positionLocal,
  time,
  vec3,
  float,
  checker,
  uv,
  vec2,
  vec4,
  materialColor,
  mix,
} from "three/tsl";
import * as THREE from "three/webgpu";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.threejs");

// Scene
const scene = new THREE.Scene();

// Loaders
const textureLoader = new THREE.TextureLoader();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 5;
camera.position.y = 4.5;
camera.position.z = 2.5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGPURenderer({
  canvas: canvas,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x111111);

//TSL Material

const pulse = time.mul(2.0).sin().mul(0.5).add(0.5);
const colorRed = vec3(1, 0, 0);
const colorBlue = vec3(0, 0, 1);

const mixFactor = positionLocal.y;
const mixFactorCube = uv().y;

const colorMix = mix(colorBlue, colorRed, mixFactor).mul(pulse);
const colorMixCube = mix(colorBlue, colorRed, mixFactorCube).mul(pulse);

/**
 * Torus knot
 */
{
  const geometry = new THREE.TorusKnotGeometry(0.5, 0.24, 128, 32);
  const material = new THREE.MeshStandardNodeMaterial({
    // metalness: 0.5,
    // roughness: 0.25,
  });

  material.colorNode = colorMix;

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.y = 1;

  // scene.add(mesh);
}

/**
 * Box
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardNodeMaterial({ color: 0x00ff00 }); // Solid Green

material.colorNode = colorMixCube;
const cube = new THREE.Mesh(geometry, material);
cube.position.y = -0.5;
scene.add(cube);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5);
directionalLight.castShadow = true;
directionalLight.position.set(2, 0.75, -1).normalize().multiplyScalar(10);
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.near = 0.01;
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.radius = 3;
directionalLight.shadow.normalBias = 0.1;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x859dff, 1);
scene.add(ambientLight);

/**
 * Animate
 */
const timer = new THREE.Timer();
timer.connect(document);

const tick = () => {
  timer.update();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(tick);
