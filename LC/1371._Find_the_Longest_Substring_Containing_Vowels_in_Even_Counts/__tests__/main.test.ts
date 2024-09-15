import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1371._Find_the_Longest_Substring_Containing_Vowels_in_Even_Counts", () => {
  test("T1", () => {
    const s = "eleetminicoworoep";
    const o = 13;
    expect(fn(s)).toStrictEqual(o);
  });
  test("T2", () => {
    const s = "leetcodeisgreat";
    const o = 5;
    expect(fn(s)).toStrictEqual(o);
  });
  test("T3", () => {
    const s = "bcbcbc";
    const o = 6;
    expect(fn(s)).toStrictEqual(o);
  });
});
