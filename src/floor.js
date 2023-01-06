import { Kite, Dart } from "./shapes.js";
import drawCursor, { chosenShape, cursor } from "./cursor.js";
import { W, H, Shapes, canvas } from "./globals";


const tileCtx = document.createElement("canvas").getContext("2d");
tileCtx.canvas.width = W;
tileCtx.canvas.height = H;
// TODO: can we use tileCtx without the image getting cut off?

export const floorShapes = []; //TODO: use kd tree

export function drawFloor(ctx) {
  // ctx.drawImage(tileCtx.canvas, 0, 0);
  for (let i = 0; i < floorShapes.length; i++) {
    const shape = floorShapes[i];
    shape.draw(ctx)
  }
}

export function addToFloor(shape) {
  floorShapes.push(shape);
  // shape.draw(tileCtx)
}

export function removeFromFloor(shape) {
  let index = floorShapes.indexOf(shape);  //TODO: use nonlinear remove
  if (index > -1) {
    floorShapes.splice(index, 1);
  }

  //redraw
  // tileCtx.clearRect(0, 0, W, H);
  // for (let shape of floorShapes) {
  //   shape.draw(tileCtx)
  // }
}

