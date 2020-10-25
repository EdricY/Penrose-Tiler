import drawCursor, { chosenShape, cursor } from "./cursor.js";
import drawFloor, { addToFloor } from "./floor.js";

import { W, H, canvas, tree, dist, midpoint, degrees2Radians, PI, posMod, Shapes, near } from "./globals";
import { Halfedge, Point } from "./halfedge.js";
import { Dart, Kite } from "./shapes.js";


const visCtx = canvas.getContext("2d");
visCtx.canvas.width = W;
visCtx.canvas.width = H;

export let firstHalfedge = new Halfedge(null, new Point(300, 400), new Point(300, 300), true, true, 0);
tree.insert(firstHalfedge);

// addToFloor(new Kite(firstHalfedge));

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
    Kite.drawPreview(visCtx, close1);
  }
  visCtx.fillText(close1.x + " " + close1.y, 20, 20)
  visCtx.fillText(close1.alpha + " " + close1.blue, 20, 40)
  visCtx.fillText(close1.theta, 20, 60)
  // visCtx.fillText("k: " + ghostShape.theta, 20, 80)

  // draw focus circles
  /*
  drawCircle(focus1, "yellow");
  drawCircle(focus1.next, "white");
  drawCircle(focus1.prev, "black");
  
  if (temp1) drawCircle(temp1, "orange");


  visCtx.fillText(cursor.x + " " + cursor.y, 20, 20)
  visCtx.fillText(focus1.x + " " + focus1.y, 20, 40)
  visCtx.fillText(focus1.innerAngle, 20, 60)


  drawPath(visCtx)
  */

  drawCircle(close1, "blue");


  requestAnimationFrame(tick);
}

let temp1;

export let theta = 0;
let close1 = null;

function update() {
  let he = closest();
  close1 = he;
  
}

function closest() {
  let res = tree.nearest(cursor, 1);
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
  let start = close1;
  let newShape = new Kite(close1);
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


// function handleRemove() {
//   if (focus1.shapes.length != 1) return;
//   let shape = focus1.shapes[0];
//   let pre = [];
//   let post = [];
//   let before = true;
//   for (let pt of shape.pts) {
//     if (pt == focus1) before = false;
//     if (before) pre.push(pt);
//     else post.push(pt);
//   }
//   let shapeTrail = [...post, ...pre];

//   let begin = null;
//   let cutPath = [];
//   for (let pt of shapeTrail) {
//     let numShapes = pt.shapes.length;
//     if (begin == null) {
//       if (numShapes == 1) continue;
//       else begin = pt;
//     }
//     cutPath.push(pt);
//     if (numShapes == 1) break;
//   }

//   //TODO: merge this with last loop (hard to do readably)
//   shapeTrail.forEach(pt => cutPath.includes(pt) ? null : tree.remove(pt));
  
//   if (begin == null) { // I hope this can only happen for the first shape
//     console.warn("tried to remove only shape")
//     return;
//   }

//   let pt1;
//   let pt2 = cutPath.pop();
//   while (cutPath.length > 0) {
//     pt1 = pt2;
//     pt2 = cutPath.pop();
//     connect(pt1, pt2);
//     console.log(pt1, pt1.blue)
//     console.log(pt2, pt2.blue)
//     pt1.alpha = pt2.prev.alpha;
//     pt1.blue = pt2.prev.blue;
//     pt1.theta = pt2.prev.theta;
//   }


// }

window.addEventListener("keypress", e => {
  if      (e.key == "q") theta -= 18;
  else if (e.key == "e") theta += 18;
  else if (e.key == "1") chosenShape = Shapes.KITE;
  else if (e.key == "2") chosenShape = Shapes.DART;
  theta = posMod(theta, 360);
});

