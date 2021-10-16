var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(800, 600);

  tower = createSprite(400,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 1.35;

  doorsGroup = new Group();
  climbersGroup = new Group();

  ghost = createSprite(400,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4;
  ghost.setCollider("circle",0,0,40);
  ghost.debug = true;

  invisibleBlockGroup = new Group();
}

function draw() {
  background("black");
  
  if(gameState == "play") {
    if(tower.y > 400){
        tower.y = 300
    }
    
    if(keyDown("left_arrow")) {
      ghost.x = ghost.x-2;
    }
    if(keyDown("right_arrow")) {
      ghost.x = ghost.x+2;
    }
    if(keyDown("SPACE")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY+0.8;

    makeDoor();

    if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
    spookySound.play();
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>=600) {
      ghost.destroy();
      gameState = "end";
    }
    
    drawSprites();
  }
 
  if(gameState == "end") {
    spookySound.stop();
    textSize(50);
    fill("white");
    text("Game Over",250,300);
  }

}

function makeDoor() {
  if(frameCount%300==0) {
    door=createSprite(400,-50);
    climber=createSprite(400,-5);
    door.addImage("door",doorImg);
    climber.addImage("railing",climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    door.scale = 0.75;
    climber.scale = 0.75;
    door.x = Math.round(random(200,600));
    climber.x = door.x;
    door.lifetime = 700;
    climber.lifetime = 700;
    door.depth = ghost.depth-1;
    climber.depth = ghost.depth-1;
    doorsGroup.add(door);
    climbersGroup.add(climber);

    invisibleBlock = createSprite(400,0,climber.width,2);
    invisibleBlock.x = climber.x;
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
