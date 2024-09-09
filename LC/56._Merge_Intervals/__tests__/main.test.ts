import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/56._Merge_Intervals", () => {
  test("T1", () => {
    const intervals = [
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ];
    const output = [
      [1, 6],
      [8, 10],
      [15, 18],
    ];
    expect(fn(intervals)).toStrictEqual(output);
  });
  test("T2", () => {
    const intervals = [
      [1, 4],
      [4, 5],
    ];
    const output = [[1, 5]];
    expect(fn(intervals)).toStrictEqual(output);
  });
  test("T3", () => {});
});
