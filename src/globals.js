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

export function midpoint(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return { 
    x: b.x + dx/2,
    y: b.y + dy/2
  }
}

export function radians2Degrees(rad)
{
  return rad * (180/PI);
}

export function degrees2Radians(deg)
{
  return deg * (PI/180);
}


export function posMod(x, n) {
  while (x < 0) x += n;
  return x % n
}


export let tree = new kdTree([], dist, ["x", "y"]);
// halfedges with null face

window.tree = tree;
