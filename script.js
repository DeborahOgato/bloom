const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const flowers = [];
const particles = [];

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  flowers.push(new Flower(mouse.x, mouse.y));
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.maxSize = Math.random() * 20 + 20;
    this.life = 100;
    this.rotation = Math.random() * Math.PI * 2;
    this.color = `hsl(${Math.random() * 360}, 90%, 70%)`;
  }
  update() {
    this.size += 0.4;
    this.life--;
    this.rotation += 0.01;
  }

  draw() {


    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);


    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3);

      ctx.beginPath();
      ctx.ellipse(0, this.size, this.size / 2, this.size, 0, 0, Math.PI * 2);

      ctx.fillStyle = this.color;

      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;

      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#fff5cc";
    ctx.fill();

    ctx.restore();
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 200;
    this.size = Math.random() * 3;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random();
  }
  update() {
    this.y -= this.speed;

    if (this.y < -10) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) {
  particles.push(new Particle());
}
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  gradient.addColorStop(0, "#081120");
  gradient.addColorStop(1, "#140b24");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawMoon() {
  ctx.beginPath();
  ctx.arc(canvas.width - 150, 120, 50, 0, Math.PI * 2);

  ctx.fillStyle = "#f5f3ce";

  ctx.shadowBlur = 40;
  ctx.shadowColor = "#f5f3ce";

  ctx.fill();
  ctx.shadowBlur = 0;
}

function animate() {
  requestAnimationFrame(animate);

  drawBackground();
  drawMoon();

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  flowers.forEach((flower, index) => {
    flower.update();
    flower.draw();

    if (flower.life <= 0) {
      flowers.splice(index, 1);
    }
    });

 
  ctx.fillStyle = "white";
  ctx.font = "28px Arial";
  ctx.fillText("Bloomwave", 30, 50);

  ctx.font = "18px Arial";
  ctx.fillText("Move your mouse to grow flowers", 30, 80);
}

animate();