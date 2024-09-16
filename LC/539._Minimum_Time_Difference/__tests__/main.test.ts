import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/539._Minimum_Time_Difference", () => {
  test("T1", () => {
    const timePoints = ["23:59", "00:00"];
    expect(fn(timePoints)).toStrictEqual(1);
  });
  test("T2", () => {
    const timePoints = ["00:00", "23:59", "00:00"];
    expect(fn(timePoints)).toStrictEqual(0);
  });
  test("T3", () => {});
});
