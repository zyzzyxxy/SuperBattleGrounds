class player {
    //TODO constructor shouldnt need mesh fix for class!
    constructor(direction, mesh) {
    this.shootRate = 500;
    this.shootRateHoming = 1000;
    this.lastShot = 0;
    this.lastHoming = 0;
    this.direction = direction;
    this.tag = 'player';
    this.lifes = 3;
    this.isShooting = false;
    this.homingMissileCount = 3;

    this.choosenVictim;

    this.mesh = mesh;
    this.mesh.castShadow=true;
    this.mesh.receiveShadow=true;
    }
    
    die(){
      this.lifes--;
      console.log('I am shot' + this.type + " lifes:"+ this.lifes)
      if(this.lifes==0){remove_from_game(this)}
    }

    move(direction){
        if(direction=='up'){
            this.mesh.position.z-=1;
            this.direction = 'up';
        }
        else if (direction=='down'){
            this.mesh.position.z+=1;
            this.direction = 'down';
        }
        else if (direction=='right'){
            this.mesh.position.x+=1;
            this.direction = 'right';
        }  
        else if (direction=='left'){
            this.mesh.position.x-=1;
            this.direction = 'left';
        }
    }
    moveBack(direction){
            if(direction=='up'){
                this.mesh.position.z+=1;
                this.direction = 'up';
            }
            else if (direction=='down'){
                this.mesh.position.z-=1;
                this.direction = 'down';
            }
            else if (direction=='right'){
                this.mesh.position.x-=1;
                this.direction = 'right';
            }  
            else if (direction=='left'){
                this.mesh.position.x+=1;
                this.direction = 'left';
            }
    }
    bounceBack(){
        this.moveBack(this.direction);
        this.moveBack(this.direction);
        this.moveBack(this.direction);
    }
    bounceForward(){
        this.move(this.direction);
        this.move(this.direction);
        this.move(this.direction);
    }
    bounceTo(direction){
        this.move(direction);
        this.move(direction);
        this.move(direction);
    }
    update(){
        // if(Date.now() > (this.lastShot+this.shootRate) && this.isShooting){
        //     this.shoot()
        //     this.lastShot = Date.now();
        // }
    }
    shoot(type){
        console.log(type);

        if(type == 'basic' && Date.now() > (this.lastShot+this.shootRate)){
            shoot(this.mesh.position, this.direction, this);
            this.lastShot = Date.now();
        }
        else if(type == 'homing' && Date.now() > (this.lastHoming+this.shootRateHoming)){
            shootHoming(this.mesh.position, this.direction, this, this.choosenVictim);
            this.lastHoming = Date.now();
        }

    }
  }

class shot{
      
    constructor(position, direction, shooterId){
        this.direction = direction;
        this.tag = 'shot';
        this.type = 'shot';
        this.firedBy = shooterId;


        this.speed = 0.5;
        var shot_geometry = new THREE.BoxGeometry( .3, .3, .3 );
        var shot_material = new THREE.MeshBasicMaterial( { color: "#00aa00" } );
        this.mesh = new THREE.Mesh( shot_geometry, shot_material );
        this.mesh.position.set(position.x, 0.5, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }
    move(){
        if(this.direction=='up'){
            this.mesh.position.z-=this.speed;
        }
        if(this.direction=='down')
            this.mesh.position.z+=this.speed;
        if(this.direction=='left')
            this.mesh.position.x-=this.speed;
        if(this.direction=='right')
            this.mesh.position.x+=this.speed;
    }
    die(){
        remove_from_game(this);
        console.log('i am dead ' + this.type);
      }
}
class homingMissile{
      
