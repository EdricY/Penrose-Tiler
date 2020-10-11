
const kiteVertices = [
   0,        0        + .5,
  -0.58779, -0.80902  + .5,
   0,       -1        + .5,
   0.58779, -0.80902  + .5,
]

const dartVertices = [
    0,        0      ,
    0.58779,  0.19098,
    0,       -0.61803,
   -0.58779,  0.19098,
]

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
    ctx.arc(0, -1 + .5, 1-0.61803, .1*pi, .9*pi);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.arc(0, 0 + .5, 0.61803, -.7*pi, -.3*pi);
    ctx.stroke();

    ctx.restore();
  }
}

export class Dart {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
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
    ctx.arc(0, 0, (1-0.61803)*0.61803, .9*pi, 2.1*pi);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.arc(0, -0.61803, 1-0.61803, .3*pi, .7*pi);
    ctx.stroke();

    ctx.restore();
  }
}