import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/840._Magic_Squares_In_Grid", () => {
  test("T1", () => {
    const grid = [
      [4, 3, 8, 4],
      [9, 5, 1, 9],
      [2, 7, 6, 2],
    ];
    expect(fn(grid)).toBe(1);
  });
  test("T2", () => {
    const grid = [[8]];
    expect(fn(grid)).toBe(0);
  });
  test("T3", () => {});
});
