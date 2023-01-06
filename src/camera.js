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

  zoomAt(x, y, amt) {
    const newScale = this.scale * (1+amt);

    if (this.scale + amt <= .2) return;
    let ow = W / this.scale;
    let oh = H / this.scale;

    let nw = W / newScale;
    let nh = H / newScale;

    let dx = x - this.x;
    let dy = y - this.y;
    
    let px = dx / ow;
    let py = dy / oh;

    this.x = x - (nw * px);
    this.y = y - (nh * py);
    this.scale = newScale;
  }
}
