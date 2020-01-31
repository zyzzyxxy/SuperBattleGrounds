document.addEventListener('keydown', function(event){
    if(event.key=='w'){player1.move('up');}
    else if (event.key=='s'){player1.move('down');}
    else if (event.key=='d'){player1.move('right');}  
    else if (event.key=='a'){player1.move('left');}
    
    if (event.key == 'Enter'){
        //shoot(player1.mesh.position, player1.direction);
       //s player1.isShooting = true;
        player1.shoot();
    }

    //Camera controls for troubleshoot 
    if (event.key == 'ArrowUp'){
        camera.position.y +=0.5;
    }
    if (event.key == 'ArrowDown'){
        camera.position.y -=0.5;
    }
    if (event.key == 'ArrowLeft'){
        camera.position.z +=0.5;
    }
    if (event.key == 'ArrowRight'){
        camera.position.z -=0.5;
    }
    camera.lookAt(0,0,0);
} );

document.addEventListener('keyup', function(event){
    if (event.key == 'Enter'){
        player1.isShooting = false;  
    }
})

