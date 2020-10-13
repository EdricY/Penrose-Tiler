import drawCursor, { chosenShape, cursor } from "./cursor.js";
import drawFloor from "./floor.js";

import { W, H, canvas, tree, dist, midpoint, degrees2Radians, PI, posMod, Shapes } from "./globals";
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

function tick() {
  visCtx.clearRect(0, 0, W, H);
  update();
  drawFloor(visCtx);
  drawCursor(visCtx);

  // draw focus circles
  visCtx.beginPath();
  visCtx.strokeStyle = "yellow";
  visCtx.arc(focus1.x, focus1.y, 10, 0, Math.PI * 2);
  visCtx.stroke();
  visCtx.closePath();

  visCtx.beginPath();
  visCtx.strokeStyle = "black";
  visCtx.arc(focus2.x, focus2.y, 10, 0, Math.PI * 2);
  visCtx.stroke();
  visCtx.closePath();

  
  // visCtx.fillText(theta, 20, 40)
  // visCtx.fillText(focus1.theta, 20, 60)

  if (ghostShape) {
    ghostShape.draw(visCtx);
  }


  requestAnimationFrame(tick);
}

export let theta = 0;
export let ghostShape = null;
let focus1 = {};
let focus2 = {};

function update() {
  let pt = closest();
  if (pt) {
    focus1 = pt;
    focus2 = pt.next;
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


window.addEventListener("keypress", e => {
  if      (e.key == "q") theta -= 18;
  else if (e.key == "e") theta += 18;
  else if (e.key == "1") chosenShape = Shapes.KITE;
  else if (e.key == "2") chosenShape = Shapes.DART;
  theta = posMod(theta, 360);
});

