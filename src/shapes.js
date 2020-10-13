
const kiteVertices = [
   0,        0       + 1,
  -0.58779, -0.80902 + 1,
   0,       -1       + 1,
   0.58779, -0.80902 + 1,
].map(x => x* 100)

const dartVertices = [
    0,        0      ,
    -0.58779,  0.19098,
    0,       -0.61803,
    0.58779,  0.19098,
].map(x => x* 100)


function drawVertices(ctx, vertices) {
  ctx.moveTo(vertices[0], vertices[1]);
  ctx.lineTo(vertices[2], vertices[3]);
  ctx.lineTo(vertices[4], vertices[5]);
  ctx.lineTo(vertices[6], vertices[7]);
  ctx.fill();
}

const pi = Math.PI;
const tau = 2 * pi;

export class Kite {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    let bottom = new PointNode(x + kiteVertices[0], y + kiteVertices[1]);
    let left   = new PointNode(x + kiteVertices[2], y + kiteVertices[3]);
    let top    = new PointNode(x + kiteVertices[4], y + kiteVertices[5]);
    let right  = new PointNode(x + kiteVertices[6], y + kiteVertices[7]);
    bottom.left = left; bottom.right = right;
    left.left = top; left.right = bottom;
    top.left = right; top.right = left;
    right.left = top; right.right = bottom;

    this.pts = [bottom, left, top, right];
  }

  draw(ctx, theta=0, scale=1) {
    let {x, y} = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(theta);
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.fillStyle = "lime";
    drawVertices(ctx, kiteVertices);

    ctx.lineWidth = 5/scale;
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.arc(0, 0, (1-0.61803) * 100, .1*pi, .9*pi);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.arc(0, 1 * 100, (0.61803) * 100, -.7*pi, -.3*pi);
    ctx.stroke();

    ctx.restore();
  }

  get alphas() {
    return [this.pts[0], this.pts[2]];
  }
  get betas() {
    return [this.pts[1], this.pts[3]];
  }
}

export class Dart {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    let bottom = new PointNode(x + dartVertices[0], y + dartVertices[1]);
    let left   = new PointNode(x + dartVertices[2], y + dartVertices[3]);
    let top    = new PointNode(x + dartVertices[4], y + dartVertices[5]);
    let right  = new PointNode(x + dartVertices[6], y + dartVertices[7]);
    bottom.left = left; bottom.right = right;
    left.left = top; left.right = bottom;
    top.left = right; top.right = left;
    right.left = top; right.right = bottom;

    this.pts = [bottom, left, top, right];
  }
  draw(ctx, theta=0, scale=1) {
    let {x, y} = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(theta);
    ctx.scale(scale, scale);
    
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    drawVertices(ctx, dartVertices);
    
    ctx.lineWidth = 5/scale;
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.arc(0, 0, (1-0.61803)*0.61803 * 100, .9*pi, 2.1*pi);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.arc(0, -0.61803 * 100, (1-0.61803) * 100, .3*pi, .7*pi);
    ctx.stroke();

    ctx.restore();
  }

  get alphas() {
    return [this.pts[1], this.pts[3]];
  }
  
  get betas() {
    return [this.pts[0], this.pts[2]];
  }
}

class PointNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
  }
}