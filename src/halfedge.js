import { near, posMod, TAU } from "./globals";

export class Halfedge {
  constructor(face, fromPt, nextPt, alpha, blue, theta) {
    this.face = face;
    this.nextPt = nextPt;
    this.fromPt = fromPt;
    
    this.blue = blue;
    this.alpha = alpha;

    this.theta = posMod(theta, 360);

    // this.next = next;
    // this.prev = prev;
    // this.opp = opp;

    this.x = fromPt.x; //TODO: use midpoint
    this.y = fromPt.y;
  }

  chain(next) {
    this.next = next;
    next.prev = this;
  }

  pair(opp) {
    this.opp = opp;
    opp.opp = this;
  }

  matches(that) {
    if (this.blue != that.blue) return false;
    if (this.alpha != that.alpha) return false;
    if (this.theta != that.theta) return false;
    if (!near(this, that)) return false;
    return true;
  }
}

export class Point {
  constructor(x, y, innerAngle) {
    if (x == null) x = 0;
    if (y == null) y = 0;
    this.vals = [x, y];

    this.innerAngle = innerAngle; //may need posMod
    // this.halfedge = he;
  }

  get x() { return this.vals[0]; }
  get y() { return this.vals[1]; }

  draw(ctx, r=2, color="black") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, TAU);
    ctx.fill();
  }

  // static midpoint(p1, p2, frac=.5) {
  //   let x = lerp(p1.x, p2.x, frac);
  //   let y = lerp(p1.y, p2.y, frac);
  //   return new Point(x, y);
  // }
}