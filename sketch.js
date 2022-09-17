var path, boy, cash, diamonds, jwellery, sword;
var pathImg, cashImg, diamondsImg, jwelleryImg, swordImg, boyImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadImage("boy.png")
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup() {
  //create a canvas
  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(width / 2, 200);
  path.addImage(pathImg);
  path.velocityY = 4;
  //creating boy running
  boy = createSprite(width / 2, height / 2, 20, 20);
  boy.addImage("b1", boyImg)
  boy.scale = 0.2;
  // Creating the treasure
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
  arrowG = new Group();
  console.log(boy.y)
}

function draw() {
  if (gameState === PLAY) {
    background(0);
    boy.velocityY = 10
    if (keyDown("space")) {
      boy.velocityY = -12
    }
    if (keyDown(RIGHT_ARROW)) {
      boy.x = boy.x + 10
    }
    if (keyDown(LEFT_ARROW)) {
      boy.x = boy.x - 10
    }
    edges = createEdgeSprites();
    boy.collide(edges);
    //code to reset the background
    if (path.y > height) {
      path.y = height / 2;
    }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }
    else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
    }
    else {
      if (swordGroup.isTouching(boy)) {
        gameState = END;

        boy.addImage("boyImg", endImg)
        boy.x = width / 2;
        boy.y = height / 2;
        boy.scale = 0.6;

        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();

        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
      }
    }
    if (boy.isTouching(edges)) {
      gameState = END;

      boy.addImage("boyImg", endImg)
      boy.x = width / 2;
      boy.y = height / 2;
      boy.scale = 0.6;

      cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      swordGroup.destroyEach();

      cashG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Treasure: " + treasureCollection, width - 150, 30);
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 5;
    cash.lifetime = 200;
    cashG.add(cash);
  }
}
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 5;
    diamonds.lifetime = 200;
    diamondsG.add(diamonds);
  }
}
function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 5;
    jwellery.lifetime = 200;
    jwelleryG.add(jwellery);
  }
}
function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 4;
    sword.lifetime = 200;
    swordGroup.add(sword);
  }
}