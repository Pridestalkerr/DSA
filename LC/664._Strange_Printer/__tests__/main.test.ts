import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/664._Strange_Printer", () => {
  test("T1", () => {
    const s = "aaabbb";
    const output = 2;
    expect(fn(s)).toBe(output);
  });
  test("T2", () => {
    const s = "aba";
    const output = 2;
    expect(fn(s)).toBe(output);
  });
  test("T3", () => {});
});
