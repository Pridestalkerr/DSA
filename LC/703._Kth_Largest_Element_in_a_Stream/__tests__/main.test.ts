import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/703._Kth_Largest_Element_in_a_Stream", () => {
  test("T1", () => {
    const input = ["KthLargest", "add", "add", "add", "add", "add"] as const;
    const args = [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]];
    const expected = [null, 4, 5, 5, 8, 8];
    const O = new fn(args[0]![0] as number, args[0]![1] as number[]);
    for (let i = 1; i < input.length; i++) {
      if (input[i] === "add") {
        expect(O.add(args[i]![0] as number)).toBe(expected[i]);
      }
    }
  });
  // test("T2", () => {});
  // test("T3", () => {});
});
