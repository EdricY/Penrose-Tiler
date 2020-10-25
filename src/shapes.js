import { dartVertices, kiteVertices, getVertices } from "./vertices";
import { PHI, SIN36, COS36, Shapes, PI, TAU, degrees2Radians, posMod, tree, near } from "./globals";
import { Halfedge, Point } from "./halfedge";

function drawVertices(ctx, vertices) {
  ctx.moveTo(vertices[0], vertices[1]);
  ctx.lineTo(vertices[2], vertices[3]);
  ctx.lineTo(vertices[4], vertices[5]);
  ctx.lineTo(vertices[6], vertices[7]);
  ctx.fill();
}

const BLUE = true;
const RED = false;
const ALPHA = true;
const BETA = false;


function alphaAndBlueMatch(a, b) {
  return a.alpha == b.alpha && a.blue == b.blue;
}


export class Kite {
  // constructor(x, y, theta=0) {
  constructor(halfedge) {
    this.halfedge = halfedge;
    if (halfedge.face != null) console.log("it has a face!")
    halfedge.face = this;

    let [x, y, theta] = Kite.orientationForFit(halfedge);
    this.x = x;
    this.y = y;
    this.theta = theta;

    this.verts = getVertices(this.theta, Shapes.KITE);

    let bottom = new Point(x + this.verts[0], y + this.verts[1], 72);
    let left   = new Point(x + this.verts[2], y + this.verts[3], 72);
    let top    = new Point(x + this.verts[4], y + this.verts[5], 144);
    let right  = new Point(x + this.verts[6], y + this.verts[7], 72);

    // TODO: link with existing points? - I'm not sure if this is necessary
    bottom.halfedge = new Halfedge(this, bottom,  left, ALPHA, BLUE, theta - 36);
    left.halfedge   = new Halfedge(this, left,     top,  BETA,  RED, theta + 72);
    top.halfedge    = new Halfedge(this, top,    right, ALPHA,  RED, theta + 108);
    right.halfedge  = new Halfedge(this, right, bottom,  BETA, BLUE, theta - 144);

    for (let pt of [bottom, left, top, right]) {
      if (alphaAndBlueMatch(pt.halfedge, halfedge)) {
        pt.halfedge = halfedge;
        // console.log("connected: ", pt)
        continue;
      }
      let [existingHe] = tree.nearest(pt, 1)[0];
      if (pt.halfedge.matches(existingHe)) {
        console.log("matched: ", existingHe)
        pt.halfedge = existingHe;
      }
    }

    //set next & prev
    bottom.halfedge.chain(left.halfedge);
    left.halfedge.chain(top.halfedge);
    top.halfedge.chain(right.halfedge);
    right.halfedge.chain(bottom.halfedge);

    //set opps TODO: if existing, use that
    if (!bottom.halfedge.opp) bottom.halfedge.pair(new Halfedge(null,  left, bottom,  BETA, BLUE, theta -  36 + 180));
    if (!left.halfedge.opp)   left.halfedge.pair(new Halfedge(null,     top,   left, ALPHA,  RED, theta +  72 + 180));
    if (!top.halfedge.opp)    top.halfedge.pair(new Halfedge(null,    right,    top,  BETA,  RED, theta + 108 + 180));
    if (!right.halfedge.opp)  right.halfedge.pair(new Halfedge(null, bottom,  right, ALPHA, BLUE, theta - 144 + 180));
  }

  draw(ctx, scale=1, stroke=false) {
    let {x, y, theta} = this;
    Kite.drawKite(ctx, x, y, theta, scale, stroke)
  }

  static isBottom(halfedge) { return halfedge.alpha && halfedge.blue }
  static isLeft(halfedge) { return !halfedge.alpha && !halfedge.blue }
  static isTop(halfedge) { return halfedge.alpha && !halfedge.blue }
  static isRight(halfedge) { return !halfedge.alpha && halfedge.blue }

  static translationForFit(halfedge) {
    if (Kite.isBottom(halfedge)) return [SIN36 * 100, (COS36 - 1)*100];
    if (Kite.isLeft(halfedge))   return [0, 0];
    if (Kite.isTop(halfedge))    return [-SIN36 * 100, (COS36 - 1)*100];
    if (Kite.isRight(halfedge))  return [0, -100];
  }

