import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1684._Count_the_Number_of_Consistent_Strings", () => {
  test("T1", () => {
    const allowed = "ab";
    const words = ["ad", "bd", "aaab", "baa", "badab"];
    const output = 2;
    expect(fn(allowed, words)).toBe(output);
  });
  test("T2", () => {
    const allowed = "abc";
    const words = ["a", "b", "c", "ab", "ac", "bc", "abc"];
    const output = 7;
    expect(fn(allowed, words)).toBe(output);
  });
  test("T3", () => {
    const allowed = "cad";
    const words = ["cc", "acd", "b", "ba", "bac", "bad", "ac", "d"];
    const output = 4;
    expect(fn(allowed, words)).toBe(output);
  });
});
