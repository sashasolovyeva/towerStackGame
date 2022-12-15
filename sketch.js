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

  step () {
    // Translate the origin point to the center of the screen
    translate(width / 2, 0);

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

class World {

  constructor (width, height) {
    this.width = width
    this.height = height

    let r = height * 0.45;
    let theta = radians(159);
    let theta_vel = 0.05;
    let direction = -1;

    this.levels = [
      (this.currentLevel = new Block(
        theta,
        theta_vel,
        direction,
        r,
        r * cos(theta),
        r * sin(theta)
      ))
    ]
  }

  draw () {
    console.log("In the World's draw!")
    background(0)
    this.levels.forEach(level => level.draw())
  }

  // add (length) {
  //   const newLevel = new Level(
  //     length,
  //     this.lastLevel.x,
  //     this.rows,
  //     this.height - (this.levels.length + 1) * this.rowHeight,
  //     this.columnWidth,
  //     this.rowHeight
  //   )
  //   newLevel.isRight = this.lastLevel.isRight

  //   this.secondLastLevel = this.lastLevel

  //   this.levels.push((this.lastLevel = newLevel))
  // }

  step () {
    this.currentLevel.step()
  }

  // place () {
  //   const [x1, x2, l1, l2] = [
  //     this.lastLevel.x,
  //     this.secondLastLevel.x,
  //     this.lastLevel.length,
  //     this.secondLastLevel.length
  //   ]

  //   const lowerBound = Math.max(x1, x2)
  //   const upperBound = Math.min(x1 + l1, x2 + l2)

  //   const length = upperBound - lowerBound

  //   if (length > 0) {
  //     this.lastLevel.x = lowerBound
  //     this.lastLevel.length = length

  //     this.add(length)
  //     if (this.levels.length > this.columns) {
  //       this.secondLastLevel.colour = 'green'
  //       gamePlaying = false
  //       clearInterval(t)
  //     }
  //   } else {
  //     this.lastLevel.colour = 'red'
  //     gamePlaying = false
  //     clearInterval(t)
  //   }
  // }
}

let g, t, gamePlaying

function setup() {
  createCanvas(400, 400)
  g = new World(400, 400)
  // g.add(g.maxLevelLength)
  gamePlaying = true
  t = setInterval(g.step.bind(g), 100)
}

function draw() {
  background(0)
  g.draw()
}

function keyPressed () {
  if (keyCode == 0x20 /* SPACE */) {
    if (gamePlaying) {
      // g.place()
    } else {
      setup()
    }
  }
}