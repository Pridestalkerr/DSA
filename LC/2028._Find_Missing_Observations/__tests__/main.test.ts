import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/2028._Find_Missing_Observations", () => {
  test("T1", () => {
    const rolls = [3, 2, 4, 3];
    const mean = 4;
    const n = 2;
    const output: number[] = [6, 6];
    expect(fn(rolls, mean, n)).toEqual(output);
  });
  test("T2", () => {
    const rolls = [1, 5, 6];
    const mean = 3;
    const n = 4;
    const output: number[] = [2, 3, 2, 2];
    expect(fn(rolls, mean, n)).toEqual(output);
  });
  test("T3", () => {
    const rolls = [1, 2, 3, 4];
    const mean = 6;
    const n = 4;
    const output: number[] = [];
    expect(fn(rolls, mean, n)).toEqual(output);
  });
});
