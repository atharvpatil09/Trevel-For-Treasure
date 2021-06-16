var START =0;
var PLAY =1;
var END =2;
var gameState = START;

var bg,back;
var boy;
var playerImage;
var coinImg;
var checkPointImg,doorKeyImg,gameOverImg,guard1Img,guard2Img,startImg,
    guard3Img,guard4Img,coinsGroup,obstaclesGroup,boyCollidedImg;
var reStartImg, keyImg,coinsImg,keysGroup,playImg,homeImg,boy2Img, backgroundMusic1, backgroundMusic2, bonus;
var score = 0;
var keys = 0;


function preload(){
  //loading the images and animations
  
  bg = loadImage("forest1.jpg");
  playerRunning = loadAnimation("boy1.png","boy2.png","boy3.png");
  
  
  coinImg = loadAnimation("coin/c1.png","coin/c2.png","coin/c3.png","coin/c4.png","coin/c6.png");
  

  
  keyImg = loadImage("Key.png");
  doorKeyImg = loadImage("doorKey.png");
  gameOverImg = loadImage("gameOver.png");
  guard1Img = loadImage("guard1.png");
  guard2Img = loadImage("guard2.png");
  guard3Img = loadImage("guard3.png");
  guard4Img = loadImage("guard4.png");
  startImg = loadImage("start.png");
  reStartImg = loadImage("restart.png");
  
  boyCollidedImg = loadAnimation("boycollide.png");
  coinsImg = loadImage("coins.png");
  
  playImg = loadImage("PlaybuttonImg.png");
  boy2Img = loadImage("boy1.png");
  bonus = loadImage("bonusImg.png");
  
  
  //loading all game sounds
  
  pointSound = loadSound("sounds/pointS.mp3");
  gameOverSound = loadSound("sounds/gameOverS.wav");
  backgroundMusic1 = loadSound("bgSound1.wav");
  backgroundMusic2 = loadSound("bgSound2.wav");
  bomusSound = loadSound("bonuspoint.wav");
 
}



