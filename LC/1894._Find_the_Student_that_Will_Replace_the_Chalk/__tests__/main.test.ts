import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/1894._Find_the_Student_that_Will_Replace_the_Chalk", () => {
  test("T1", () => {
    const chalk = [5, 1, 5];
    const k = 22;
    expect(fn(chalk, k)).toBe(0);
  });
  test("T2", () => {
    const chalk = [3, 4, 1, 2];
    const k = 25;
    expect(fn(chalk, k)).toBe(1);
  });
  test("T3", () => {});
});
