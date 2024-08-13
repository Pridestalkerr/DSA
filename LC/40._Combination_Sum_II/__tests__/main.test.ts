import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/40._Combination_Sum_II", () => {
  test("T1", () => {
    const candidates = [10, 1, 2, 7, 6, 1, 5];
    const target = 8;
    const output = [
      [1, 1, 6],
      [1, 2, 5],
      [1, 7],
      [2, 6],
    ];
    console.log(fn(candidates, target));
    expect(fn(candidates, target)).toStrictEqual(output);
  });
  test("T2", () => {
    const candidates = [2, 5, 2, 1, 2];
    const target = 5;
    const output = [[1, 2, 2], [5]];
    console.log(fn(candidates, target));
    expect(fn(candidates, target)).toStrictEqual(output);
  });
  test("T3", () => {});
});
