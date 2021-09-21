import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Mesh } from 'three';

const scene = new THREE.Scene();

const camara = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

});

 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.setSize(window.innerWidth, window.innerHeight);
 camara.position.setZ(30);


 const geometry = new THREE.TorusGeometry(10,3,16,100);
 //const material = new THREE.MeshStandardMaterial({color: 0Xff6347 });
 const material = new THREE.MeshBasicMaterial({color: 0Xff6347, wireframe: true });

 const torus = new THREE.Mesh(geometry, material);

 scene.add(torus);

 const pointLight = new THREE.PointLight(0xffffff);
 pointLight.position.set(5,5,5);
 const ambientLight = new THREE.AmbientLight(0xffffff);

 scene.add(pointLight, ambientLight);

 const lightHelper = new THREE.PointLightHelper(pointLight);
 const gridHelper = new THREE.GridHelper(200, 50);
 //scene.add(lightHelper, gridHelper);

 const controls = new OrbitControls(camara, renderer.domElement);

 function addStar(){
   const geometry = new THREE.SphereGeometry(0.25, 24,24);
   const material = new THREE.MeshStandardMaterial({color: 0xffffff});
   const star = new THREE.Mesh(geometry, material);

   const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

   star.position.set(x,y,z);
   scene.add(star);
   
 }

 Array(300).fill().forEach(addStar);

 const spaceTexture = new THREE.TextureLoader().load('space.jpg');
 scene.background = spaceTexture;

 function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    moon.rotation.y += 0.005;
    
    controls.mouseButtons = {LEFT: THREE.MOUSE.LEFT};
    controls.update();

    renderer.render(scene, camara);
 }


 const moonTexture = new THREE.TextureLoader().load('moon.jpg');
 const normalTexture = new THREE.TextureLoader().load('normal.jpg');

 const moon = new Mesh(
   new THREE.SphereGeometry(3, 32, 32),
   new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
   })
 );

 scene.add(moon);
  moon.position.setZ(-5);
  moon.position.setX(20);
  moon.position.setY(20);

  torus.position.setX(15);
  torus.position.setY(-5);

  function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
    

    camara.position.x = t * -0.0025;
    camara.position.y = t * -0.0025;
    //camara.position.z = t * -0.01;

  }
  document.body.onscroll = moveCamera;

 animate(); 
