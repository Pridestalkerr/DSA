import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";
import { LC } from "@dsa/common";

describe("LC/2807._Insert_Greatest_Common_Divisors_in_Linked_List", () => {
  test("T1", () => {
    const head = [18, 6, 10, 3];
    const output = [18, 6, 6, 2, 10, 1, 3];
    expect(fn(LC.makeList(head))).toStrictEqual(LC.makeList(output));
  });
  test("T2", () => {
    const head = [7];
    const output = [7];
    expect(fn(LC.makeList(head))).toStrictEqual(LC.makeList(output));
  });
  test("T3", () => {});
});
