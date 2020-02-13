
function collisiondetection(objects){

    for(var i =0; i<objects.length-1; i++){
        for(var j = i+1; j<objects.length; j++){
            if(i!=j){
                if(check_collision(objects[i], objects[j])){
                    if(!handleCollision(objects[i], objects[j]))
                        handleCollision(objects[j], objects[i]);
                }   
            }
        }
    }
}
function collisionDetectionSingleObjectXZ(objects, o){
    for(var i =0; i<objects.length-1; i++){
                if(check_collisionXZ(objects[i], o)){
                    return true;
            } 
    }
    return false;
}

function check_collision(a, b){
    //check x
     if(a.mesh.position.x + (a.mesh.geometry.parameters.width/2) > b.mesh.position.x - (b.mesh.geometry.parameters.width / 2) && a.mesh.position.x - a.mesh.geometry.parameters.width/2 < b.mesh.position.x + b.mesh.geometry.parameters.width /2){
         //check y
         if(a.mesh.position.y + (a.mesh.geometry.parameters.height/2) > b.mesh.position.y - (b.mesh.geometry.parameters.height / 2) && a.mesh.position.y - a.mesh.geometry.parameters.height/2 < b.mesh.position.y + b.mesh.geometry.parameters.height /2){
         }
             //check z
             if(a.mesh.position.z + (a.mesh.geometry.parameters.depth/2) > b.mesh.position.z - (b.mesh.geometry.parameters.depth / 2) && a.mesh.position.z- a.mesh.geometry.parameters.depth/2 < b.mesh.position.z + b.mesh.geometry.parameters.depth /2){
                 if(!(a instanceof wall || b instanceof wall)){
                 }
                    return true;

             }
     }
 }
 function check_collisionXZ(a, b){
    //check x
     if(a.mesh.position.x + (a.mesh.geometry.parameters.width/2) > b.mesh.position.x - (b.mesh.geometry.parameters.width / 2) && a.mesh.position.x - a.mesh.geometry.parameters.width/2 < b.mesh.position.x + b.mesh.geometry.parameters.width /2){
             //check z
             if(a.mesh.position.z + (a.mesh.geometry.parameters.depth/2) > b.mesh.position.z - (b.mesh.geometry.parameters.depth / 2) && a.mesh.position.z- a.mesh.geometry.parameters.depth/2 < b.mesh.position.z + b.mesh.geometry.parameters.depth /2){
                //  if(!(a instanceof wall || b instanceof wall)){
                //     console.log('collision! a:' + a.type  +  " b:" + b.type);
                //  }
                    return true;

             }
     }
 }

 function handleCollision(a,b){
    let collisionHandled = false; //for checking if necessary to recall with a <-> b
    if(a instanceof shot){
        if(b instanceof player && a.firedBy != b){b.die(); collisionHandled = true;}
        if(b instanceof seeker){b.die(); a.die();collisionHandled = true;}
    } 
    if(a instanceof player){
        if(b instanceof shot && b.firedBy != a){a.die(); remove_from_game(b);collisionHandled = true;}
        if(b instanceof player){
            a.bounceBack(); b.bounceTo(a.direction); collisionHandled = true;  
        }
        if(b instanceof wall){a.moveBack(a.direction);collisionHandled = true;}
        if(b instanceof seeker){a.die(); a.moveBack(a.direction); b.die(); collisionHandled = true;}
    } 
    if(a instanceof wall){
        if(b instanceof shot){remove_from_game(b);collisionHandled = true;}
        if(b instanceof player){b.moveBack(b.direction);collisionHandled = true;}
        if(b instanceof seeker){
            b.moveReverse()
            b.moveX()
            if(check_collision(a,b)){
                b.moveReverseX();
            }
            b.moveZ()
            if(check_collision(a,b)){
                b.moveReverseZ();
            }
            collisionHandled = true;
        }
    }
    if(a instanceof seeker){
        if(b instanceof seeker){b.moveReverse();collisionHandled = true;}
        //if(b instanceof shot){a.die(); b.die();collisionHandled = true;}
        // if(b instanceof wall){
        //     a.moveReverse()
        //     a.moveX()
        //     if(check_collision(a,b)){
        //         a.moveReverseX();
        //     }
        //     a.moveZ()
        //     if(check_collision(a,b)){
        //         a.moveReverseZ();
        //     }
        //     collisionHandled = true;
        // }
    }
   return collisionHandled;
 }

//export {collisiondetection}; // a list of exported variables
