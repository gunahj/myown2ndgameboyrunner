var PLAY = 1;
var END = 0;
var gameState = PLAY;
var road,r11
var ru1,r2,r3
var inground
var graphiteGroup,graphite,graphiteImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var gameOverImg,restartImg
var jumpSound , checkpoint, dieSound, collection
var GraphiteCollected
var graphite1,graphite2,graphite3,graphite4,graphite5,graphite6;

function preload(){
r11=loadImage("road.jpg")

r2=loadAnimation("r1.png","r2.png")
r3=loadAnimation("r3.png")

graphite1 = loadImage("graphite1.png");
graphite2 = loadImage("graphite2.png");
graphite3 = loadImage("graphite3.png");
graphite4 = loadImage("graphite4.png");
graphite5 = loadImage("graphite5.png");
graphite6 = loadImage("graphite6.png");

  obstacle1 = loadImage("stick 1.png");
  obstacle2 = loadImage("stick 2.png");
  obstacle3 = loadImage("stick 3.png");
  obstacle4 = loadImage("stick 4.png");
  obstacle5 = loadImage("stick 5.png");
  obstacle6 = loadImage("stick 6.png");

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameover.png")

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkpoint = loadSound("chekPoint.mp3")
  collection = loadSound("collect.mp3")
}

function setup() {
createCanvas(400,450)
background(0)
road=createSprite(200,200,200,200)
road.addImage("r",r11)
road.velocityX=-2

ru1 = createSprite(50,200,20,80);
ru1.addAnimation("run",r2);
ru1.addAnimation("s",r3);
ru1.scale = 0.2;

inground = createSprite(200,450,400,50);
inground.visible=false;

  gameOver = createSprite(200,250);
  gameOver.addImage("g",gameOverImg);
  
  restart = createSprite(200,300);
  restart.addImage("r",restartImg);
  
 
  gameOver.scale = 0.3;
  restart.scale = 0.08;

  obstaclesGroup = createGroup();
  graphiteGroup  = createGroup();

  ru1.setCollider("circle",0,0,40);
  //ru1.debug=true;
  score = 0;
  stroke("orange");
  fill("red");
  GraphiteCollected = 0;
  stroke("orange");
  fill("red");
      inground.depth = ru1.depth;
      ru1.depth = ru1.depth + 1;
}

function draw(){
    if(gameState === PLAY){
  
        gameOver.visible = false;
        restart.visible = false;
        
        road.velocityX = -(4 + 3* score/100)
        //scoring
        score = score + Math.round(getFrameRate()/60);
    
        if(ru1.isTouching(graphiteGroup)) {
          collection.play()
          GraphiteCollected=GraphiteCollected+100
          graphiteGroup.destroyEach();
        }
        
        if(score>0 && score%100 === 0){
           checkpoint.play() 
        }
        
        if (road.x < 0){
          road.x = road.width/2;
        }
        
        //jump when the space key is pressed
        if(keyDown("space")&& ru1.y >= 100) {
            ru1.velocityY = -10;
            jumpSound.play();
        }
        
        //add gravity
        ru1.velocityY = ru1.velocityY + 1
      
        //spawn the clouds
        graphites1();
      
        //spawn obstacles on the ground
        Obstacles1();
        
        if(obstaclesGroup.isTouching(ru1)){
            //trex.velocityY = -12;
            jumpSound.play();
            gameState = END;
            dieSound.play()
          
        }
      }
       else if (gameState === END) {
          gameOver.visible = true;
          restart.visible = true;
         
         //change the trex animation
          ru1.changeAnimation("s",r3);
        
         
         
          road.velocityX = 0;
          ru1.velocityY = 0
          
         
          //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        graphiteGroup.setLifetimeEach(-1);
         
         obstaclesGroup.setVelocityXEach(0);
         graphiteGroup.setVelocityXEach(0);  
    
         if(mousePressedOver(restart)) {
          reset();
        }
       }
       ru1.collide(inground);
drawSprites();
text("Score: "+ score, 10,60);
text("STONE COLLECTED:"+ GraphiteCollected,10,80)

}

function reset(){
    gameState=PLAY
    graphiteGroup.destroyEach();
    obstaclesGroup.destroyEach();
    ru1.changeAnimation("run",r2);
    score=0
    GraphiteCollected=0
  }

function Obstacles1(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,440,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
         case 4: obstacle.addImage(obstacle4);
                 break;
         case 5: obstacle.addImage(obstacle5);
                 break;
         case 6: obstacle.addImage(obstacle6);
                 break;
         default: break;
       }
      
    
       obstacle.scale = 0.2;
       obstacle.lifetime = 300;
      
      
       obstaclesGroup.add(obstacle);
    }
   }
   function graphites1() {
   
    if (frameCount % 60 === 0) {
      graphite = createSprite(600,300,40,10);
      graphite.y = Math.round(random(280,300));
     
      graphite.scale = 0.5;
      graphite.velocityX = -3;
      
      
      graphite.lifetime = 200;
      
      
      graphite.depth = ru1.depth;
      ru1.depth = ru1.depth + 1;
      
      
      graphiteGroup.add(graphite);
      graphite.scale=0.1
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: graphite.addImage(graphite1);
                break;
        case 2: graphite.addImage(graphite2);
                break;
        case 3: graphite.addImage(graphite3);
                break;
        case 4: graphite.addImage(graphite4);
                break;
        case 5: graphite.addImage(graphite5);
                break;
        case 6: graphite.addImage(graphite6);
                break;
        default: break;
      }
    }
  }
