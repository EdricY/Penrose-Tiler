export default class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.scale = 1;
  }

  moveCtx(ctx) {
    ctx.translate(-Math.round(this.x), -Math.round(this.y));
    ctx.scale(this.scale, this.scale);
  }
}
