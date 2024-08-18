import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/264._Ugly_Number_II", () => {
  test("T1", () => {
    const input = 10;
    const expected = 12;
    const result = fn(input);
  });
  test("T2", () => {
    const input = 1;
    const expected = 1;
    const result = fn(input);
  });
  test("T3", () => {});
});
