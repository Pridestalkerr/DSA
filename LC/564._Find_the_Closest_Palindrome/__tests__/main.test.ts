import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/564._Find_the_Closest_Palindrome", () => {
  test("T1", () => {
    expect(fn("123")).toBe("121");
  });
  test("T2", () => {
    expect(fn("1")).toBe("0");
  });
  test("T3", () => {});
});
