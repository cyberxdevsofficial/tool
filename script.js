// Matrix-style background animation for the <canvas id="bg">
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // recalc columns and drops when resizing
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }).fill(1);
}

let matrix = "01";
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array.from({ length: columns }).fill(1);

resizeCanvas();

function draw() {
  // translucent black background to create the trailing effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ffe7";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

const interval = setInterval(draw, 35);

window.addEventListener('resize', resizeCanvas);
