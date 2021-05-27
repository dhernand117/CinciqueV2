import './style.css';
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(200);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshNormalMaterial({ color: 0x24c3ce });
const torus = new THREE.Mesh(geometry, material);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 25, 25);
  const material = new THREE.MeshStandardMaterial({ color: 0xfb670c });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1500).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('cincinight.jpg');
scene.background = spaceTexture;

// Avatar

const mainCube = new THREE.TextureLoader().load('cincique.jpg');
const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: mainCube }));


// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

moon.position.z = 30;
moon.position.setX(-10);

cube.position.z = -5;
cube.position.x = 2;

//Random Geometry

const RGeometry = new THREE.TorusGeometry(10, .5, 16, 100);
const RMaterial = new THREE.MeshNormalMaterial({ color: 0xf0f0f0 });
const RTorus = new THREE.Mesh(RGeometry, RMaterial);

RTorus.position.z = 50;

const LGeometry = new THREE.TorusGeometry(10, 0.5, 16, 100);
const LMaterial = new THREE.MeshPhongMaterial({ color: 0x3ef8a8 });
const LTorus = new THREE.Mesh(LGeometry, LMaterial);

LTorus.position.z = 50;

//Random Geometry 2

const anotherMoon = new THREE.TextureLoader().load("moon.jpg");

const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: anotherMoon,
  })
);

moon2.position.z = 50;

scene.add(torus, cube, moon, RTorus,LTorus, moon2);




// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  cube.rotation.y += 0.04;
  cube.rotation.z += 0.01;

  camera.position.z = t * -0.015;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  RTorus.rotation.x += 0.03;
  RTorus.rotation.y += 0.01;
  RTorus.rotation.z += 0.02;

  LTorus.rotation.x += 0.02;
  LTorus.rotation.y += 0.02;
  LTorus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();