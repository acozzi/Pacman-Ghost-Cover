/*
 * Class Fantasma / Ghost
 */
function Ghost(posX,posY,spriteX,spriteY){
  this.x=posX;
  this.y=posY;
  this.xSpeed=1;
  this.ySpeed=1;
  this.ghostFrame=[];
  this.dir='d';
  this.bool=true;
  this.direccionH=true;
  this.colorH=spriteX;
  this.colorV=spriteY;
  this.avance=int(random(20,50));
  this.veces=0;
  for(var i=0;i<8;i++){
    this.ghostFrame[i]=spriteSheetPacman.get(this.colorH,50*i+this.colorV,50,50);
  }

  this.setX=function(mod){
    this.x+=mod;
  }
  this.setY=function(mod){
    this.y+=mod;
  }
  this.ai=function(){
    if(this.direccionH){
      if(this.xSpeed>0){
        this.dir='r';
      } else {
        this.dir='l';
      }
      if(this.veces<this.avance){
        this.moveH();
        this.checkEdges();
        this.veces++;
      } else {
        this.direccionH=false;
        this.veces=0;
        this.avance=int(random(20,50));
        if(this.avance>35){
          this.xSpeed*=-1;
        }
      }
    } else {
      if(this.ySpeed>0){
        this.dir='d';
      } else {
        this.dir='u';
      }
      if(this.veces<this.avance){
        this.moveV();
        this.checkEdges();
        this.veces++;
      } else {
        this.direccionH=true;
        this.veces=0;
        this.avance=int(random(20,50));
        if(this.avance>35){
          this.ySpeed*=-1;
        }
      }
    }
  }
  this.checkEdges=function(){
    if(this.x>width || this.x<0){
      this.xSpeed*=-1;
    }
    if(this.y>height || this.y<0){
      this.ySpeed*=-1;
    }

  }

  
  this.moveH=function(){
    this.setX(5*this.xSpeed);
  }
  
  this.moveV=function(){
    this.setY(5*this.ySpeed);
  }  

  
  this.show=function(){
    switch(this.dir){
      case 'r':
        if(this.bool){
          this.bool=false;
          image(this.ghostFrame[0],this.x,this.y);
        } else {
          this.bool=true;
          image(this.ghostFrame[1],this.x,this.y);
        }
        break;
      case 'd':
        if(this.bool){
          this.bool=false;
          image(this.ghostFrame[2],this.x,this.y);
        } else {
          this.bool=true;
          image(this.ghostFrame[3],this.x,this.y);
        }
        break;
      case 'l':
        if(this.bool){
          this.bool=false;
          image(this.ghostFrame[4],this.x,this.y);
        } else {
          this.bool=true;
          image(this.ghostFrame[5],this.x,this.y);
        }
        break;
      case 'u':
        if(this.bool){
          this.bool=false;
          image(this.ghostFrame[6],this.x,this.y);
        } else {
          this.bool=true;
          image(this.ghostFrame[7],this.x,this.y);
        }
        break;      
    }
  }
};

/*
 * Class Pacman
 */
