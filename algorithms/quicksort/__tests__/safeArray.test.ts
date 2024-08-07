import { describe, expect, test } from "@jest/globals";
import { SafeArray } from "../src/utils";

describe("SafeArray", () => {
  const safeArr = SafeArray([1, 2, 3, 4]);
  test("SafeArray:positive", () => {
    expect(safeArr[0]).toBe(1);
  });
  test("SafeArray:negative", () => {
    expect(safeArr[-1]).toBe(4);
  });
  test("SafeArray:out_of_bounds", () => {
    expect(() => safeArr[4]).toThrowError("Out of bounds access on array of size 4 at index 4");
  });
  test("SafeArray:out_of_bounds_negative", () => {
    expect(() => safeArr[-5]).toThrowError("Out of bounds access on array of size 4 at index -5");
  });
  test("SafeArray:set", () => {
    safeArr[0] = 5;
    expect(safeArr[0]).toBe(5);
  });
  test("SafeArray:set_negative", () => {
    safeArr[-1] = 5;
    expect(safeArr[-1]).toBe(5);
  });
  test("SafeArray:set_out_of_bounds", () => {
    expect(() => (safeArr[4] = 5)).toThrowError(
      "Out of bounds access on array of size 4 at index 4",
    );
  });
  test("SafeArray:set_out_of_bounds_negative", () => {
    expect(() => (safeArr[-5] = 5)).toThrowError(
      "Out of bounds access on array of size 4 at index -5",
    );
  });
  test("SafeArray:increment", () => {
    safeArr[0]!++;
    expect(safeArr[0]).toBe(6);
    safeArr[-1]!--;
    expect(safeArr[-1]).toBe(4);
  });
  test("SafeArray:length", () => {
    expect(safeArr.length).toBe(4);
  });
});
