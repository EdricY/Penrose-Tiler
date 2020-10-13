import { Kite, Dart } from "./shapes.js";
import drawCursor, { chosenShape, cursor, theta } from "./cursor.js";
import { W, H, Shapes, canvas } from "./globals";


const tileCtx = document.createElement("canvas").getContext("2d");
tileCtx.canvas.width = W;
tileCtx.canvas.height = H;

export default function drawFloor(ctx) {
  ctx.drawImage(tileCtx.canvas, 0, 0);
}

canvas.addEventListener("mousedown", () => {
  let shape;
  if (chosenShape == Shapes.KITE) shape = new Kite(cursor.x, cursor.y);
  else shape = new Dart(cursor.x, cursor.y);

  shape.draw(tileCtx, theta, 1);
});

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => tileCtx.clearRect(0, 0, W, H))
