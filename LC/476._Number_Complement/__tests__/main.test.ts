import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/476._Number_Complement", () => {
  test("T1", () => {
    expect(fn(5)).toBe(2);
  });
  test("T2", () => {
    expect(fn(1)).toBe(0);
  });
  test("T3", () => {});
});
