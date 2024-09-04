import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1945._Sum_of_Digits_of_String_After_Convert", () => {
  test("T1", () => {
    expect(fn("iiii", 1)).toBe(36);
  });
  test("T2", () => {
    expect(fn("leetcode", 2)).toBe(6);
  });
  test("T3", () => {
    expect(fn("zbax", 2)).toBe(8);
  });
});
