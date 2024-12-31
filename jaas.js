const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

function createSnowflake() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 4 + 1, // Kar tanesi boyutu
    speed: Math.random() * 1 + 0.5, // Düşme hızı
    opacity: Math.random() * 0.8 + 0.2 // Şeffaflık
  };
}

function createSnowflakes() {
  snowflakes = Array.from({ length: 100 }, createSnowflake);
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  snowflakes.forEach(snowflake => {
    ctx.globalAlpha = snowflake.opacity;
    ctx.moveTo(snowflake.x, snowflake.y);
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  });
  ctx.fill();
}

function updateSnowflakes() {
  snowflakes.forEach(snowflake => {
    snowflake.y += snowflake.speed;
    if (snowflake.y > canvas.height) {
      snowflake.y = 0;
      snowflake.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createSnowflakes();
});

createSnowflakes();
animate();
