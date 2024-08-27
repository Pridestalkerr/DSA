import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1514._Path_with_Maximum_Probability", () => {
  test("T1", () => {
    const n = 3;
    const edges: [number, number][] = [
      [0, 1],
      [1, 2],
      [0, 2],
    ];
    const succProb = [0.5, 0.5, 0.2];
    const start = 0;
    const end = 2;
    const output = 0.25;
    expect(fn(n, edges, succProb, start, end)).toBeCloseTo(output, 5);
  });
  test("T2", () => {
    const n = 3;
    const edges: [number, number][] = [
      [0, 1],
      [1, 2],
      [0, 2],
    ];
    const succProb = [0.5, 0.5, 0.3];
    const start = 0;
    const end = 2;
    const output = 0.3;
    expect(fn(n, edges, succProb, start, end)).toBeCloseTo(output, 5);
  });
  test("T3", () => {
    const n = 3;
    const edges: [number, number][] = [[0, 1]];
    const succProb = [0.5];
    const start = 0;
    const end = 2;
    const output = 0;
    expect(fn(n, edges, succProb, start, end)).toBeCloseTo(output, 5);
  });
});
