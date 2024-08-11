import { describe, expect, test } from "@jest/globals";
import { RBTree } from "../src/RBTree";
// import { RBTreeNode } from "../src/RBTreeNode";

describe("RBTree", () => {
  type T = {
    key: number;
    whatever: string;
  };
  const objCmp = (a: T, b: T) => a.key - b.key;
  test("INSERT", () => {
    const t = new RBTree({ compare: objCmp });
    t.insertUnique({ key: 1, whatever: "1" });
    t.insertUnique({ key: 2, whatever: "2" });
    t.insertUnique({ key: 3, whatever: "3" });
    t.insertUnique({ key: 4, whatever: "4" });
    t.insertUnique({ key: 5, whatever: "5" });
    t.insertUnique({ key: 6, whatever: "6" });
    t.insertUnique({ key: 7, whatever: "7" });
    t.insertUnique({ key: 8, whatever: "8" });
    expect(t.size).toBe(8);
    console.log(t.inOrderTraversal());
    expect(t.find({ key: 1, whatever: "1" })?.key).toStrictEqual({ key: 1, whatever: "1" });
    console.log(t.find({ key: 7, whatever: "7" }));
    expect(t.find({ key: 7, whatever: "7" })?.key).toStrictEqual({ key: 7, whatever: "7" });
    expect(t.find({ key: 20, whatever: "20" })?.key).toBeUndefined();
    t.clear();
    expect(t.find({ key: 1, whatever: "1" })?.key).toBeUndefined();
  });
  test("INSERT:Initializer", () => {
    const l = [
      { key: 1, whatever: "1" },
      { key: 2, whatever: "2" },
      { key: 3, whatever: "3" },
      { key: 4, whatever: "4" },
      { key: 5, whatever: "5" },
      { key: 6, whatever: "6" },
      { key: 7, whatever: "7" },
      { key: 8, whatever: "8" },
    ];
    const t = new RBTree({ from: l, compare: objCmp });
    expect(t.size).toBe(8);
    expect(t.find({ key: 1, whatever: "1" })?.key).toStrictEqual({ key: 1, whatever: "1" });
    expect(t.find({ key: 7, whatever: "7" })?.key).toStrictEqual({ key: 7, whatever: "7" });
    expect(t.find({ key: 20, whatever: "20" })?.key).toBeUndefined();
    t.clear();
    expect(t.find({ key: 1, whatever: "1" })?.key).toBeUndefined();
  });
  test("ERASE", () => {
    const t = new RBTree({ compare: objCmp });
    t.insertUnique({ key: 1, whatever: "1" });
    t.insertUnique({ key: 2, whatever: "2" });
    t.insertUnique({ key: 3, whatever: "3" });
    t.insertUnique({ key: 4, whatever: "4" });
    t.insertUnique({ key: 5, whatever: "5" });
    t.insertUnique({ key: 6, whatever: "6" });
    t.insertUnique({ key: 7, whatever: "7" });
    t.insertUnique({ key: 8, whatever: "8" });
    expect(t.size).toBe(8);
    expect(t.erase({ key: 1, whatever: "1" })?.key).toStrictEqual({ key: 1, whatever: "1" });
    expect(t.size).toBe(7);
    expect(t.find({ key: 1, whatever: "1" })?.key).toBeUndefined();
    t.clear();
    expect(t.size).toBe(0);
    expect(t.find({ key: 2, whatever: "2" })?.key).toBeUndefined();
  });
});
