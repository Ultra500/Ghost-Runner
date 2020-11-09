var tower,towerImg;
var ghost,ghostImg;
var door,doorImg,doorGroup
var climber,climberImg,climberGroup;
var inblock, inblockGroup;
var PLAY=1;
var END=0;
var state= PLAY

function preload(){
  towerImg=loadImage("tower.png");
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png")
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,50,600);
  tower.addImage(towerImg);
  tower.velocityY=1;
  //creating ghost
  ghost=createSprite(200,200,20,20);
  ghost.addImage(ghostImg);
  ghost.scale=0.35;
  //creating door and climber
  doorGroup=createGroup();
  climberGroup=createGroup();
  //setting up the collider
  ghost.debug=false; 
  ghost.setCollider("rectangle",0,0,170,280);  
  // setting up thhe invisible block group.
  inblockGroup=createGroup();
}

function draw(){
  background("white");
  
  if(state===PLAY){
  //tower.height/2 not working
  if(tower.y>600){
    tower.y=300
  }
  if(keyDown("space")) {
    ghost.velocityY=-7   
   }
     ghost.velocityY=ghost.velocityY+0.4;
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3;
  }
    if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.collide(climberGroup);  
  }
  
  if(ghost.isTouching(inblockGroup)|| ghost.y>600){
    ghost.destroy(); 
    state=END;
  }
  spawnDoor();
  }
  
  if(state===END){
    textSize(25)
    text("Game Over",200,200);
    
  }
  drawSprites();
}
function spawnDoor(){
  if(frameCount%200===0){
  door=createSprite(200,50,50,50);
  door.velocityY=1;
    door.addImage(doorImg)
    ghost.depth=door.depth;
    door.depth= door.depth-1;
    door.x=Math.round(random(50,500));
    door.lifetime=500;
    doorGroup.add(door);
    // attaching the climber. 
    climber=createSprite(200,50,20,20);
    climber.velocityY=1;
    climber.x=door.x;
    climber.y=door.y+70;
    climber.addImage(climberImg);
    climber.lifetime=500;
    climberGroup.add(climber);
     //attaching the invisible block. 
    inblock=createSprite(200,200,80,10)
    inblock.x=climber.x;
    inblock.y= climber.y+10;
    inblock.velocityY=1;
    inblock.lifetime= 500;
    inblockGroup.add(inblock);
    inblock.visible=false;
         
  }
}