import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1140._Stone_Game_II", () => {
  test("T1", () => {
    const piles = [2, 7, 9, 4, 4];
    const result = 10;
    expect(fn(piles)).toEqual(result);
  });
  test("T2", () => {
    const piles = [1, 2, 3, 4, 5, 100];
    const result = 104;
    expect(fn(piles)).toEqual(result);
  });
  test("T91", () => {
    const piles = [1];
    const result = 1;
    expect(fn(piles)).toEqual(result);
  });
});