function Pacman(posX,posY,spriteX,spriteY){
  this.x=posX;
  this.y=posY;
  this.xSpeed=1;
  this.ySpeed=1;
  this.pacFrame=[];
  this.arrayPac=[1,2,1,0];
  this.dir='d';
  this.bool=true;
  this.direccionH=true;
  this.colorH=spriteX;
  this.colorV=spriteY;
  this.i=0;
	this.chew=false;
  for(var i=0;i<12;i++){
    this.pacFrame[i]=spriteSheetPacman.get(this.colorH,50*i+this.colorV,50,50);
  }

  this.setX=function(mod){
    this.x+=mod;
  }
  this.setY=function(mod){
    this.y+=mod;
  }
	this.setChew=function(value){
		this.chew=value;
	}
  this.getX=function(){
    return this.x;
  }
  this.getY=function(){
    return this.y;
  }
  this.checkEdges=function(){
    if(this.x>width || this.x<0){
      this.xSpeed*=-1;
    }
    if(this.y>height || this.y<0){
      this.ySpeed*=-1;
    }

  }
  
  this.setDir=function(dir){
    this.dir=dir;
		this.setChew(true);
    switch(this.dir){
      case 'r':
        this.setX(8);
				this.setChew(true);
      break;
      case 'l':
        this.setX(-8);
				this.setChew(true);
      break;
      case 'u':
        this.setY(-8);
				this.setChew(true);
      break;
      case 'd':
        this.setY(8);
				this.setChew(true);
      break;
    }
    
  }

  
  this.show=function(){
    push();
    translate(this.x,this.y);
    switch(this.dir){
      case 'r':
        rotate(0);
        break;
      case 'l':
        rotate(180);
        break;
      case 'u':
        rotate(270);
        break;
      case 'd':
        rotate(90);
        break;
    }
		if(this.chew){
			if(this.i<3){
				image(this.pacFrame[this.arrayPac[this.i]],0,0);
				this.i++;  
			} else{
				image(this.pacFrame[this.arrayPac[this.i]],0,0);
				this.i=0;
			}
		} else {
			image(this.pacFrame[this.arrayPac[this.i]],0,0);
		}
    pop();
		this.setChew(false);
  }
};
/*
 * Class Food / Comida
 */
function Comida(posX, posY, spriteX, spriteY) { // CLASE 316 362
	// ------Atributos (variables)---------------------------
	this.x = posX;
	this.y = posY;
	this.sX = spriteX;
	this.sY = spriteY;
	this.food = spriteSheetPacman.get(this.sX, this.sY, 6, 6);
	this.existe = true;
	// ------Métodos (funciones)---------------------------
	this.mostrar = function() {
		if (this.existe == true) {
			image(this.food, this.x, this.y);
		}
	}
	this.chequearSiComio = function(xPac, yPac) {
		if (dist(xPac, yPac, this.x, this.y) < 10) {
			this.existe = false;
		}
	}
};
/*
 * Procedures
 */
function createObjects(){
  f1=new Ghost(50,50,0,0);
  f2=new Ghost(50,100,50,0);
  f3=new Ghost(100,50,100,0);
  f4=new Ghost(100,100,150,0);
  f5=new Ghost(150,50,200,0);
  f6=new Ghost(150,100,250,0);
  f7=new Ghost(200,50,50,550);
  f8=new Ghost(200,100,0,550);
  pac1=new Pacman(500,100,850,0);
  for (var fila = 0; fila < 30; fila++) {
    for (var columna = 0; columna < 30; columna++) {
      arregloComida[indice] = new Comida(fila * 25, columna * 25 + 10,416,362);
      indice++;
    }
  }
}
function showObjects(){
	image(pacMaze,368,406); //736, 813
  for (var i=0;i<900;i++) {
    arregloComida[i].mostrar();
    arregloComida[i].chequearSiComio(pac1.getX(),pac1.getY());
  }  
  f1.show();
  f2.show();
  f3.show();
  f4.show();
  f5.show();
  f6.show();
  f7.show();
  f8.show();
  pac1.show();
}
function aiObjects(){
  f1.ai();
  f2.ai();
  f3.ai();
  f4.ai();
  f5.ai();
  f6.ai();
  f7.ai();
  f8.ai();
}
function move(){
  if(keyIsPressed){
    switch(keyCode){
      case UP_ARROW:
        pac1.setDir('u');
      break;
      case LEFT_ARROW:
        pac1.setDir('l');
      break;
      case DOWN_ARROW:
        pac1.setDir('d');
      break;
      case RIGHT_ARROW:
        pac1.setDir('r');
      break;
      default:
        fill(0);
        text("Tecla no reconocida",20,20);

    }
  }
}

