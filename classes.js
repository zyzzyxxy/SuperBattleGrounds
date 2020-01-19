class player {
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


