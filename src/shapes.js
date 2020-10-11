
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
    drawVertices(ctx, kiteVertices);

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
    drawVertices(ctx, dartVertices);

    ctx.restore();
  }
}