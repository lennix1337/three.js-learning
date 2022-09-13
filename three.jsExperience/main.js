import "./style.css";

import * as THREE from "three"; //Imports everything to animate the project
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio); //Get the device screen size
renderer.setSize(window.innerWidth, window.innerHeight); // Make full screen canvas

camera.position.setZ(30);

renderer.render(scene, camera); // render everything

//object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//texture -- MeshBasicMaterial doesn't need light source --> MeshStandardMaterial needs light source
const material = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// focus light
const pointLight = new THREE.PointLight(0xffffff);
//ambient light brights up the whole object
const ambientLight = new THREE.AmbientLight(0xffffff);

pointLight.position.set(20, 0, 20);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper); //used to show where the light point is

const controls = new OrbitControls(camera, renderer.domElement); //listen to DOM events on the mouse to update the camera positions accordingly

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100)); //randomize the positions of the stars across the scene

  star.position.set(x, y, z);
  scene.add(star);
}

//randomly fill the space with stars
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("cool.jpg");
scene.background = spaceTexture;

//loop to show the animation "game loop"
function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update(); //used to reflect the changes to the DOM events by the mouse to update the camera

  renderer.render(scene, camera);
}

animate();
