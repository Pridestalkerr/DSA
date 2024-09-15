import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1310._XOR_Queries_of_a_Subarray", () => {
  test("T1", () => {
    const arr = [1, 3, 4, 8];
    const queries = [
      [0, 1],
      [1, 2],
      [0, 3],
      [3, 3],
    ];
    const output = [2, 7, 14, 8];
    expect(fn(arr, queries)).toStrictEqual(output);
  });
  test("T2", () => {
    const arr = [4, 8, 2, 10];
    const queries = [
      [2, 3],
      [1, 3],
      [0, 0],
      [0, 3],
    ];
    const output = [8, 0, 4, 4];
    expect(fn(arr, queries)).toStrictEqual(output);
  });
  test("T3", () => {});
});
