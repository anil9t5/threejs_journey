import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5; // Converting a pixel coordinate into a standard mathematical normalized range from -1.0 to 1.0...here it's -0.5 to 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5); //So basic this is done to make the browser coordinate i.e. top/left to act like math graph, i.e. (left, center, right)
}); // And at last, the (-ve) sign on y is to make y-axis down a (-ve) value as in the math graph
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0x222222 }),
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100,
);
// const camera = new THREE.OrthographicCamera(
//   (-1 * sizes.width) / sizes.height,
//   (1 * sizes.width) / sizes.height,
//   1,
//   -1,
//   0.1,
//   100,
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// controls.target.y = 2;
controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;
  // mesh.rotation.y = cursor.x * Math.PI;

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2; // Based on the standard formula: position.x = Math.sin(angle) * radius; where * 2 is the radius to lock the camera
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2; //                       position.z = Math.cos(angle) * radius;
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(mesh.position);

  controls.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
