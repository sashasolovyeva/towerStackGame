// ALL VARIABLES

let gamePlaying;
let gameOver = false;

let blockSize = 70;

// images
let imageUrlArray = ['assets/n.png', 'assets/p.png', 'assets/r.png'];
let imageVarArray = [];
let pit, heart;

let font;
let fontSize = 20;
let successReport = '';

let score;
let lives;

let currentBlock, firstBlock;

// Angle and angular velocity, accleration
let r;
let theta;
let theta_vel;
let direction;
let x;
let y;

// states
let swingState = true;
let dropState = false;
let shiftBlocks = false;
let initNewBlockState = false;
let shiftingBool = false;

// 2D array for three towers
let allBlocks = [[], [], []]


// BLOCK CLASSES
//___________________________________________________________________________________________________

class initBlock {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  draw () {
    noStroke();
    fill(200);
    rect(this.x, this.y, blockSize, blockSize);
  }
}

function getNum () {
  let allBlocksNums = [allBlocks[0].length, allBlocks[1].length, allBlocks[2].length];
  if(abs(allBlocksNums[0] - allBlocksNums[1]) > 2 
  || abs(allBlocksNums[1] - allBlocksNums[2]) > 2) {
    return allBlocksNums.indexOf(Math.min(...allBlocksNums));
  } else {
    return parseInt(random(3))
  }
}

class Block {
  constructor (theta, theta_vel, direction, radius, x, y, num) {
    this.theta = theta
    this.theta_vel = theta_vel
    this.direction = direction
    this.radius = radius
    this.x = x
    this.y = y
    this.fallSpeed = 15;
    this.towerNum = num;
    this.img = imageVarArray[this.towerNum];
    this.angle = 0;
  }

  draw () {
    // Draw the object at the cartesian coordinate
    noStroke();
    fill(200);
    image(this.img, this.x, this.y, blockSize, blockSize);
  }

  swing () {
    angleMode(RADIANS);
    // Convert polar to cartesian
    this.x = this.radius * cos(this.theta);
    this.y = this.radius * sin(this.theta);

    // basically, keep the box moving b/w 20 and 160 degrees
    if (this.theta <= radians(20)) {
      this.direction *= -1;
    }

    if (this.theta >= radians(160)) {
      this.direction *= -1;
    }

    // Apply velocity to angle
    // (r remains static in this example)
    this.theta += (this.theta_vel * this.direction);
  }

  drop () {
    this.y += this.fallSpeed;

    let determineRightTower = allBlocks[this.towerNum][allBlocks[this.towerNum].length - 2];
    
    if(abs(determineRightTower.y - this.y) <= blockSize) {

      // if placed successfully
      if(abs(this.x - determineRightTower.x) < blockSize/2) {
        this.fallSpeed = 0;
        score += 50;
        dropState = false;
        initNewBlockState = true;
      }

      // if came close but missed
      if(abs(this.x - determineRightTower.x) >= blockSize/2 
      && abs(this.x - determineRightTower.x) <= blockSize) {

        // if fell to the right
        if(this.x - determineRightTower.x > 0) {
          this.x += 5;
        } else {
          this.x -= 5;
        }

        if(this.y > height + 100) {
          dropState = false;
          initNewBlockState = true;
          allBlocks[this.towerNum].pop()
        }
      }
    } 
    

    // add another condition if comes close but misses

    // if placed unsuccessfully
    if(this.y > height + 100) {
      // lose a life
      lives--;
      // let them know that they missed
      successReport = 'You dropped the block or chose a wrong tower. Try again!'
      
      dropState = false;
      initNewBlockState = true;
      allBlocks[this.towerNum].pop()
    }
  }
}


// MAIN FUNCTIONS
//___________________________________________________________________________________________________


function preload() {
  font = loadFont('assets/PressStart2P-Regular.ttf');
  pit = loadImage('assets/pit-pixels.jpg');
  heart = loadImage('assets/heart.png');

  for(let i = 0; i < imageUrlArray.length; i++) {
    imageVarArray[i] = loadImage(imageUrlArray[i]);
  }
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  rectMode(CENTER);

  // font setup
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER)
  textWrap(WORD);

  gamePlaying = true;
  gameOver = false;

  score = 0;
  lives = 3;

  // Initialize all values
  r = height * 0.25;
  theta = radians(159);
  theta_vel = 0.03;
  direction = -1;
  x = r * cos(theta);
  y = r * sin(theta);
  allBlocks = [[], [], []];
  successReport = '';

  for (let i = 0; i < allBlocks.length; i++) {
    firstBlock = new initBlock(-width/4 + width/4 * i, height - blockSize/2);
    allBlocks[i].push(firstBlock);
  }

  currentBlock = new Block(theta, theta_vel, direction, r, x, y, getNum())
  allBlocks[currentBlock.towerNum].push(currentBlock);

  $('.leaderboard').css('display', 'none');
  $('.finalBoard').css('display', 'none');
  $('.inputForm').css('display', 'flex' );
}

let a1, a2, a3;

function draw() {
  background(40);
  tint(255, 100);
  image(pit, width/2, height/2, 800, 800);
  tint(255);
  // Translate the origin point to the center of the screen
  translate(width / 2, 0);

  // draw scoreboard
  text(successReport, 0, 150, 400)
  drawScore(380, 50);
  drawLives(380, 100);

  if (lives <= 0) {
    gamePlaying = false;
  }

  if (gamePlaying) {
    for (i = 0; i < allBlocks.length; i++){ 
      for (let j = 0; j < allBlocks[i].length; j++){
        allBlocks[i][j].draw();
      }
    }
  
    if (swingState) {
      currentBlock.swing();
      stroke(255);
      line(0, 0, currentBlock.x, currentBlock.y);
      fill(255)
    }

    if (dropState) {
      successReport = '';
      currentBlock.drop();
    }

    a1 = allBlocks[0];
    a2 = allBlocks[1];
    a3 = allBlocks[2];

    if (a1.length > 2  && a2.length > 2 && a3.length > 2) {

      if (a1[a1.length - 2].y <= height/2
        || a2[a2.length - 2].y <= height/2
        || a3[a3.length - 2].y <= height/2) {
        for(let i = 0; i < allBlocks.length; i++) {
          for(let j = 0; j < allBlocks[i].length; j++) {
            allBlocks[i][j].y += 1;
          }
        }
      }
    }


    if(initNewBlockState) {
      currentBlock = new Block(theta, theta_vel, direction, r, x, y, getNum())
      console.log(currentBlock.towerNum)
      allBlocks[currentBlock.towerNum].push(currentBlock);
      initNewBlockState = false;
      swingState = true;
    }
  } else {

    // GAME OVER STATE
    successReport = 'Thank you for playing!\nAll hail the Pit!';
    image(heart, 0, 300, 150, 150);

    $(".finalBoard").css("display", "block");
    $("#finalscore").html(score);
  }
}

function keyPressed () {
  if (keyCode == 0x20 /* SPACE */) {
    if (gamePlaying) {
      swingState = false;
      dropState = true;
    }
    else {
      setup();
    }
  }
}

function drawScore(xPos, yPos) {
  fill(255);
  textAlign(RIGHT)
  text("SCORE: " + score.toString(), xPos, yPos);
  textAlign(CENTER)
}

function drawLives(xPos, yPos) {
  fill(255);
  textAlign(RIGHT)
  text("LIVES: " + lives.toString(), xPos, yPos);
  textAlign(CENTER)
}