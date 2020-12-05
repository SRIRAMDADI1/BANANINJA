
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

var score = 0;
var Survivaltime = 0;

var PLAY = 1;
var gameState = PLAY;
var END=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving", monkey_running);
monkey.scale = 0.1
  
ground = createSprite(400,350,900,10);
ground.velocityX = -4;
ground.x = ground.width /2;
ground.shapeColor= "brown";

FoodGroup = createGroup();
obstacleGroup = createGroup();
}


function draw() {
background("black");
  
fill("white");
textSize(18);
text("Score: "+score, 300,50)
  
fill("white");
text("Survival Time: "+Survivaltime, 40,50);
  
  if(ground.x<0){
  ground.x=ground.width/2;
}
  
if(gameState === PLAY){
  


if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  score = score+2;
}
  
if(frameCount%5===0){
  Survivaltime = Survivaltime+1;
}
  
if(keyDown("space")&& monkey.y>=200){
  monkey.velocityY = -12;
}

monkey.velocityY = monkey.velocityY + 0.8;

monkey.collide(ground);

spawnBanana();

spawnObstacles();
  
if(obstacleGroup.isTouching(monkey)){
  gameState = END;
}
  
 if(gameState === END){

obstacleGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);
  
obstacleGroup.setVelocityXEach(0);
FoodGroup.setVelocityXEach(0);
  
monkey.velocityY = 0;
}

}
  

drawSprites();
  
}

function spawnBanana(){
  if(frameCount%80===0){
    var banana = createSprite(600,1,1,1);
    banana.addImage("banana", bananaImage)
    banana.scale = 0.1;
    banana.y = Math.round(random(160,240));
    banana.velocityX = -4;
    banana.lifetime = 150;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    var obstacle = createSprite(400,310,1,1);
    obstacle.addImage("obstacle", obstacleImage)
    obstacle.scale = 0.2;
    obstacle.lifetime = 50;
    obstacle.velocityX = -8;
    obstacleGroup.add(obstacle);
  }
}



