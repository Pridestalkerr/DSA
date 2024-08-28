import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1905._Count_Sub_Islands", () => {
  test("T1", () => {
    const grid1 = [
      [1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1],
    ];
    const grid2 = [
      [1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 0, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ];
    const output = 3;
    expect(fn(grid1, grid2)).toBe(output);
  });
  test("T2", () => {
    const grid1 = [
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
    ];
    const grid2 = [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
    ];
    const output = 2;
    expect(fn(grid1, grid2)).toBe(output);
  });
  test("T3", () => {});
});
