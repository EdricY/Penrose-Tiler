import { W, H } from "./globals";

export default class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.scale = 1;
  }

  moveCtx(ctx) {
    ctx.scale(this.scale, this.scale);
    ctx.translate(-Math.round(this.x), -Math.round(this.y));
  }

  zoomAt(x, y, amt=.1) {
    if (this.scale + amt <= .2) return;
    let ow = W / this.scale;
    let oh = H / this.scale;

    let dx = x - this.x;
    let dy = y - this.y;

    this.scale += amt;
    
    let nw = W / this.scale;
    let nh = H / this.scale;

    let px = dx / nw;
    let py = dy / nh;

    let dw = ow - nw;
    let dh = oh - nh;

    this.x += dw * px
    this.y += dh * py;
  }
}