  static rotationForFit(halfedge) {
    if (Kite.isBottom(halfedge)) return 36;
    if (Kite.isLeft(halfedge))   return -72;
    if (Kite.isTop(halfedge))    return -108;
    if (Kite.isRight(halfedge))  return 144;
  }

  static orientationForFit(halfedge) {
    let turn = Kite.rotationForFit(halfedge);
    let theta = halfedge.theta + turn;
    theta = posMod(theta, 360); // 0 is straight up, 90 points right

    let c = Math.cos(degrees2Radians(theta));
    let s = Math.sin(degrees2Radians(theta));
    let t = Kite.translationForFit(halfedge);
    let x = t[0] * c - t[1] * s + halfedge.nextPt.x;
    let y = t[0] * s + t[1] * c + halfedge.nextPt.y;

    return [x, y, theta];
  }

  static drawPreview(ctx, halfedge, scale=1, stroke=false) {
    let [x, y, theta] = Kite.orientationForFit(halfedge);
    Kite.drawKite(ctx, x, y, theta, scale, stroke);
  }

  static drawKite(ctx, x, y, theta, scale=1, stroke=false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees2Radians(theta));
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.fillStyle = "lime";
    drawVertices(ctx, kiteVertices[0]);
    if (stroke) ctx.stroke();

    ctx.lineWidth = 5/scale;
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.arc(0, 0, (1-0.61803) * 100, .1*PI, .9*PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.arc(0, 1 * 100, (0.61803) * 100, -.7*PI, -.3*PI);
    ctx.stroke();

    ctx.restore();
  }
}

export class Dart {
  constructor(x, y, theta=0) {
    this.x = x || 0;
    this.y = y || 0;
    
    this.theta = posMod(theta, 360);

    this.verts = getVertices(theta, Shapes.DART);

    let bottom = new PointNode(x + this.verts[0], y + this.verts[1], this, 216, 162 + theta, false, RED);
    let left   = new PointNode(x + this.verts[2], y + this.verts[3], this, 36, 306 + theta, true, BLUE);
    let top    = new PointNode(x + this.verts[4], y + this.verts[5], this, 72, 54 + theta, false, BLUE);
    let right  = new PointNode(x + this.verts[6], y + this.verts[7], this, 36, 198 + theta, true, RED);
    bottom.next = left; bottom.prev = right;
    left.next = top; left.prev = bottom;
    top.next = right; top.prev = left;
    right.next = bottom; right.prev = top;

    this.pts = [bottom, left, top, right];
  }

  get alphas() {
    return [this.pts[1], this.pts[3]];
  }
  
  get betas() {
    return [this.pts[0], this.pts[2]];
  }

  getPointsCopy() {
    return [...this.pts];
  }

  static translationForFit(alpha, blue) {
    if (alpha && blue) return [-SIN36 * 100, (COS36-1) * 100];
    if (alpha && !blue) return [SIN36 * 100, (COS36-1) * 100];
    if (!alpha && blue) return [0, (PHI-1) * 100];
    if (!alpha && !blue) return [0, 0];
  }

  static rotationForFit(alpha, blue) {
    if (alpha && blue) return 126;
    if (alpha && !blue) return 18;
    if (!alpha && blue) return 234;
    if (!alpha && !blue) return 342;
  }

  draw(ctx, scale=1, stroke=false) {
    let {x, y} = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees2Radians(this.theta));
    ctx.scale(scale, scale);
    
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    drawVertices(ctx, dartVertices[0]);
    if (stroke) ctx.stroke();

    ctx.lineWidth = 5/scale;
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.arc(0, 0, (1-0.61803)*0.61803 * 100, .9*PI, 2.1*PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.arc(0, -0.61803 * 100, (1-0.61803) * 100, .3*PI, .7*PI);
    ctx.stroke();

    ctx.restore();
  }
}

// TODO: HALFEDGE!
// https://www.graphics.rwth-aachen.de/media/openmesh_static/Documentations/OpenMesh-6.3-Documentation/a00010.html
// (probably need prev halfedge)
// class PointNode {
//   constructor(x, y, shape, innerAngle, theta, alpha, blue) {
//     this.x = x;
//     this.y = y;
//     this.shapes = [shape];
    
//     this.innerAngle = innerAngle;

//     this.next = null;
//     this.prev = null;

//     this.theta = posMod(theta, 360);
//     this.blue = blue;

//     this.alpha = alpha;
//     this.shapeNext;
//   }
//   get beta() { return !this.alpha}
//   get red() { return !this.blue}
// }
