import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

// TODO: this testing approach wont work, need a simulator, checker

type T = [number, number, number];

const sort = (arr: T[]) => {
  return arr.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i]! - b[i]!;
    }
    return 0;
  });
};

describe("LC/2699._Modify_Graph_Edge_Weights", () => {
  test("T1", () => {
    const n = 5;
    const edges: T[] = [
      [4, 1, -1],
      [2, 0, -1],
      [0, 3, -1],
      [4, 3, -1],
    ];
    const source = 0;
    const destination = 1;
    const target = 5;
    const output: T[] = [
      [4, 1, 1],
      [2, 0, 1],
      [0, 3, 3],
      [4, 3, 1],
    ];
    expect(sort(fn(n, edges, source, destination, target) as T[])).toStrictEqual(sort(output));
  });
  test("T2", () => {
    const n = 3;
    const edges: T[] = [
      [0, 1, -1],
      [0, 2, 5],
    ];
    const source = 0;
    const destination = 2;
    const target = 6;
    const output: T[] = [];
    expect(sort(fn(n, edges, source, destination, target) as T[])).toStrictEqual(sort(output));
  });
  test("T3", () => {
    const n = 4;
    const edges: T[] = [
      [1, 0, 4],
      [1, 2, 3],
      [2, 3, 5],
      [0, 3, -1],
    ];
    const source = 0;
    const destination = 2;
    const target = 6;
    const output: T[] = [
      [1, 0, 4],
      [1, 2, 3],
      [2, 3, 5],
      [0, 3, 1],
    ];
    expect(sort(fn(n, edges, source, destination, target) as T[])).toStrictEqual(sort(output));
  });
  test("T612", () => {
    const n = 4;
    const edges: T[] = [
      [0, 1, -1],
      [1, 2, -1],
      [3, 1, -1],
      [3, 0, 2],
      [0, 2, 5],
    ];
    const source = 2;
    const destination = 3;
    const target = 8;
    const output: T[] = [];
    expect(sort(fn(n, edges, source, destination, target) as T[])).toStrictEqual(sort(output));
  });
});
