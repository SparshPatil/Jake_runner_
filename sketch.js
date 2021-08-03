var bg,jake;
var trackImage,jakeImage;
var score = 0;
var gameState= 1;

function preload(){
trackImage=loadImage("track.png");
jakeImage=loadAnimation("jake1.png","jake2.png","jake3.png","jake4.png");
trainImg1=loadImage("train_1.png");
trainImg2=loadImage("train_2.png");
trainImg3=loadImage("train_3.png");
trainImg4=loadImage("train_4.png");
coinImg=loadImage("coin_1.png");
collidedImg=loadAnimation("jake4.png")
restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")

}


function setup(){

createCanvas(displayWidth,displayHeight-200);

bg = createSprite(620,100);;
bg.addImage("track",trackImage);
bg.velocityY=1.4;
bg.scale=1.8;

Jake = createSprite(displayWidth/2, 380,20,30);
Jake.addAnimation("jake1",jakeImage);
Jake.addAnimation("collided", collidedImg);
Jake.scale = 2.2;

invisibleG = createSprite(700, displayHeight-200,1400,20);
invisibleG.visible = false;

gameOver = createSprite(650,100);
gameOver.addImage(gameOverImg);

restart = createSprite(650,170);
restart.addImage(restartImg);


gameOver.scale = 0.7;
restart.scale = 0.8;



trainsGroup= new Group();
coinsGroup= new Group();
}

function draw() {
 background(0);
 
  if(gameState===1){
    
    if (bg.y>500) {
      bg.y=200;
    } 
    gameOver.visible=false;
    restart.visible=false;

      for (var i = 0; i < coinsGroup.length; i++)
       {  
        if (coinsGroup.get(i).isTouching(Jake)) 
        { 
          coinsGroup.get(i).destroy();
         score =score+1; 
        } 
      }
    

    if (keyDown("left")) {
      Jake.x=Jake.x-5;
    }
    if (keyDown("right")) {
      Jake.x=Jake.x+5;
    }
   
    if (keyDown("space")) {
      Jake.velocityY=-2;
    }
    Jake.velocityY=Jake.velocityY+0.9;
    
    spawnTrains();
    spawnCoins();
    
   if(Jake.isTouching(trainsGroup)){
    gameState=0;

  }



  }
  else if(gameState===0){
   
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
      Jake.changeAnimation("collided", collidedImg);
     
      if(mousePressedOver(restart)) {
        reset();
    }
  
     
     
      bg.velocityY = 0;
      Jake.velocityY = 0;
      
     
      //set lifetime of the game objects so that they are never destroyed
    coinsGroup.setLifetimeEach(-1);
    trainsGroup.setLifetimeEach(-1);
     
     coinsGroup.setVelocityXEach(0);
     trainsGroup.setVelocityXEach(0);    
   



  }
  console.log(bg.y);

  
  
 



  //camera.x=Jake.x;
  // camera.y=Jake.y;
  

  Jake.collide(invisibleG);

 
  drawSprites();
  textSize(20);
  fill("black");
  text("Score: "+ score, 1200,50);
}


function spawnTrains(){
  if (frameCount % 250 === 0){
    var train = createSprite(Math.round(random(200,displayWidth-250)),0,10,40);
    train.velocityY = 6;
    
     //generate random obstacles
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: train.addImage(trainImg1);
               break;
       case 2: train.addImage(trainImg2);
               break;
       case 3: train.addImage(trainImg3);
               break;
       case 4: train.addImage(trainImg4);
               break;
       
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     //train.scale = 0.5;
     train.lifetime = 300;
     train.depth = Jake.depth;
     Jake.depth = Jake.depth + 1;
    //add each obstacle to the group
     trainsGroup.add(train);
  }
 }
 
 function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 55 === 0) {
    var coin = createSprite(Math.round(random(100,displayWidth-250)),50,10,40);
    coin.addImage(coinImg);
    coin.scale = 0.2;
    coin.velocityY = 3;
    
     //assign lifetime to the variable
   coin.lifetime = 200;
    
    //adjust the depth
    coin.depth = Jake.depth;
    Jake.depth = Jake.depth + 1;
    
    //add each cloud to the group
    coinsGroup.add(coin);
  }
}

  function reset(){
  gameState = 1; 
  trainsGroup.destroyEach();
  coinsGroup.destroyEach();  
  score = 0; 
  //console.log(bg.y);
  //bg.y=600;
  Jake.changeAnimation("jake1",jakeImage);  
 }
 

