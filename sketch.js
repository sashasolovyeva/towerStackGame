let blockSize = 70;
let allBlocks = [];
let imageUrlArray = ['assets/n.png', 'assets/p.png', 'assets/r.png'];
let imageVarArray = [];

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

class Block {
  constructor (theta, theta_vel, direction, radius, x, y) {
    this.theta = theta
    this.theta_vel = theta_vel
    this.direction = direction
    this.radius = radius
    this.x = x
    this.y = y
    this.fallSpeed = 5;
    this.img = random(imageVarArray);
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
    
    if(abs(allBlocks[allBlocks.length - 2].y - this.y) <= blockSize) {

      // if placed successfully
      if(abs(this.x - allBlocks[allBlocks.length - 2].x) < blockSize/2) {
        this.fallSpeed = 0;
        dropState = false;
        initNewBlockState = true;
      }

      // if came close but missed
      if(abs(this.x - allBlocks[allBlocks.length - 2].x) >= blockSize/2 
      && abs(this.x - allBlocks[allBlocks.length - 2].x) <= blockSize) {

        // if fell to the right
        if(this.x - allBlocks[allBlocks.length - 2].x > 0) {
          this.x += 5;
        } else {
          this.x -= 5;
        }

        if(this.y > height + 100) {
          dropState = false;
          initNewBlockState = true;
          allBlocks.pop()
        }
      }
    } 
    

    // add another condition if comes close but misses

    // if placed unsuccessfully
    if(this.y > height + 100) {
      // TODO
      // minus points / life lost

      dropState = false;
      initNewBlockState = true;
      allBlocks.pop()
    }
  }
}

//___________________________________________________________________________________________________

let r;
let currentBlock, firstBlock;
// Angle and angular velocity, accleration
let theta;
let theta_vel;
let direction;
let x;
let y;

let swingState = true;
let dropState = false;
let initNewBlockState = false;

let incrChange = 0;

function preload() {
  for(let i = 0; i < imageUrlArray.length; i++) {
    imageVarArray[i] = loadImage(imageUrlArray[i]);
  }
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  rectMode(CENTER);

  // Initialize all values
  r = height * 0.25;
  theta = radians(159);
  theta_vel = 0.03;
  direction = -1;
  x = r * cos(theta);
  y = r * sin(theta);

  firstBlock = new initBlock(0, height - blockSize/2);
  allBlocks.push(firstBlock);

  currentBlock = new Block(theta, theta_vel, direction, r, x, y)
  allBlocks.push(currentBlock);
}

function draw() {
  background(0);
  // Translate the origin point to the center of the screen
  translate(width / 2, 0);

  firstBlock.draw();

  // start at 1 to skip the initial block
  for (i = 1; i < allBlocks.length; i++){ 
    allBlocks[i].draw();
  }
  
  if (allBlocks.length > 1) {
    if (swingState){
      allBlocks[allBlocks.length - 1].swing();
      stroke(255);
      line(0, 0, allBlocks[allBlocks.length - 1].x, allBlocks[allBlocks.length - 1].y);
    }

    if (dropState){
      allBlocks[allBlocks.length - 1].drop();
    }
  }

  if (allBlocks.length > 2) {
    if (allBlocks[allBlocks.length - 2].y <= height/2) {
      for(let i = 0; i < allBlocks.length - 1; i++) {
        allBlocks[i].y += 5;
      }
    }
  }

  if(initNewBlockState) {
    currentBlock = new Block(theta, theta_vel, direction, r, x, y)
    allBlocks.push(currentBlock);
    initNewBlockState = false;
    swingState = true;
  }
}

function keyPressed () {
  if (keyCode == 0x20 /* SPACE */) {
    swingState = false;
    dropState = true;
  }
}