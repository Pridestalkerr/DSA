import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/2022._Convert_1D_Array_Into_2D_Array", () => {
  test("T1", () => {
    const original = [1, 2, 3, 4];
    const m = 2;
    const n = 2;
    const output = [
      [1, 2],
      [3, 4],
    ];
    expect(fn(original, m, n)).toStrictEqual(output);
  });
  test("T2", () => {
    const original = [1, 2, 3];
    const m = 1;
    const n = 3;
    const output = [[1, 2, 3]];
    expect(fn(original, m, n)).toStrictEqual(output);
  });
  test("T3", () => {
    const original = [1, 2];
    const m = 1;
    const n = 1;
    const output = [];
    expect(fn(original, m, n)).toStrictEqual(output);
  });
});
