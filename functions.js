function remove_from_game(object){
    scene.remove(object.mesh);
    gameObjects.splice(gameObjects.indexOf(object), 1);
    movingGameObjects.splice(movingGameObjects.lastIndexOf(object), 1);
}
function addWalls(){
    var wall1 = new wall(-14, 14, -12, -10);
    var wall2 = new wall(-14, 14, -2, -1);
    var wall3 = new wall(-16, -14, -14, 14);
    var wall4 = new wall(16, 14, 14, -14);
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