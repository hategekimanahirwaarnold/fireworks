import { noise } from '@chriscourses/perlin-noise'
const x = noise(10) // returns value 0-1

import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})
let gravity = 0.005;
let friction = 0.99;
// Objects
class Particle {
  constructor(x, y, radius, color, dx, dy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.dx = dx
    this.dy = dy
    this.alpha = Math.random() + 0.8;
  }

  draw() {
    c.beginPath();
    c.save();
    c.globalAlpha = this.alpha;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.closePath();
  }

  update() {
    this.draw();
    this.dx *= friction;
    this.dy *= friction;
    this.dy += gravity;
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 0.003;
  }

}

// Implementation
let particles = [];
function init() {
  
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    if (particle.alpha > 0)
      particle.update();
    else
      particles.splice(i, 1);
  })
}

init()
animate()

addEventListener('click', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  let particleCount = 2000;
  let power = 30;

  let angleIncrement = Math.PI * 2/ particleCount;

  for (let i = 0; i < particleCount; i++)
  {
    let dx = Math.cos(angleIncrement * i) * Math.random() * power;
    let dy = Math.sin(angleIncrement * i) * Math.random() * power;
    particles.push(new Particle(mouse.x, mouse.y, 2, `hsl(${360 * Math.random()}, 80%, 50%)`, dx, dy));
  }

})
