document.addEventListener('keydown', function(event){
    if(event.key=='w'){player1.move('up');}
    else if (event.key=='s'){player1.move('down');}
    else if (event.key=='d'){player1.move('right');}  
    else if (event.key=='a'){player1.move('left');}
    
    if (event.key == 'Enter'){
        player1.shoot('basic');
    }
    if (event.key == 'Shift'){
        player1.shoot('homing');
    }

    //Camera controls for troubleshoot 
    // if (event.key == 'ArrowUp'){
    //     camera.position.y +=0.5;
    // }
    // if (event.key == 'ArrowDown'){
    //     camera.position.y -=0.5;
    // }
    // if (event.key == 'ArrowLeft'){
    //     camera.position.z +=0.5;
    // }
    // if (event.key == 'ArrowRight'){
    //     camera.position.z -=0.5;
    // }
    
    //Temporary p2 controls
    if (event.key == 'ArrowUp'){
        player2.move('up');
    }
    if (event.key == 'ArrowDown'){
        player2.move('down');
    }
    if (event.key == 'ArrowLeft'){
        player2.move('left');
    }
    if (event.key == 'ArrowRight'){
        player2.move('right');
    }

} );

document.addEventListener('keyup', function(event){
    if (event.key == 'Enter'){
        player1.isShooting = false;  
    }
})

