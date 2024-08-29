import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/947._Most_Stones_Removed_with_Same_Row_or_Column", () => {
  test("T1", () => {
    const stones = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [2, 2],
    ];
    const output = 5;
    expect(fn(stones)).toBe(output);
  });
  test("T2", () => {
    const stones = [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ];
    const output = 3;
    expect(fn(stones)).toBe(output);
  });
  test("T3", () => {
    const stones = [[0, 0]];
    const output = 0;
    expect(fn(stones)).toBe(output);
  });
});