function setup() {
  createCanvas(800,400);
    
  
  
  
  //creating  background 
    
   back  = createSprite(50,200);
   back.addImage(bg);
   back.x = back.width /2;
   back.scale = 1.15;
  
   //creating invisible ground
  
  invisibleGround = createSprite(400,370,800,10);
  invisibleGround.visible = false;
  
  //creating the playing character
  
   boy = createSprite(100,350,30,50);
   boy.addAnimation("Running",playerRunning);
   boy.addAnimation("collided",boyCollidedImg);
   boy.scale = 0.2;
  
   
   
  
  gameOver = createSprite(400,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
   
  reStart = createSprite(400,280);
  reStart.addImage(reStartImg);
  reStart.scale = 0.5;
  reStart.visible = false;
  
  
  
  scoreCoin = createSprite(90,50);
  scoreCoin.addImage(coinsImg);
  
  key2 = createSprite(550,50);
  key2.addImage(doorKeyImg);
  key2.scale = 0.3;

  bonusPoint = createSprite(350,50);
  bonusPoint.addImage(bonus);
  bonusPoint.scale = 0.4
  bonusPoint.visible = false;
  
   
   
   coinsGroup = new Group();
   obstaclesGroup = new Group();
   keysGroup = new Group();

   backgroundMusic1.loop();
 
}

 

function draw(){
  background(255,255,255);  

  
  
  if(gameState===PLAY)
  {

   
   
      if(back.x<0){
      back.x = back.width/2;
      }
      back.velocityX = -(8 + 1*score/100);

      //making boy jump

     if(keyDown("up_arrow") && boy.y>250)
      {
        boy.velocityY = -13;
      }

      boy.velocityY = boy.velocityY+1;
      boy.collide(invisibleGround);
      boy.debug = false;
      boy.setCollider("rectangle",0,0,300,400);  

      //calling functions
     
      spawnObstacles();
      spawnCoin();
      spawnKey();
  
     //  boy.debug = true;
    
     if(coinsGroup.isTouching(boy))
       {
        pointSound.play()
        coinsGroup.destroyEach();
        score = score+5;
        bonusPoint.visible = false;
        
       }   

     if(obstaclesGroup.isTouching(boy))
      {
        
         gameState=END;
         boy.changeAnimation("collided",boyCollidedImg);
         backgroundMusic1.stop();
         gameOverSound.play();
      }
    
     if(keysGroup.isTouching(boy))
       {
         keysGroup.destroyEach();
         keys = keys+1;
         score = score+50;
         bomusSound.play();
         image(bonus);
         bonusPoint.visible = true;
       }
       
   }
    else if(gameState===END)
    {
      back.velocityX = 0;
      boy.velocityY =0;
        
      bonusPoint.visible = false;
        
      obstaclesGroup.setVelocityXEach(0);
      coinsGroup.setVelocityXEach(0);
      keysGroup.setVelocityXEach(0);
        
      obstaclesGroup.setLifetimeEach(-1);
      coinsGroup.setLifetimeEach(-1);
      keysGroup.setLifetimeEach(-1);
        
      gameOver.visible = true;
      reStart.visible = true;
    
    
     if(mousePressedOver(reStart)) {
        reset();
      
      }

  }
  
  
    
   
  
  drawSprites();
  
  
  push();
  strokeWeight(1);
  stroke("yellow");
  fill("black");
  textSize(25);
  text("Score : " + score,50,50);
  
  strokeWeight(1);
  stroke("yellow");
  fill("black");
  textSize(25);
  text("Keys : " + keys,600,50);
  pop();
  
   if(gameState===START) 
  {
  

    push();
    fill("green");
    rect(0,0,800,400);
    
   push();
    stroke("yellow");
    fill("black");
    rect(95,10,600,200);
    textSize(20)
    text("--STORY OF THE GAME--",280,50)
    pop();
    
    textSize(20);
    fill("pink");
    text("Ones there was a boy named Raghu. He cames to know that there ",100,80);
    text("is a big treasure in the forest. That treasure is located in a fort in.",100,100);
    text("Raghu needs so many keys to unlock that forts door. So he have to ",100,120);
    text("cover so much distance in that forest. But its not easy, ",100,140);
    text("because there are so many guards on his way, so he have to",100,160);
    text("escape from that guards then he can reach that treasure.",100,180);
    
    stroke("yellow");
    fill("black");
    rect(95,220,600,100);
    text("HOW TO PLAY",320,240);
    
    stroke("blue");
    fill("red");
    text("You have to escape from the guards ,to collect the coins and to ",100,260);
    text("collect the keys in the game You have to press-> UP_ARROW key " ,100,280);
    text("so you can jump and escape from guards and collect coins & keys",100,300)
    
    fill("black");
    text("Guards",710,20);
    text("Player",20,20);
    text("Coins",20,150);
    text("Keys",20,250);
    scale(0.2);
    
    image(guard1Img,3400,100);
    image(guard2Img,3450,650);
    image(guard3Img,3500,1100);
    image(guard4Img,3400,1500);
    image(boy2Img,20,150);
    scale(2);
    image(coinsImg,70,400);
    scale(0.7);
    image(keyImg,50,900);
    scale(2)
    image(playImg,480,560);
    pop();
 
    
    if(keyCode===32)
      {
        gameState=PLAY;
         
      }
     
  }
  
}  
  
  
  



function spawnObstacles(){
  //creating obstacles 
  if(frameCount%120===0)
    {
      var obstacles = createSprite(850,320,50,50);
      obstacles.velocityX = -(8 + 1*score/100);
      
    //   obstacles.debug = true;
      obstacles.setCollider("rectangle",0,0,230,400);
     
      
      var rand = Math.round(random(1,4))
      switch(rand)
       {
          case 1: obstacles.addImage(guard1Img);
          break;
          case 2: obstacles.addImage(guard2Img) ;
          break;
          case 3: obstacles.addImage(guard3Img) ;
          break;
          case 4: obstacles.addImage(guard4Img) ;
          break;
          default:
          break;
      }
      obstacles.scale = 0.22;
      obstacles.lifetime=120;
      obstaclesGroup.add(obstacles);
      
    
      
   }
}

function spawnCoin(){
  
  if(frameCount%110===0){
    var coin = createSprite(800,200);
    coin.addAnimation("coin",coinImg);
    coin.scale = 0.5;
    coin.velocityX = -(8 + 1*score/100);
    coinsGroup.add(coin);
    coin.debug = false;
    coin.setCollider("circle",0,0,30);
    
    coin.depth = gameOver.depth;
    gameOver.depth = gameOver.depth+1;
  }  
  }

function spawnKey()
{
  if(frameCount%500===0)
    {
      var key = createSprite(900,200)
      key.addImage(keyImg);
      key.velocityX = -(8 + 1*score/100);
      key.scale = 0.3;
      keysGroup.add(key);
      key.lifetime = 100;

      key.depth = gameOver.depth;
      gameOver.depth = gameOver.depth+1;
      
    }
}

function reset()
{
  gameOverSound.stop();
  backgroundMusic1.loop();
  gameState = PLAY;
  gameOver.visible =false;
  reStart.visible =false;
  
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  keysGroup.destroyEach();
  
  boy.changeAnimation("Running",playerRunning);
  bonusPoint.visible = false;
  boy.y = 350
  
  score =0;
  keys =0;
  
  
      
}

