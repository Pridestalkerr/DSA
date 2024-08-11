import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1568._Minimum_Number_of_Days_to_Disconnect_Island", () => {
  test("T1", () => {
    const grid = [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    expect(fn(grid)).toStrictEqual(2);
  });
  test("T2", () => {
    const grid = [[1, 1]];
    expect(fn(grid)).toStrictEqual(2);
  });
  test("T93", () => {
    const grid = [
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
    ];
    expect(fn(grid)).toStrictEqual(1);
  });
  test("T84", () => {
    const grid = [
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    expect(fn(grid)).toStrictEqual(2);
  });
  test("T97", () => {
    const grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    expect(fn(grid)).toStrictEqual(1);
  });
  test("T98", () => {
    const grid = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
    ];
    expect(fn(grid)).toStrictEqual(1);
  });
});
