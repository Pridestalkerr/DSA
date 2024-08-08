import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/XXXX.___", () => {
  test("T1", () => {
    const r = 1;
    const c = 4;
    const rStart = 0;
    const cStart = 0;
    const expected = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    expect(fn(r, c, rStart, cStart)).toStrictEqual(expected);
  });
  test("T2", () => {
    const r = 5;
    const c = 6;
    const rStart = 1;
    const cStart = 4;
    const expected = [
      [1, 4],
      [1, 5],
      [2, 5],
      [2, 4],
      [2, 3],
      [1, 3],
      [0, 3],
      [0, 4],
      [0, 5],
      [3, 5],
      [3, 4],
      [3, 3],
      [3, 2],
      [2, 2],
      [1, 2],
      [0, 2],
      [4, 5],
      [4, 4],
      [4, 3],
      [4, 2],
      [4, 1],
      [3, 1],
      [2, 1],
      [1, 1],
      [0, 1],
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ];
    expect(fn(r, c, rStart, cStart)).toStrictEqual(expected);
  });
  //   test("T3", () => {});
});
