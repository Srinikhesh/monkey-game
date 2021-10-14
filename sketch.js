var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
}



function setup() {
  
  ground=createSprite(350,350,700,10);
  ground.velocityX = -3;
  ground.x = ground.width /2;
  
  monkey=createSprite(50,320,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.08;
  
  bacground = createSprite(0,0,400,400);
  bacground.addImage(jungleImage);
  bacground.scale = 1;
  bacground.x = bacground.width/2;
  bacground.velocityX = -2;
 
  
  foodGroup=new Group();
  obstacleGroup=new Group();
  
  survivalTime = 0;
}


function draw() {

  createCanvas(600,400);
  background(0);

  text("survival Time: "+ survivalTime, 500,50);
  
  if(gameState===PLAY){
    
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (bacground.x < 0){
      bacground.x = bacground.width/2;
    }
  
  if(keyDown("space")){
    monkey.y=monkey.y-20;
  }
  ground.visible = false;
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
    
  survivalTime = Math.ceil(frameCount/frameRate());
  
  spawnObstacles();
  spawnBananas();
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
  }
   
    else if(gameState===END){
   ground.velocity=0;
   obstacleGroup.setVelocityEach(0);
   foodGroup.setVelocityEach(0);
    }
   
  
  drawSprites();
}

function spawnBananas(){
   if (frameCount%80===0){
    var banana= createSprite(600,40,40,10);
    banana.velocityX=-3;
    banana.addImage(bananaImage);
      banana.scale=0.1;
      banana.y=Math.round(random(120,200));
     banana.depth=monkey.depth;
      monkey.depth=monkey.depth+1;
     
     foodGroup.add(banana);
   }
     
}


function spawnObstacles(){
  if(frameCount%300===0){
    var obstacle=createSprite(600,320,10,10);
    obstacle.velocityX=-3;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.debug=true;
    
    obstacle.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    obstacleGroup.add(obstacle);
  }
  
}