import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/959._Regions_Cut_By_Slashes", () => {
  test("T1", () => {
    const grid = [" /", "/ "];
    expect(fn(grid)).toBe(2);
  });
  test("T2", () => {
    const grid = [" /", "  "];
    expect(fn(grid)).toBe(1);
  });
  test("T3", () => {
    const grid = ["/\\", "\\/"];
    expect(fn(grid)).toBe(5);
  });
});
