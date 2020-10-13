import { kdTree } from "./kdTree";

export const W = 600;
export const H = 600;


export const Shapes = { KITE: 0, DART: 1 };

export const canvas = document.getElementById("canvas");

export function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx*dx + dy*dy;
}

export let tree = new kdTree([], dist, ["x", "y"]);
