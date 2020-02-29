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

player1.choosenVictim = player2;

//testing followers
var follower1 = new follower(player1);
gameObjects.push(follower1);
movingGameObjects.push(follower1);
scene.add(follower1.mesh);

//testing seekers
// var seeker1 = new seeker(player1);
// gameObjects.push(seeker1);
// movingGameObjects.push(seeker1);
// scene.add(seeker1.mesh);
//spawndSeeker();
spawnSeeker();


// Add players to Scene
gameObjects.push(player1);
gameObjects.push(player2);
playerArray.push(player1);
playerArray.push(player2);


scene.add( player2.mesh );

//addsWalls from functions
addWalls();
  
