import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/650._2_Keys_Keyboard", () => {
  test("T1", () => {
    const n = 3;
    const expected = 3;
    expect(fn(n)).toBe(expected);
  });
  test("T2", () => {
    const n = 1;
    const expected = 0;
    expect(fn(n)).toBe(expected);
  });
  test("T3", () => {});
});
