let flock = [];
var num;
var tileCount;
let button1;
let button2;
let button3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  num = height*.05;
  tileCount = height*.009
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  frameRate(25);
  for (i = 0; i < num; i++){
    flock.push(new Element());
  }
  link1 = createA('http://127.0.0.1:5501/PeatBramble/', '');
  link2 = createA('http://127.0.0.1:5501/GlibDive/', '');
  link3 = createA('http://127.0.0.1:5501/AtTheEndOf/', '');
  button1 = createButton('Peat Bramble').parent(link1);
  button2 = createButton('Glib Dive').parent(link2);
  button3 = createButton('Tethers').parent(link3);

}

function draw() {
  background(random(20), 20);
  H2 = map(mouseX, 0, width, 100, 70);
  grid();
  for (let i = 0; i < flock.length; i++){
    flock[i].display();
    flock[i].update();
    flock[i].edges();
  // links();
  }

function links(){
    
    button1.position(width*.25+random(-2,2), height*.25)+random(-2,2);

    
    button2.position(width*.25+random(-2,2), height*.5)+random(-2,2);

    
    button3.position(width*.25+random(-2,2), height*.75)+random(-2,2);
  }
  
}

function grid(){
  for(let gridY = 0; gridY < tileCount; gridY++){
    for(let gridX = 0; gridX < tileCount; gridX++){
      let posX = (width / tileCount) * gridX;
      let posY = (height / tileCount) * gridY;
      //introduce random choice between three
      var toggle = int(random(0, 2));
      let wiggle = (-20, 20);
      let nudge = (-2, 2);

      //display options
      if (toggle == 0) {
        stroke(H2, 100, 100, 50)
        //strokeWeight(3);
        fill(random(50,100), random(20), random(70,100));
        quad(posX + random(nudge), posY + random(nudge), 
        posX + width/tileCount + random(nudge), posY  + random(nudge),
        posX + width/tileCount + random(nudge), posY + height/tileCount + random(nudge),
        posX + random(nudge), random(nudge), posY + height/tileCount + random(nudge)
        );
      }

      if (toggle == 1) {
        strokeWeight(random(4));
        stroke(random(100), 100, 100, 50)
        line(
          posX + random(wiggle),
          posY + height / tileCount + random(wiggle),
          posX + width / tileCount + random(wiggle),
          posY + random(wiggle)
        );
      }
    }
  }
}
class Element{
  constructor(){
    this.loc = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.len = random(4,6);
    this.rad = random(height*.02, height*.05);
    this.ts = this.rad;
    this.H = random(170,300);
  }

  display(){
    noFill();
    strokeWeight(1);
    stroke(this.H, 100, 70);
    for (i = 0; i < this.rad ; i++) {
      circle(this.loc.x, this.loc.y, this.len * i);
    }
  }

  update(){
    this.a = p5.Vector.random2D();
    this.a.mult(this.rad*0.1);
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
    this.H += 1;
  }

  edges() {
    if (this.loc.x > width) {
      this.loc.x = 0;
    }
    if (this.loc.x < 0) {
      this.loc.x = width;
    }
    if (this.loc.y > height) {
      this.loc.y = 0;
    }
    if (this.loc.y < 0) {
      this.loc.y = height;
    }

    if (this.H >= 300){
      this.H = random(170, 300);
    }
  }
}

