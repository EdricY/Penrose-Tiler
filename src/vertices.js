import { PHI, SIN36, COS36, Shapes, radians2Degrees, posMod } from "./globals";

const k = [
  0, 1,
  -SIN36, 1 - COS36,
  0, 0,
  SIN36, 1 - COS36,
].map(x => x * 100);

const d = [
  0, 0,
  -SIN36, 1 - COS36,
  0, 1 - PHI,
  SIN36, 1 - COS36,
].map(x => x * 100);

const pi = Math.PI;
export const kiteVertices = {
  "0": rotateVertices(k, 0),
  "36": rotateVertices(k, pi/5),
  "72": rotateVertices(k, 2*pi/5),
  "108": rotateVertices(k, 3*pi/5),
  "144": rotateVertices(k, 4*pi/5),
  "180": rotateVertices(k, 5*pi/5),
  "216": rotateVertices(k, 6*pi/5),
  "252": rotateVertices(k, 7*pi/5),
  "288": rotateVertices(k, 8*pi/5),
  "324": rotateVertices(k, 9*pi/5),
}

export const dartVertices = {
  "0": rotateVertices(d, 0),
  "36": rotateVertices(d, pi/5),
  "72": rotateVertices(d, 2*pi/5),
  "108": rotateVertices(d, 3*pi/5),
  "144": rotateVertices(d, 4*pi/5),
  "180": rotateVertices(d, 5*pi/5),
  "216": rotateVertices(d, 6*pi/5),
  "252": rotateVertices(d, 7*pi/5),
  "288": rotateVertices(d, 8*pi/5),
  "324": rotateVertices(d, 9*pi/5),
}


export function getVertices(angle, shapeType) {
  let seg = Math.round((angle) / 36) % 10;
  seg = posMod(seg, 10);
  let key = seg * 36;
  if (shapeType == Shapes.KITE) {
    return kiteVertices[key]
  }
  return dartVertices[key];
}


function rotateVertices(vertices, angle) {
  let s = Math.sin(angle);
  let c = Math.cos(angle);
  let newV = [];
  for (let i = 0; i < vertices.length; i += 2) {
    let xnew = vertices[i] * c - vertices[i + 1] * s;
    let ynew = vertices[i] * s + vertices[i + 1] * c;
    newV.push(xnew)
    newV.push(ynew)
  }
  return newV;
}
