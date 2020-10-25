import drawCursor, { chosenShape, cursor } from "./cursor.js";
import { drawFloor, addToFloor, removeFromFloor, floorShapes } from "./floor.js";

import { W, H, canvas, tree, dist, degrees2Radians, PI, posMod, Shapes, near } from "./globals";
import { Halfedge, Point } from "./halfedge.js";
import { Dart, Kite } from "./shapes.js";


const visCtx = canvas.getContext("2d");
visCtx.canvas.width = W;
visCtx.canvas.width = H;

requestAnimationFrame(tick);

function drawPath(ctx) {
  let ptr = origin;
  ctx.beginPath();
  ctx.moveTo(ptr.x, ptr.y);
  ptr = ptr.next;
  let i = 0;
  while (ptr != origin && i < maxDepth) {
    ctx.lineTo(ptr.x, ptr.y);
    ptr = ptr.next;
    i ++;
  }
  ctx.lineTo(ptr.x, ptr.y);
  ctx.lineJoin = "round";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "aqua";
  ctx.stroke();
  ctx.lineWidth = 2;
}

function drawCircle(pt, color) {
  visCtx.beginPath();
  visCtx.strokeStyle = color;
  visCtx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
  visCtx.stroke();
  visCtx.closePath();
}

function tick() {
  visCtx.clearRect(0, 0, W, H);
  update();
  drawFloor(visCtx);
  drawCursor(visCtx);

  if (close1) {
    let shapeClass = chosenShape == Shapes.KITE ? Kite : Dart;
    visCtx.globalAlpha = .5;
    shapeClass.drawPreview(visCtx, close1);
    visCtx.globalAlpha = 1;

    visCtx.fillText(close1.x + " " + close1.y, 20, 20)
    visCtx.fillText(close1.alpha + " " + close1.blue, 20, 40)
    visCtx.fillText(close1.theta, 20, 60)
    drawCircle(close1, "blue");
  }



  requestAnimationFrame(tick);
}

let temp1;

export let theta = 0;
let close1 = null;

function update() {
  let he = closest();
  close1 = he;
  if (tree.empty()) tree.insert(new Halfedge(null, new Point(300, 400), new Point(300, 300), true, true, 0));
}

function closest() {
  if (tree.empty()) return null;
  // let maxDistSq = null
  let maxDistSq = tree.isSizeOne() ? null : 100*100
  let res = tree.nearest(cursor, 1, maxDistSq);
  if (res.length == 0) return null;
  let [he] = res[0];
  return he;
}

function connect(a, b) {
  a.next = b;
  b.prev = a;
}

canvas.addEventListener("mousedown", e => {
  if (e.button == 0) handlePlace();
  if (e.button == 2) handleRemove();
});

canvas.addEventListener("contextmenu", e => {
  e.preventDefault();
});

function handlePlace() {
  if (!close1) return;
  let start = close1;
  let shapeClass = chosenShape == Shapes.KITE ? Kite : Dart;
  let newShape = new shapeClass(close1);
  let ptr = start;
  do {
    ptr = ptr.next;
    tree.remove(ptr);
    
    // TODO try populate opp face
    if (ptr.opp.face == null) {
      tree.insert(ptr.opp);
    }

  } while (ptr != start);
  addToFloor(newShape);
}


function handleRemove() {
  let faceToRemove = close1.opp.face;
  if (!faceToRemove) return;
  let start = close1.opp.face.halfedge;
  let ptr = start;
  do {
    if (ptr.opp.face == null) {
      tree.remove(ptr.opp);
      console.log("r", tree.nearest(cursor, 20).length);
    } else {
      ptr.face = null;
      tree.insert(ptr);
    }
    ptr = ptr.next;
  } while (ptr != start)

  removeFromFloor(faceToRemove);
}

