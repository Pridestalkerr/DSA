import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/179._Largest_Number", () => {
  test("T1", () => {
    const nums = [10, 2];
    const output = "210";
    expect(fn(nums)).toBe(output);
  });
  test("T2", () => {
    const nums = [3, 30, 34, 5, 9];
    const output = "9534330";
    expect(fn(nums)).toBe(output);
  });
  test("T3", () => {});
});
