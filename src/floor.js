import { Kite, Dart } from "./shapes.js";
import drawCursor, { chosenShape, cursor } from "./cursor.js";
import { W, H, Shapes } from "./globals";


const tileCtx = document.createElement("canvas").getContext("2d");
tileCtx.canvas.width = W;
tileCtx.canvas.height = H;

export default function drawFloor(ctx) {
  ctx.drawImage(tileCtx.canvas, 0, 0);
}

window.addEventListener("mousedown", () => {
  drawCursor(tileCtx);
});

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => tileCtx.clearRect(0, 0, W, H))
