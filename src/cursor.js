import { Kite, Dart } from "./shapes.js";
import { W, H, Shapes } from "./globals";

const cursorCtx = document.createElement("canvas").getContext("2d");
cursorCtx.canvas.width = W;
cursorCtx.canvas.height = H;

export const cursor = {x: 0, y: 0};
export let chosenShape = Shapes.KITE;

let k = new Kite(0, 0);
let d = new Dart(0, 0);
let theta = 0;

export default function drawCursor(ctx) {
  cursorCtx.clearRect(0, 0, W, H);
  if (chosenShape == Shapes.KITE) {
    k.x = cursor.x;
    k.y = cursor.y;
    k.draw(cursorCtx, theta, 50);
  } else {
    d.x = cursor.x;
    d.y = cursor.y;
    d.draw(cursorCtx, theta, 50);
  }

  ctx.drawImage(cursorCtx.canvas, 0, 0);
}

const canvasClientRatio = 1;
canvas.addEventListener("mousemove", e => {
  cursor.x = e.offsetX * canvasClientRatio;
  cursor.y = e.offsetY * canvasClientRatio;

});

window.addEventListener("mousewheel", e => {
  chosenShape = 1 - chosenShape;
});

window.addEventListener("keypress", e => {
  if      (e.key == "q") theta -= Math.PI / 5;
  else if (e.key == "e") theta += Math.PI / 5;
  else if (e.key == "1") chosenShape = Shapes.KITE;
  else if (e.key == "2") chosenShape = Shapes.DART;
});

