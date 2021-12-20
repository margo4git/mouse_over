const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const windowX = window.innerWidth;
const windowY = window.innerHeight;
let mouseX = 0;
let mouseY = 0;

canvas.width = windowX;
canvas.height = windowY;

const balls = [];
function random() {
  return array[Math.floor(Math.random() * array.length)];
}
function createCircle() {
  this.color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  this.alpha = Math.random() + 0.1;
  this.radius = Math.floor(Math.random() * 60 + 10);
  this.startRadius = this.radius;
  this.moveX = Math.random() * 10;
  this.moveY = Math.random() * 8;
  this.x = Math.floor(
    Math.random() * (windowX - 2 * this.radius) + this.radius
  );
  this.y = Math.floor(
    Math.random() * (windowY - 2 * this.radius) + this.radius
  );
  this.update = function () {
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.beginPath();
  };
  this.update();
}
for (let i = 0; i < 25; i++) {
  balls.push(new createCircle());
}
window.requestAnimationFrame(moveCircles);
function moveCircles() {
  ctx.clearRect(0, 0, windowX, windowY);
  balls.forEach((ball) => {
    ball.x += ball.moveX;
    ball.y += ball.moveY;
    if (
      ball.x + ball.moveX > windowX - ball.radius ||
      ball.x + ball.moveX < ball.radius
    ) {
      ball.moveX = -1 * ball.moveX;
    }
    if (
      ball.y + ball.moveY > windowY - ball.radius ||
      ball.y + ball.moveY < ball.radius
    ) {
      ball.moveY = -1 * ball.moveY;
    }
    if (
      mouseX < ball.x + ball.radius &&
      mouseX > ball.x - ball.radius &&
      mouseY < ball.y + ball.radius &&
      mouseY > ball.y - ball.radius &&
      ball.radius < 100
    ) {
      ball.radius += 2;
    } else if (ball.radius >= 99 && ball.radius <= 100) {
      balls.splice(balls.indexOf(ball), 1);
    } else if (ball.radius > ball.startRadius) {
      ball.radius += -1;
    }
    ball.update();
  });
  window.requestAnimationFrame(moveCircles);
}
canvas.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});
