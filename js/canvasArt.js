// Note: this requires html2canvas.js is loaded in the global scope.

import createEdgeMapFromImageData from './edgeDetect.js';

const TWO_PI = Math.PI * 2;
const NUM_PARTICLES = 10000;

// const header = document.getElementById('header');
// let mouseX = 0;
// let mouseY = 0;
// header.onmousemove = (e => {
//   mouseX = (e.pageX / header.offsetWidth) * 2 - 1;
//   mouseY = (e.pageY / header.offsetHeight) * 2 - 1;
// });

const canvas = document.createElement('canvas');
  // canvas.style.zIndex = 0;
  canvas.width = header.offsetWidth;
  canvas.height = header.offsetHeight;
  canvas.style.position = 'absolute';
  canvas.style.left = '0px';
  canvas.style.top = '0px';
  const ctx = canvas.getContext("2d");

export default function canvasArt() {
  let particles = [];
  let edgeMap = [];
  // get image
  const img = new Image();
  img.src = 'assets/arif.jpeg';
  img.decode().then(()=> {
    // canvas.width = img.width;
    // canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, img.width, img.height)
    edgeMap = createEdgeMapFromImageData(imgData);
    createParticles();
  });

  // this uses num particles
  // function createParticles() {
  //     for (let i = 0; i < NUM_PARTICLES; i++) {
  //     let p = new Particle();
  //     let edgeAccessor = Math.floor((edgeMap.length / NUM_PARTICLES) * i);
  //     if (edgeMap[edgeAccessor] > 64) {
  //       let x = edgeAccessor % canvas.width;
  //       let y = (edgeAccessor - x) / canvas.width;
  //       p.setPosition(x,y);
  //     } else p.setPosition(0,0);
  //     particles.push(p);
  //   }
  // }

  // here we want to create a particle for every white pixel of edgeMap
  function createParticles() {
    for (let i = 0; i < edgeMap.length; i++) {
      if (edgeMap[i] > 64) {
        let x = (i % img.width);
        let y = (i - x) / img.width;
        x = (x/img.width) * canvas.width;
        y = (y/img.height) * canvas.height;
        let p = new Particle();
        p.desiredPosition.set(new Vector(x,y));
        particles.push(p);
      }
    }
  }

  console.log(particles);

  (function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      // p.flock(particles);
      p.update();
      p.draw();
    });
  })();

  header.insertBefore(canvas, header.firstChild);
}

// BOILERPLATE

class Particle {
  constructor() {
    this.position = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
    this.desiredPosition = new Vector();
    this.velocity = Vector.random(Math.random());
    this.acceleration = new Vector();
    this.maxForce = 0.01;
    this.maxSpeed = 3;
    this.size = 10;
  }
  
  update() {
    // interpolate between where you are and where you want to be
    // V3 = alpha * V1 + (1 - alpha) * V2;

    // this.velocity.add(this.acceleration);
    // this.position.set(this.position.add(this.velocity));
    this.position.set(this.desiredPosition);
    // constrain to bounds
    if (this.position.x > canvas.width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = canvas.width;
    if (this.position.y > canvas.height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = canvas.height;
    // this.position.x = Vector.clamp(this.position.x, 0, canvas.width);
    // this.position.y = Vector.clamp(this.position.y, 0, canvas.height);
  }

  draw() {
    ctx.fillRect(this.position.x, this.position.y, 1, 1);
  }
}

class Vector {
  constructor(x = 0, y = 0) {
    if (x instanceof Vector) this.set(x);
    this.x = x;
    this.y = y;
  }

  set(other) {
    this.x = other.x;
    this.y = other.y;
  }

  add(other) {
    let v = new Vector();
    v.x = this.x + other.x;
    v.y = this.y + other.y;
    return v;
  }

  mul(other) {
      this.x *= other.x;
      this.y *= other.y;
  }

  mulBy(value) {
    let v = new Vector();
    v.x = this.x * value;
    v.y = this.y * value;
    return v;
  }

  divBy(value) {
    this.x /= value;
    this.y /= value;
  }

  sub(other) {
    let v = new Vector();
    v.x = this.x - other.x;
    v.y = this.y - other.y;
    return v;
  }

  getAngle() {
    let m = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x /= m;
    this.y /= m;
    return Math.atan2(this.y, this.x) + Math.PI * 0.5;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  // limit(value) {
  //   this.x = Math.min(this.x, value);
  //   this.y = Math.min(this.y, value);
  // }

  // limit the magnitude of this to value
  limit(value) {
    const mSq = this.x * this.x + this.y * this.y;
    if (mSq > value * value) {
      this.divBy(Math.sqrt(mSq)); //normalize it
      this.mulBy(value);
    }
    return this;
  };

  static random(scalar = 1) {
    function fromAngle(angle, length = 1) {
      return new Vector(length * Math.cos(angle), length * Math.sin(angle));
    };
    let angle = fromAngle(Math.random() * TWO_PI);
    angle.mulBy(scalar);
    return angle;
  }

  static dist(v1, v2) {
    const a = v1.x - v2.x;
    const b = v1.y - v2.y;
    return Math.sqrt(a * a + b * b);
  }

  static diff(v1, v2) {
    const a = v1.x - v2.x;
    const b = v1.y - v2.y;
    return new Vector(a,b);
  }

  static clamp(number, lower, upper) {return Math.min(upper, Math.max(lower, number));}
}