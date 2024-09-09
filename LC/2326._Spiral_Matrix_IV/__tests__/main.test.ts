import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";
import { LC } from "@dsa/common";

describe("LC/2326._Spiral_Matrix_IV", () => {
  test("T1", () => {
    const m = 3;
    const n = 5;
    const head = [3, 0, 2, 6, 8, 1, 7, 9, 4, 2, 5, 5, 0];
    const output = [
      [3, 0, 2, 6, 8],
      [5, 0, -1, -1, 1],
      [5, 2, 4, 9, 7],
    ];
    expect(fn(m, n, LC.makeList(head))).toStrictEqual(output);
  });
  test("T2", () => {
    const m = 1;
    const n = 4;
    const head = [0, 1, 2];
    const output = [[0, 1, 2, -1]];
    expect(fn(m, n, LC.makeList(head))).toStrictEqual(output);
  });
  test("T3", () => {});
});
