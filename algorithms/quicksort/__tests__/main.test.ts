import { describe, expect, test } from "@jest/globals";
import { quicksort } from "../src/main";

describe("QuickSort", () => {
  const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  test("uwu", () => {
    expect(quicksort(arr, {})).toEqual(arr);
  });
});
