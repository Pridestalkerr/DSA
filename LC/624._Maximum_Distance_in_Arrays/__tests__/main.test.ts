import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/624._Maximum_Distance_in_Arrays", () => {
  test("T1", () => {
    const arrays = [
      [1, 2, 3],
      [4, 5],
      [1, 2, 3],
    ];
    const output = 4;
    expect(fn(arrays)).toBe(output);
  });
  test("T2", () => {
    const arrays = [[1], [1]];
    const output = 0;
    expect(fn(arrays)).toBe(output);
  });
  test("T3", () => {});
});
