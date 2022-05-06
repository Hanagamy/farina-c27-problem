const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundIMG;
var tower;
var towerIMG;
var cannon;
var angle;
var ball;
var balls = [];
var boat;
var boats = [];
var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;
function preload() {
backgroundIMG = loadImage('assets/background.gif');
towerIMG = loadImage('assets/tower.png');
boatSpriteData = loadJSON('assets/boat/boat.json')
boatSpruteSheet = loadImage('assets/boat/boat.png')
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  var options = {
    isStatic: true
  }
  
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
  
  tower = Bodies.rectangle(160,350,160,310,options);
  World.add(world, tower);

  angleMode(DEGREES);
  angle = 20;

  cannon = new Cannon(180,110,130,100,angle);
  boat = new Boat(width-79,height-60,170,170,-80)
//  ball = new Ball(cannon.x,cannon.y);
  var boatFrames = boatSpriteData.frames;
  for(i=0;i<boatFrames.length; i++){
    var pos = boatFrames[i].position;
    //var ing = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
    //boatAnimation.push(ing)
  }
}

function draw() {
  image(backgroundIMG,0,0,1200,600);
  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width *2, 1);
  push();
  imageMode(CENTER);
  image(towerIMG,tower.position.x, tower.position.y, 160,310);
  pop();

  cannon.display();
  for(var i=0; i<balls.length; i++){
    showcannonball(balls[i],i);
    collidi(i);
  }
  botes();
}
function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();

  }
}
function keyPressed(){
if(keyCode===DOWN_ARROW){
var cannonball = new Ball(cannon.x,cannon.y);
balls.push(cannonball);
}
}
function showcannonball(ball,index){
if(ball){
  ball.display();
  if(ball.body.position.x>=width||ball.body.position.y>=height-50){
    ball.remove(index);
  }
}
}
function botes(){
  if(boats.length>0){
    if(boats[boats.length-1]===undefined||
      boats[boats.length-1].body.position.x<width-300){
        var positions = [-40,-60,-70,-20];
        var position = random(positions);
        var boat = new Boat(width,height-100,170,170,position,boatAnimation);
        boats.push(boat);
    }
    for(var i=0; i<boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{
          x:-0.9,
          y:0
        });
        boats[i].display();
        boats[i].animate();
      }
    }
  }
  else{
    var boat=new Boat(width,height-60,170,170,-60,boatAnimation);
    boats.push(boat);
    }
}
function collidi(index){
  for(var i=0; i<boats.length; i++){
    //verificar que o indice da muiniçao estao definidos ou nao
    if(balls[index]!== undefined && boats[i]!== undefined){
      //verificar colisao entre dois pontos
      var collision = Matter.SAT.collides(balls[index].body,boats[i].body)
      if(collision.collided){
        boats[i].remove(i);
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      }
    }
  }
} 