    constructor(position, direction, shooterId, victim){
        this.direction = direction;
        this.tag = 'shot';
        this.type = 'shot';
        this.firedBy = shooterId;
        this.victim = victim;
        this.isLaunching = true;
        this.homingHeight = 7;
        this.qRotVal = 10;

        this.speed = 0.05;
        var shot_geometry = new THREE.BoxGeometry( .5, 1.5, .5 );
        var shot_material = new THREE.MeshBasicMaterial( { color: "#FFa000" } );
        this.mesh = new THREE.Mesh( shot_geometry, shot_material );
        this.mesh.position.set(position.x, 0.5, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

    }
    move(){
        if(this.isLaunching){
            this.mesh.position.y+=this.speed;
            if(this.mesh.position.y > this.homingHeight){
                this.isLaunching = false;
            }
        }


        if(!this.isLaunching){
            var deltaX = this.mesh.position.x - this.victim.mesh.position.x;
            var deltaY = this.mesh.position.y - this.victim.mesh.position.y;
            var deltaZ = this.mesh.position.z - this.victim.mesh.position.z;

            var moveConstant = Math.abs(deltaX) + Math.abs(deltaY) + Math.abs(deltaZ);

            this.mesh.position.x -= Math.sign(deltaX)*this.speed*(Math.abs(deltaX)/moveConstant);
            this.mesh.position.y -= Math.sign(deltaY)*this.speed*(Math.abs(deltaY)/moveConstant);
            this.mesh.position.z -= Math.sign(deltaZ)*this.speed*(Math.abs(deltaZ)/moveConstant);
            
            this.qRotVal-=0.1;

            var v3 = new THREE.Vector3(deltaX, deltaY, deltaZ);
            //v3 = v3.multiplyScalar(Math.PI/2);
            //this.mesh.lookAt(v3);
            

            var axis = new THREE.Vector3(0, 1, 0);
            this.mesh.quaternion.setFromUnitVectors(axis, v3.clone().normalize());

            //var quaternion = new THREE.Quaternion().set( deltaX, deltaY, deltaZ, 0 ).normalize();

            // var quaternion = new THREE.Quaternion();
            // quaternion.setFromAxisAngle( v3, 0 );
            // quaternion.normalize();
            // this.mesh.setRotationFromQuaternion(quaternion);


        }
        
    }
    die(){
        remove_from_game(this);
        console.log('i am dead ' + this.type);
      }
}

class wall{
    constructor(x_start, x_stop,z_start,z_stop){
        this.tag = 'wall';
        //making sure it´s done in right order
        if(x_start>x_stop){var temp = x_stop; x_stop = x_start; x_start = temp; }
        if(z_start>z_stop){ var temp = z_stop; z_stop = z_start; z_start = temp; }

        var size_x = x_stop - x_start;
        var size_z = z_stop - z_start;
        if(size_x%2==1){size_x++;}
        if(size_z%2==1){size_z++;}
    
        var wall_geometry = new THREE.BoxGeometry(size_x , 1.5, size_z);
        var wall_material = new THREE.MeshStandardMaterial( { color: "#433Fa1" } );
        this.mesh = new THREE.Mesh( wall_geometry, wall_material );
        if(size_x%2==0){ //for lining it up...
            x_start+=0.5;
        }
        this.mesh.position.set(x_start, 0.5,z_start + 0.5);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }
    die(){
        console.log('i am hit ' + this.type);
      }
    
}
class movingLight{
    constructor(xmax, xmin, zmax,zmin){
        this.xmax = xmax;
        this.xmin = xmin; 
        this.zmax = zmax;
        this.zmin = zmin;
        this.speed = 0.02;
        this.directionX = 1;
        this.directionZ = 1;
        this.light = new THREE.PointLight( 0xffafff, 10, 1000 );
        this.light.position.set( 5, 5, 5 );
        this.light.castShadows = true;
        this.light.cameraVisible = true;
        var shot_geometry = new THREE.BoxGeometry( .3, .3, .3 );
        var shot_material = new THREE.MeshBasicMaterial( { color: "#00aa00" } );
        this.mesh = new THREE.Mesh( shot_geometry, shot_material );
        this.mesh.position.y=5;
    }
    move(){
        if(this.light.position.x > this.xmax || this.light.position.x < this.xmin){
            this.directionX = -this.directionX;
        }
        if(this.light.position.z>this.zmax || this.light.position.z< this.zmin){
            this.directionZ = -this.directionZ;
        }
        this.light.position.x += this.speed*this.directionX; 
        this.light.position.z += this.speed*this.directionZ; 
     }
}

class follower {
    constructor(victim) {
    this.rotationVariable = 0;
    this.speed = 0.01;
    this.tag = 'npc';
    this.lifes = 1;
    this.victim = victim;
    var followerGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var followerMaterial= new THREE.MeshStandardMaterial( { color: "#FF000" } );
    var followerMesh = new THREE.Mesh( followerGeometry, followerMaterial );
    followerMesh.castShadows = true;
    followerMesh.material.color.set(0x0000FF);
    followerMesh.position.y=3;
    followerMesh.position.z=3;
    followerMesh.position.x=3;

    this.mesh = followerMesh;
    this.mesh.castShadow=true;
    this.mesh.receiveShadow=true;
    }
    
