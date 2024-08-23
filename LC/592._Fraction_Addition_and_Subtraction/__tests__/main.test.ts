import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/592._Fraction_Addition_and_Subtraction", () => {
  test("T1", () => {
    const input = "-1/2+1/2";
    const output = "0/1";
    expect(fn(input)).toBe(output);
  });
  test("T2", () => {
    const input = "-1/2+1/2+1/3";
    const output = "1/3";
    expect(fn(input)).toBe(output);
  });
  test("T3", () => {
    const input = "1/3-1/2";
    const output = "-1/6";
    expect(fn(input)).toBe(output);
  });
});
