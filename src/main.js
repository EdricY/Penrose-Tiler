import drawCursor, { chosenShape, cursor } from "./cursor.js";
import drawFloor, { addToFloor } from "./floor.js";

import { W, H, canvas, tree, dist, midpoint, degrees2Radians, PI, posMod, Shapes, near } from "./globals";
import { Dart, Kite } from "./shapes.js";


const visCtx = canvas.getContext("2d");
visCtx.canvas.width = W;
visCtx.canvas.width = H;

export let firstKite = new Kite(300, 400, 180)


tree.insert(firstKite.pts[0]);
tree.insert(firstKite.pts[1]);
tree.insert(firstKite.pts[2]);
tree.insert(firstKite.pts[3]);


requestAnimationFrame(tick);

let origin = firstKite.pts[1];
const maxDepth = 20
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

  // draw focus circles
  drawCircle(focus1, "yellow");
  drawCircle(focus1.next, "white");
  drawCircle(focus1.prev, "black");
  
  if (temp1) drawCircle(temp1, "orange");


  visCtx.fillText(cursor.x + " " + cursor.y, 20, 20)
  visCtx.fillText(focus1.x + " " + focus1.y, 20, 40)
  visCtx.fillText(focus1.innerAngle, 20, 60)

  if (ghostShape) {
    ghostShape.draw(visCtx, 1, true);
  }

  drawPath(visCtx)

  requestAnimationFrame(tick);
}

let temp1;

export let theta = 0;
export let ghostShape = null;
let focus1 = {};

function update() {
  let pt = closest();
  if (!pt) return;

  focus1 = pt;
  let shapeClass = chosenShape == Shapes.KITE ? Kite : Dart;
  let turn = shapeClass.rotationForFit(pt.alpha, pt.blue);
  theta = pt.theta + turn;
  theta = posMod(theta, 360);


  let c = Math.cos(degrees2Radians(theta));
  let s = Math.sin(degrees2Radians(theta));
  let t = shapeClass.translationForFit(focus1.alpha, focus1.blue);
  let x = t[0] * c - t[1] * s;
  let y = t[0] * s + t[1] * c;

  ghostShape = new shapeClass(focus1.x + x, focus1.y + y, theta);
    

}

function closest() {
  let res = tree.nearest(cursor, 2);
  let nearest1 = res[0];
  let nearest2 = res[1];
  let [pt1] = nearest1 || [];
  if (!pt1) return null;
  let [pt2] = nearest2 || [];
  
  if (!pt2) pt2 = {};

  let d1 = dist(cursor, midpoint(pt1, pt1.next));
  let d2 = dist(cursor, midpoint(pt1, pt1.prev));
  let d3 = dist(cursor, midpoint(pt2, pt2.next));
  let d4 = dist(cursor, midpoint(pt2, pt2.prev));
  
  let d = Math.min(d1, d2, d3, d4);

  if (d1 == d) return pt1;
  if (d2 == d) return pt1.prev;
  if (d3 == d) return pt2;
  if (d4 == d) return pt1.prev;
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
  let pts = ghostShape.getPointsCopy();
  
  for (let pt of pts) {
    let [existingPt] = tree.nearest(pt, 1)[0];
    if (!near(pt, existingPt)) {
      tree.insert(pt);
      continue;
    }

    existingPt.innerAngle += pt.innerAngle;
    let right = near(existingPt.next, pt.prev);
    let left =  near(existingPt.prev, pt.next);

    ghostShape.pts[ghostShape.pts.indexOf(pt)] = existingPt;
    existingPt.shapes.push(...pt.shapes);
    if (right) {
      connect(existingPt, pt.next);
      existingPt.alpha = pt.alpha;
      existingPt.blue = pt.blue;
      existingPt.theta = pt.theta;

      console.log("right")
    }
    if (left) {
      connect(pt.prev, existingPt);
      pt.prev.alpha = existingPt.prev.alpha;
      pt.prev.blue = existingPt.prev.blue;
      pt.prev.theta = existingPt.prev.theta;

      console.log("left")
    }

    if (left && right && existingPt.innerAngle == 360) {
      tree.remove(existingPt);
    }
  }
  addToFloor(ghostShape);
}

function handleRemove() {
  if (focus1.shapes.length != 1) return;
  let shape = focus1.shapes[0];
  let pre = [];
  let post = [];
  let before = true;
  for (let pt of shape.pts) {
    if (pt == focus1) before = false;
    if (before) pre.push(pt);
    else post.push(pt);
  }
  let shapeTrail = [...post, ...pre];

  let begin = null;
  let cutPath = [];
  for (let pt of shapeTrail) {
    let numShapes = pt.shapes.length;
    if (begin == null) {
      if (numShapes == 1) continue;
      else begin = pt;
    }
    cutPath.push(pt);
    if (numShapes == 1) break;
  }

  //TODO: merge this with last loop (hard to do readably)
  shapeTrail.forEach(pt => cutPath.includes(pt) ? null : tree.remove(pt));
  
  if (begin == null) { // I hope this can only happen for the first shape
    console.warn("tried to remove only shape")
    return;
  }

  let pt1;
  let pt2 = cutPath.pop();
  while (cutPath.length > 0) {
    pt1 = pt2;
    pt2 = cutPath.pop();
    connect(pt1, pt2);
    console.log(pt1, pt1.blue)
    console.log(pt2, pt2.blue)
    pt1.alpha = pt2.prev.alpha;
    pt1.blue = pt2.prev.blue;
    pt1.theta = pt2.prev.theta;
  }


}

window.addEventListener("keypress", e => {
  if      (e.key == "q") theta -= 18;
  else if (e.key == "e") theta += 18;
  else if (e.key == "1") chosenShape = Shapes.KITE;
  else if (e.key == "2") chosenShape = Shapes.DART;
  theta = posMod(theta, 360);
});

