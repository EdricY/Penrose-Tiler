import { Kite, Dart } from "./shapes.js";
import drawCursor, { chosenShape, cursor } from "./cursor.js";
import { W, H, Shapes, canvas } from "./globals";
import { firstKite, ghostShape, theta } from "./main.js";


const tileCtx = document.createElement("canvas").getContext("2d");
tileCtx.canvas.width = W;
tileCtx.canvas.height = H;

setTimeout( () => firstKite.draw(tileCtx), 10);

export default function drawFloor(ctx) {
  ctx.drawImage(tileCtx.canvas, 0, 0);
}


canvas.addEventListener("mousedown", () => {
  ghostShape.draw(tileCtx)
});

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => tileCtx.clearRect(0, 0, W, H))
