import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/215._Kth_Largest_Element_in_an_Array", () => {
  test("T1", () => {
    const nums = [3, 2, 1, 5, 6, 4];
    const k = 2;
    expect(fn(nums, k)).toBe(5);
  });
  test("T2", () => {
    const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
    const k = 4;
    expect(fn(nums, k)).toBe(4);
  });
  // test("T3", () => {});
});
