import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * House
 */

//Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial(),
);
floor.rotation.x = -Math.PI * 0.5; // or Math.PI / 2 i.e. Rotating the ojb to -90 so the front face (grey part) stays at the top.
scene.add(floor);

//House container
const house = new THREE.Group();
scene.add(house);

//Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial(),
);
house.add(walls);
walls.position.y += 1.25;

//Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial(),
);
roof.position.y += 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

//Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial({
    color: "red",
  }),
);
door.position.y += 1;
door.position.z += 2 + 0.01;
house.add(door);

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial();

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial();

const graves = new THREE.Group();

for (let i = 0; i < 30; i++) {
  //Coordinates
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4; //Math.random() generates a random decimal between 0.0 and 1.0 and multiplying by 4 makes it to 0.0 to 4.0.
  // So basically adding Them Together (3 + ...)When you add the base of 3 to the random range of 0–4, you shift the entire scale upward:
  // Smallest possible result: 3 + 0 = 3. Largest possible result: 3 + 3.999... = 7. (it will get incredibly close to 7, but never quite touch it).

  // Use both sin and cos to loop continuously!
  // When to use one vs. both in Three.jsUse BOTH together when you want a 2D/3D circular
  // loop (like an orbit or a wheel spinning). By applying cos to the X-axis and sin to the
  // Z-axis, their staggered cycles work together to push and pull your object along a round path.
  // Use ONLY ONE when you want a straight back-and-forth loop (like a pendulum swinging horizontally, or a platform moving up and down.
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  // Mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4; //Keeps the height of the grave stones under half of its height i.e. 0.8
  grave.position.z = z;

  grave.rotation.x = (Math.random() - 0.5) * 0.4; //So like above...range, here 0.5 is to set range from -0.5 to 0.5 and mutiplying 0.4 will reduce to -0.2 to 0.2....
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  // Add to the graves group
  graves.add(grave);
}
scene.add(graves);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

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
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
