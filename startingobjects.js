var geometry = new THREE.PlaneGeometry( world_width, world_height, world_depth );
var material = new THREE.MeshStandardMaterial( {color: 0xafaf00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x+=Math.PI/2;
plane.receiveShadow = true;
scene.add( plane );

//Let there be ligth
// var light = new THREE.PointLight( 0xff00ff, 5, 100 );
// light.position.set( 5, 5, 5 );
// light.castShadows = true;
// light.cameraVisible=true;
// scene.add( light );
var movingLight1 = new movingLight(world_width/2, -world_width/2, world_depth/2, -world_depth/2);
scene.add(movingLight1.light);
movingGameObjects.push(movingLight1);


var light = new THREE.AmbientLight( 0xFF4040 ); // soft white light
//scene.add( light );

//Create a DirectionalLight and turn on shadows for the light
var light = new THREE.DirectionalLight( 0xffffff, 0.5, 100 );
light.position.set( 2, 4, 0 ); 			//default; light shining from top
light.castShadow = true;            // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;    // default
light.shadow.camera.far = 500;     // default

//origo
//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial( { color: 0xffaaff } );
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
// geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
var line = new THREE.Line( geometry, material );
scene.add(line);
 

var geometry = new THREE.BoxGeometry( 1, 2, 1 );
var material = new THREE.MeshStandardMaterial( { color: "#FF3FAA" } );
var playerMesh = new THREE.Mesh( geometry, material );
playerMesh.castShadows = true;
playerMesh.position.y=1;

var player1 = new player('up', playerMesh);
scene.add( player1.mesh );

var geometry = new THREE.BoxGeometry( 1, 2, 1 );
var material = new THREE.MeshStandardMaterial( { color: "#FF3FAA" } );
var playerMesh = new THREE.Mesh( geometry, material );
playerMesh.castShadows = true;
playerMesh.material.color.set(0xFF000);
playerMesh.position.y=1;
playerMesh.position.z=3;
playerMesh.position.x=3;
var player2 = new player('down', playerMesh);

// Add players to Scene
gameObjects.push(player1);
gameObjects.push(player2);
scene.add( player2.mesh );

//addsWalls from functions
addWalls();


// //Add walls to scene
// var wall = function(x_start, x_stop,z_start,z_stop){
//       var size_x = x_stop - x_start;
//       var size_z = z_stop - z_start;

//       var wall_geometry = new THREE.BoxGeometry(size_x , 1, size_z);
//       var wall_material = new THREE.MeshBasicMaterial( { color: "#433Fa1" } );
//       this.mesh = new THREE.Mesh( wall_geometry, wall_material );
//       this.mesh.position.set(0.5 +x_start + size_x/2, 0.5, 0.5 + z_start + size_z/2);
//       this.mesh.castShadow = true;
//       this.mesh.receiveShadow = true;
// }

//   var wall = new wall(0, 20, -3, -1);
//   scene.add( wall.mesh );
//   gameObjects.push(wall);
  
