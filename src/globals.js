import { kdTree } from "./kdTree";

export const W = 600;
export const H = 600;

export const PHI = 1.618033988749895;
export const SIN36 = 0.5877852522924731;
export const COS36 = 0.8090169943749474;
export const PI = Math.PI;
export const TAU = PI * 2;

export const Shapes = { KITE: 0, DART: 1 };

export const canvas = document.getElementById("canvas");

export function dist(a, b) {
  if (a == null || b == null) return Infinity;
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx*dx + dy*dy;
}

export function near(a, b) {
  if (a == b) return true;
  return dist(a, b) < 1;
}


export function lerp(a, b, frac) { return (a * frac) + (b * (1-frac)) }

export function radians2Degrees(rad) { return rad * (180/PI) }
export function degrees2Radians(deg) { return deg * (PI/180) }

export function posMod(x, n) {
  while (x < 0) x += n;
  return x % n
}

export function orientation(p1, p2, p3) {
  let dx1 = p2.x - p1.x;
  let dy1 = p2.y - p1.y;
  let dx2 = p3.x - p2.x;
  let dy2 = p3.y - p2.y;
  let dx3 = p3.x - p1.x;
  let dy3 = p3.y - p1.y;
  if (Math.abs(dx2) + Math.abs(dy2) < 1) return 0;
  if (Math.abs(dx3) + Math.abs(dy3) < 1) return 0;

  let val = (dy1) * (dx2) - (dx1) * (dy2);
  if (Math.abs(val) < 1) return 0;
  return val; //0 if colinear, + if cw, - if ccw
}

export function intersects(lineSeg, halfedge)
{
  if (lineSeg.theta - halfedge.theta % 180 == 0) return false;
  let o1 = orientation(lineSeg.pt1, lineSeg.pt2, halfedge.nextPt);
  if (o1 == 0) return false;
  let o2 = orientation(lineSeg.pt1, lineSeg.pt2, halfedge.fromPt);
  if (o2 == 0) return false;
  if (Math.sign(o1) == Math.sign(o2)) return false;
  let o3 = orientation(halfedge.nextPt, halfedge.fromPt, lineSeg.pt1);
  if (o3 == 0) return false;
  let o4 = orientation(halfedge.nextPt, halfedge.fromPt, lineSeg.pt2);
  if (o4 == 0) return false;
  if (Math.sign(o3) == Math.sign(o4)) return false;

  return true;
} 


export let tree = new kdTree([], dist, ["x", "y"]);
// halfedges with null face
window.tree = tree;
