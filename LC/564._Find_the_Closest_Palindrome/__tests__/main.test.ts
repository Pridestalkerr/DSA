import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/564._Find_the_Closest_Palindrome", () => {
  test("T1", () => {
    expect(fn("123")).toBe("121");
  });
  test("T2", () => {
    expect(fn("1")).toBe("0");
  });
  test("T118", () => {
    expect(fn("88")).toBe("77");
  });
  test("T149", () => {
    expect(fn("100")).toBe("99");
  });
});
