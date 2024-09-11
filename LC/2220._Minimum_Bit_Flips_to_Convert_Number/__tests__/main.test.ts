import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/2220._Minimum_Bit_Flips_to_Convert_Number", () => {
  test("T1", () => {
    expect(fn(10, 7)).toStrictEqual(3);
  });
  test("T2", () => {
    expect(fn(3, 4)).toStrictEqual(3);
  });
  test("T3", () => {});
});
