import { Kite, Dart } from "./shapes.js";
import drawCursor from "./cursor.js";
import drawFloor from "./floor.js";

import { W, H, canvas } from "./globals";

const visCtx = canvas.getContext("2d");
visCtx.canvas.width = W;
visCtx.canvas.width = H;


requestAnimationFrame(tick);

function tick() {
  visCtx.clearRect(0, 0, W, H);

  drawFloor(visCtx);
  drawCursor(visCtx);

  requestAnimationFrame(tick);
}