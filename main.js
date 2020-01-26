// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------
//import {collisiondetection} from './collisiondetection';

var movingGameObjects = []
var gameObjects = []
let gameTime = 0;
let gameStartTime = Date.now();

//for seekers
let lastSpawnedSeeker = 0;
let seekerSpawnInterval = 5;

const world_width=60 ;
const world_depth=40;
const world_height=40;



//Just for debugging
var firststring;
var secondstring;
var thirdstring;

// Create an empty scene
var scene = new THREE.Scene();
scene.background= new THREE.Color('blue');

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
camera.position.y = 20;
//camera.lookAt(0,0,0);
camera.rotation.x = -1.2;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;
// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshStandardMaterial( { color: "#433F81" } );
var cube = new THREE.Mesh( geometry, material );
cube.position.y=3;
cube.castShadow = true;
// Add cube to Scene
scene.add( cube );

//add other stuff
document.write('<script type="text/javascript" src="startingobjects.js" ></script>');

//eventhandling
document.write('<script type="text/javascript" src="eventhandlers.js" ></script>');


// Render Loop
var render = function () {
  requestAnimationFrame( render );
  updateMovables();
  gameTime = Math.round((Date.now() - gameStartTime)/100)/10;
  firststring = gameTime;
  displayInfo(firststring + '\n' + secondstring + '\n' + thirdstring);
  spawnStuff();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cameraControl();
  // Render the scene
  renderer.render(scene, camera);
};

render();