import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/719._Find_K-th_Smallest_Pair_Distance", () => {
  test("T1", () => {
    const nums = [1, 3, 1];
    const k = 1;
    const output = 0;
    expect(fn(nums, k)).toBe(output);
  });
  test("T2", () => {
    const nums = [1, 1, 1];
    const k = 2;
    const output = 0;
    expect(fn(nums, k)).toBe(output);
  });
  test("T3", () => {
    const nums = [1, 6, 1];
    const k = 3;
    const output = 5;
    expect(fn(nums, k)).toBe(output);
  });
});
