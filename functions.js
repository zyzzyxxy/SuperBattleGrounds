function remove_from_game(object){
    scene.remove(object.mesh);
    gameObjects.splice(gameObjects.indexOf(object), 1);
    movingGameObjects.splice(movingGameObjects.lastIndexOf(object), 1);
}
function addWalls(){
    var wall1 = new wall(0, world_width+1, world_depth/2, 1+ world_depth/2);
    var wall2 = new wall(0, world_width+1, -world_depth/2, -1 -world_depth/2);
    var wall3 = new wall(world_width/2, 1+world_width/2, 0, world_depth);
    var wall4 = new wall(-world_width/2, 1-world_width/2, 0, world_depth);
    var wall5 = new wall(3, 5, 4, 14);
    
    walls = [];
    walls.push(wall1);
    walls.push(wall2);
    walls.push(wall3);
    walls.push(wall4);
    walls.push(wall5);

    walls.forEach(function(wall) {
        scene.add(wall.mesh);
        gameObjects.push(wall);      
    }
    );

  
}
function checkPositionInWorld(){
    for(var i=0; i< movingGameObjects.length; i++){
        var x = movingGameObjects[i].mesh.position.x;
        var y = movingGameObjects[i].mesh.position.y;
        var z = movingGameObjects[i].mesh.position.z;
        if(
            x > world_width || x < -world_width 
            || z > world_depth || z < -world_depth ||
             y > world_height || y < -world_height
            ){

                scene.remove( movingGameObjects[i].mesh );
                gameObjects.splice(gameObjects.indexOf(movingGameObjects[i]), 1);
                movingGameObjects.splice(i, 1);
                //this.movingGameObjects =movingGameObjects.filter((x)=> x!=movingGameObjects[i]); // xx will contain all element except 'a'
                //console.log(movingGameObjects);

            }
    }
}
function updateMovables(){
    //must make move function in objects for god´s sake
    for(var i=0; i< movingGameObjects.length; i++){
        movingGameObjects[i].move();
    }
    for(var i=0; i< gameObjects.length; i++){
        if(gameObjects[i] instanceof player){
            gameObjects[i].update();
        }
    }
    
    checkPositionInWorld();
    collisiondetection(this.gameObjects);
}
function getOpositeDirection(direction){
    if(direction=='up'){
        return 'down';
    }
    else if (direction=='down'){
        return 'up';
    }
    else if (direction=='right'){
        return 'left';
    }  
    else if (direction=='left'){
        return 'right';
    }
}

function cameraControl(){
    camera.rotation.x = -1.2;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    detlaX = player1.mesh.position.x - camera.position.x;
    detlaZ = player1.mesh.position.z +10 - camera.position.z;
    camera.position.x += detlaX*0.01;
    camera.position.z += detlaZ*0.01;
}
function shoot(position, direction, shooterId){
    var pshot = new shot(position, direction, shooterId);
    movingGameObjects.push(pshot);
    gameObjects.push(pshot);
    console.log(gameObjects);
    scene.add(pshot.mesh);
}
function shootHoming(position, direction, shooterId, victim){
    var pshot = new homingMissile(position, direction, shooterId, victim);
    movingGameObjects.push(pshot);
    gameObjects.push(pshot);
    console.log(gameObjects);
    scene.add(pshot.mesh);
}

function displayInfo(text){
    document.getElementById('info').innerHTML = text;
}
function displayP1HUD(text){
    document.getElementById('p1hud').innerHTML = text;
}
function displayP2HUD(text){
    document.getElementById('p2hud').innerHTML = text;
}
function spawnStuff(){
    if(lastSpawnedSeeker + seekerSpawnInterval < gameTime ){
        spawnSeeker();
        lastSpawnedSeeker = gameTime;
    }
   
}
function spawnSeeker(){
    let seekr = new seeker(player1);
    
    gameObjects.push(seekr);
    movingGameObjects.push(seekr);
    scene.add(seekr.mesh);
}