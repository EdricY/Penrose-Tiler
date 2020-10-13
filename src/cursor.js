import { Kite, Dart } from "./shapes.js";
import { W, H, Shapes, tree, dist } from "./globals";

const cursorCtx = document.createElement("canvas").getContext("2d");
cursorCtx.canvas.width = W;
cursorCtx.canvas.height = H;

export const cursor = {x: 0, y: 0};
export let chosenShape = Shapes.KITE;

let k = new Kite(0, 0);
let d = new Dart(0, 0);
export let theta = 0;

export default function drawCursor(ctx) {
  cursorCtx.clearRect(0, 0, W, H);

  //TODO: remove me
  if (chosenShape == Shapes.KITE) {
    k.x = cursor.x;
    k.y = cursor.y;
    k.draw(cursorCtx, theta, 1);
  } else {
    d.x = cursor.x;
    d.y = cursor.y;
    d.draw(cursorCtx, theta, 1);
  }
  ////

  let nearest = tree.nearest(cursor)[0]
  let [pt] = nearest || [];

  if (pt) {
    cursorCtx.beginPath();
    cursorCtx.strokeStyle = "yellow";
    cursorCtx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
    cursorCtx.stroke();
    cursorCtx.closePath();

    if (dist(cursor, pt.right) < dist(cursor, pt.left)) pt = pt.right;
    else pt = pt.left;
    cursorCtx.beginPath();
    cursorCtx.strokeStyle = "black";
    cursorCtx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
    cursorCtx.stroke();
    cursorCtx.closePath();
  }


  ctx.drawImage(cursorCtx.canvas, 0, 0);
}

const canvasClientRatio = 1;
canvas.addEventListener("mousemove", e => {
  cursor.x = e.offsetX * canvasClientRatio;
  cursor.y = e.offsetY * canvasClientRatio;
});

canvas.addEventListener("mousedown", () => {
  const { x, y } = cursor;
  let s = chosenShape == Shapes.KITE ? new Kite(x, y) : new Dart(x, y);
  let alphas = s.alphas
  tree.insert(alphas[0]);
  tree.insert(alphas[1]);
});


window.addEventListener("mousewheel", e => {
  chosenShape = 1 - chosenShape;
});

const pi = Math.PI;
window.addEventListener("keypress", e => {
  if      (e.key == "q") theta -= pi / 5;
  else if (e.key == "e") theta += pi / 5;
  else if (e.key == "1") chosenShape = Shapes.KITE;
  else if (e.key == "2") chosenShape = Shapes.DART;
});