    die(){
      this.lifes--;
      console.log('I am shot' + this.type + " lifes:"+ this.lifes)
      if(this.lifes==0){remove_from_game(this)}
    }

    move(){
        var deltaX = this.mesh.position.x - this.victim.mesh.position.x;
        var deltaZ = this.mesh.position.z - this.victim.mesh.position.z;
        var totDelta = Math.abs(deltaX) + Math.abs(deltaZ);
        if(deltaX > 1 || deltaX < -1){
            this.mesh.position.x -= deltaX*this.speed;
        }
        if(deltaZ > 1 || deltaZ < -1){
            this.mesh.position.z -= deltaZ*this.speed;
        }
        if(totDelta<1 && totDelta > -1){totDelta=1;}
        this.mesh.position.x -= deltaX*this.speed + (totDelta/2)*Math.cos(this.rotationVariable)/50;
        this.mesh.position.z -= deltaZ*this.speed + (totDelta/2)*Math.sin(this.rotationVariable)/50;
        this.rotationVariable +=0.1*totDelta/2;
    }
  }
class seeker {
    constructor(victim) {
    this.up = false;
    this.jumpSpeed = 0.05;
    this.speed = 0.02;
    this.tag = 'npc';
    this.type = 'seeker';
    this.lifes = 1;
    this.victim = victim;
    var seekerGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var seekerMaterial= new THREE.MeshStandardMaterial();
    var seekerMesh = new THREE.Mesh( seekerGeometry, seekerMaterial );
    seekerMesh.castShadows = true;
    seekerMesh.material.color.set(0xF0A0A0);
    seekerMesh.position.y=5;
    seekerMesh.position.z=Math.floor(Math.random()*world_depth-5 - (world_depth-5)/2 + 2); //should prob check perfect values
    seekerMesh.position.x=Math.floor(Math.random()*world_width-5 - (world_width-5)/2 + 2);

    this.mesh = seekerMesh;
    this.mesh.castShadow=true;
    this.mesh.receiveShadow=true;
        // while(collisionDetectionSingleObjectXZ(gameObjects, this)){
        //     this.mesh.position.z=Math.floor(Math.random()*world_depth-5 - (world_depth-5)/2 + 2);
        //     this.mesh.position.x=Math.floor(Math.random()*world_width-5 - (world_width-5)/2 + 2);
        // }
    }
    
    die(){
      this.lifes--;
      console.log('I am shot ' + this.type + " lifes:"+ this.lifes)
      if(this.lifes==0){remove_from_game(this)}
    }
    moveX(){        
        var deltaX = this.mesh.position.x - this.victim.mesh.position.x;
        this.mesh.position.x -= Math.sign(deltaX)*this.speed;
    }
    moveZ(){
        var deltaZ = this.mesh.position.z - this.victim.mesh.position.z;
        this.mesh.position.z -= Math.sign(deltaZ)*this.speed;
    }
    move(){
        this.moveX();
        this.moveZ();
        if(this.up){
            this.mesh.position.y += this.jumpSpeed;
            if(this.mesh.position.y>1.5){ this.up=false}

        }
        else{
            this.mesh.position.y -= this.jumpSpeed;
            if(this.mesh.position.y<0.5){ this.up=true}
        }
    }
    moveReverseX(){
        var deltaX = this.mesh.position.x - this.victim.mesh.position.x;
        this.mesh.position.x += Math.sign(deltaX)*this.speed;
    }
    moveReverseZ(){
        var deltaZ = this.mesh.position.z - this.victim.mesh.position.z;
        this.mesh.position.z += Math.sign(deltaZ)*this.speed;
    }
    moveReverse(){
        this.moveReverseX()
        this.moveReverseZ()
    }
  }




