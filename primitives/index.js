import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Setting up the renderer
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Setting up the camera
const fov = 75;
const aspectRatio = width / height;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.z = 2;

// Setting up the scene
const scene = new THREE.Scene();

// Setting up orbital camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Creating an objects and adding it to the scene
const geometry = new THREE.IcosahedronGeometry(0.5, 0);
const maretial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geometry, maretial);
scene.add(mesh);

const wireMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geometry, wireMaterial);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// Setting up a light source
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

// Animate and render
function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001;
  controls.update();
  renderer.render(scene, camera);
}

animate();
