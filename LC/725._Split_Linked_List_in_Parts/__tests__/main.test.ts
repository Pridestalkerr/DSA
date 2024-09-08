import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";
import { LC } from "@dsa/common";

describe("LC/725._Split_Linked_List_in_Parts", () => {
  test("T1", () => {
    const head = [1, 2, 3];
    const k = 5;
    const output = [[1], [2], [3], [], []];
    expect(fn(LC.makeList(head), k)).toStrictEqual(output.map(LC.makeList));
  });
  test("T2", () => {
    const head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const k = 3;
    const output = [
      [1, 2, 3, 4],
      [5, 6, 7],
      [8, 9, 10],
    ];
    expect(fn(LC.makeList(head), k)).toStrictEqual(output.map(LC.makeList));
  });
  test("T3", () => {});
});
