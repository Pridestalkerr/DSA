import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/884._Uncommon_Words_from_Two_Sentences", () => {
  test("T1", () => {
    const s1 = "this apple is sweet";
    const s2 = "this apple is sour";
    const output = ["sweet", "sour"];
    expect(fn(s1, s2)).toStrictEqual(output);
  });
  test("T2", () => {
    const s1 = "apple apple";
    const s2 = "banana";
    const output = ["banana"];
    expect(fn(s1, s2)).toStrictEqual(output);
  });
  test("T3", () => {});
});
