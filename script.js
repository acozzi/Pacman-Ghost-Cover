var spriteSheetPacman;
var f1,f2,f3,f4,f5,f6,f7,f8;
var pac1;
var vel=5;
var dir='d';
var arregloComida=[];
var pacMaze;
var indice = 0;
function preload() {
    spriteSheetPacman=loadImage('files/pacmanSpriteSheet.png');
	pacMaze=loadImage('files/maze.png'); // 736 x 813
}
function setup() {
  frameRate(10);
  createCanvas(736, 813);
  createObjects();
  angleMode(DEGREES);
  imageMode(CENTER);
}
function draw() {
  background(50);
  showObjects();
  aiObjects();
  move();
}