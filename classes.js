class player {
    //TODO constructor shouldnt need mesh fix for class!
    constructor(direction, mesh) {
        
    this.direction = direction;
    this.tag = 'player';
    this.lifes = 3;

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
  }

class shot{
      
    constructor(position, direction){
        this.direction = direction;
        this.tag = 'shot';


        this.speed = 0.1;
        var shot_geometry = new THREE.BoxGeometry( .3, .3, .3 );
        var shot_material = new THREE.MeshBasicMaterial( { color: "#00aa00" } );
        this.mesh = new THREE.Mesh( shot_geometry, shot_material );
        this.mesh.position.set(position.x, 0.5, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        if(direction=='up')
            this.mesh.position.z-=1;
        if(direction=='down')
            this.mesh.position.z+=1;
        if(direction=='left')
            this.mesh.position.x-=1;
        if(direction=='right')
            this.mesh.position.x+=1;
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
    this.speed = 0.01;
    this.tag = 'npc';
    this.lifes = 1;
    this.victim = victim;
    var followerGeometry = new THREE.BoxGeometry( 1, 2, 1 );
    var followerMaterial= new THREE.MeshStandardMaterial( { color: "#FF000" } );
    var followerMesh = new THREE.Mesh( followerGeometry, followerMaterial );
    followerMesh.castShadows = true;
    followerMesh.material.color.set(0xFF0000);
    followerMesh.position.y=1;
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
        this.mesh.position.x -= deltaX*this.speed;
        this.mesh.position.z -= deltaZ*this.speed;
    }
  }
class seeker {
    constructor(victim) {
    this.up = false;
    this.jumpSpeed = 0.05;
    this.speed = 0.02;
    this.tag = 'npc';
    this.lifes = 1;
    this.victim = victim;
    var seekerGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var seekerMaterial= new THREE.MeshStandardMaterial( { color: "#FF000" } );
    var seekerMesh = new THREE.Mesh( seekerGeometry, seekerMaterial );
    seekerMesh.castShadows = true;
    seekerMesh.material.color.set(0xF0A0A0);
    seekerMesh.position.y=1;
    seekerMesh.position.z=3;
    seekerMesh.position.x=3;

    this.mesh = seekerMesh;
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
        this.mesh.position.x -= Math.sign(deltaX)*this.speed;
        this.mesh.position.z -= Math.sign(deltaZ)*this.speed;
        if(this.up){
            this.mesh.position.y += this.jumpSpeed;
            if(this.mesh.position.y>1.5){ this.up=false}

        }
        else{
            this.mesh.position.y -= this.jumpSpeed;
            if(this.mesh.position.y<0.5){ this.up=true}
        }
    }
  }




