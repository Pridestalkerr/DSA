import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/2419._Longest_Subarray_With_Maximum_Bitwise_AND", () => {
  test("T1", () => {
    const nums = [1, 2, 3, 3, 2, 2];
    const output = 2;
    expect(fn(nums)).toStrictEqual(output);
  });
  test("T2", () => {
    const nums = [1, 2, 3, 4];
    const output = 1;
    expect(fn(nums)).toStrictEqual(output);
  });
  test("T3", () => {});
});
