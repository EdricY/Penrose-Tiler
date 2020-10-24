import { dartVertices, kiteVertices, getVertices } from "./vertices";
import { PHI, SIN36, COS36, Shapes, PI, TAU, degrees2Radians, posMod } from "./globals";

function drawVertices(ctx, vertices) {
  ctx.moveTo(vertices[0], vertices[1]);
  ctx.lineTo(vertices[2], vertices[3]);
  ctx.lineTo(vertices[4], vertices[5]);
  ctx.lineTo(vertices[6], vertices[7]);
  ctx.fill();
}

const BLUE = true;
const RED = false;

export class Kite {
  constructor(x, y, theta=0) {
    this.x = x || 0;
    this.y = y || 0;
    this.verts = getVertices(theta, Shapes.KITE);

    this.theta = posMod(theta, 360);

    let bottom = new PointNode(x + this.verts[0], y + this.verts[1], this, 72, 234 + theta, true, BLUE);
    let left   = new PointNode(x + this.verts[2], y + this.verts[3], this, 72, 342 + theta, false, RED);
    let top    = new PointNode(x + this.verts[4], y + this.verts[5], this, 144, 18 + theta, true, RED);
    let right  = new PointNode(x + this.verts[6], y + this.verts[7], this, 72, 126 + theta, false, BLUE);
    bottom.next = left; bottom.prev = right;
    left.next = top; left.prev = bottom;
    top.next = right; top.prev = left;
    right.next = bottom; right.prev = top;

    this.pts = [bottom, left, top, right];
  }

  get alphas() {
    return [this.pts[0], this.pts[2]];
  }

  get betas() {
    return [this.pts[1], this.pts[3]];
  }

  getPointsCopy() {
    return [...this.pts];
  }

  static translationForFit(alpha, blue) {
    if (alpha && blue) return [0, -100];
    if (alpha && !blue) return [0, 0];
    if (!alpha && blue) return [SIN36 * 100, (COS36 - 1)*100];
    if (!alpha && !blue) return [-SIN36 * 100, (COS36 - 1)*100];
  }

  static rotationForFit(alpha, blue) {
    if (alpha && blue) return 54;
    if (alpha && !blue) return 198;
    if (!alpha && blue) return 306;
    if (!alpha && !blue) return 162;
  }

  draw(ctx, scale=1, stroke=false) {
    let {x, y} = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees2Radians(this.theta));
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
class PointNode {
  constructor(x, y, shape, innerAngle, theta, alpha, blue) {
    this.x = x;
    this.y = y;
    this.shapes = [shape];
    
    this.innerAngle = innerAngle;

    this.next = null;
    this.prev = null;

    this.theta = posMod(theta, 360);
    this.blue = blue;

    this.alpha = alpha;
    this.shapeNext;
  }
  get beta() { return !this.alpha}
  get red() { return !this.blue}
}
