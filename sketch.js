let r;

// Angle and angular velocity, accleration
let theta;
let theta_vel;
let direction;

function setup() {
  createCanvas(710, 400);

  // Initialize all values
  r = height * 0.45;
  theta = radians(159);
  theta_vel = 0.05;
  direction = -1;
}

function draw() {
  background(50);

  // Translate the origin point to the center of the screen
  translate(width / 2, 0);

  // Convert polar to cartesian
  let x = r * cos(theta);
  let y = r * sin(theta);

  // Draw the ellipse at the cartesian coordinate
  ellipseMode(CENTER);
  noStroke();
  fill(200);
  ellipse(x, y, 32, 32);

  // Apply velocity to angle
  // (r remains static in this example)

  // basically, keep the box moving b/w 20 and 160 degrees
  if (theta <= radians(20)) {
    direction *= -1;
  }

  if (theta >= radians(160)) {
    direction *= -1;
  }

  theta += (theta_vel * direction);
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