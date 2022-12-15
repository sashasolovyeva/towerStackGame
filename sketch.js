class Block {
  constructor (theta, theta_vel, direction, radius, x, y) {
    this.theta = theta
    this.theta_vel = theta_vel
    this.direction = direction
    this.radius = radius
    this.x = x
    this.y = y
  }

  draw () {
        // Draw the ellipse at the cartesian coordinate
        ellipseMode(CENTER);
        noStroke();
        fill(200);
        ellipse(this.x, this.y, 32, 32);
  }

  swing () {

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
}

let r;
let allBlocks = [];
let currentBlock;
// Angle and angular velocity, accleration
let theta;
let theta_vel;
let direction;
let x;
let y;

function setup() {
  createCanvas(710, 400);
  // Initialize all values
  r = height * 0.45;
  theta = radians(159);
  theta_vel = 0.05;
  direction = -1;
  x = r * cos(theta);
  y = r * sin(theta);

  currentBlock = new Block(theta, theta_vel, direction, r, x, y)
  allBlocks.push(currentBlock);
}

function draw() {
  background(0);

  // Translate the origin point to the center of the screen
  translate(width / 2, 0);
  currentBlock.draw()
  currentBlock.swing()
}

// this is for future encapsulation
let g, t, gamePlaying

// function setup () {
//   createCanvas(400, 400)
//   g = new Grid(400, 400, 7, 10)
//   g.add(g.maxLevelLength)
//   gamePlaying = true
//   t = setInterval(g.step.bind(g), 100)
// }

// function draw () {
//   background(220)
//   g.draw()
// }

function keyPressed () {
  if (keyCode == 0x20 /* SPACE */) {
    if (gamePlaying) {
      g.place()
    } else {
      setup()
    }
  }
}