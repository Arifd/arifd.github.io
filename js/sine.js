const TWO_PI = Math.PI * 2;
const NUM_PARTICLES = 100;

const header = document.getElementById('header');
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
  (function loop(dt){
    setTimeout(loop, 1000);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();

  header.insertBefore(canvas, header.firstChild);
}