import { Kite, Dart } from "./shapes.js";
import { W, H, Shapes, tree, camera } from "./globals";
import { ghostShape, theta } from "./main";

const cursorCtx = document.createElement("canvas").getContext("2d");
cursorCtx.canvas.width = W;
cursorCtx.canvas.height = H;

export const cursor = {x: 0, y: 0};
export let chosenShape = Shapes.KITE;

export default function drawCursor(ctx) {
  cursorCtx.clearRect(0, 0, W, H);

  ctx.drawImage(cursorCtx.canvas, 0, 0);
}

const canvasClientRatio = 1;

canvas.addEventListener("mousemove", e => {
  cursor.x = e.offsetX / camera.scale  + camera.x;
  cursor.y = e.offsetY / camera.scale  + camera.y;
});


window.addEventListener("keypress", e => {
  if (e.key == "1")      chosenShape = Shapes.KITE;
  else if (e.key == "2") chosenShape = Shapes.DART;
});

