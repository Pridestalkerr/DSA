import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1937._Maximum_Number_of_Points_with_Cost", () => {
  test("T1", () => {
    const points = [
      [1, 2, 3],
      [1, 5, 1],
      [3, 1, 1],
    ];
    const output = 9;
    expect(fn(points)).toBe(output);
  });
  test("T2", () => {
    const points = [
      [1, 5],
      [2, 3],
      [4, 2],
    ];
    const output = 11;
    expect(fn(points)).toBe(output);
  });
  test("T113", () => {
    const points = [
      [1, 5],
      [3, 2],
      [4, 2],
    ];
    const output = 11;
    expect(fn(points)).toBe(output);
  });
});
