import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/860._Lemonade_Change", () => {
  test("T1", () => {
    const bills = [5, 5, 5, 10, 20];
    const output = true;
    expect(fn(bills)).toBe(output);
  });
  test("T2", () => {
    const bills = [5, 5, 10, 10, 20];
    const output = false;
    expect(fn(bills)).toBe(output);
  });
  test("T3", () => {});
});
