import { describe, expect, test } from "@jest/globals";
import { rbtree } from "../src";
import { RBTreeNode } from "../src/RBTreeNode";

describe("RBTree", () => {
  type T = {
    key: number;
    whatever: string;
  };
  const objCmp = (a: T, b: T) => a.key - b.key;
  test("INSERT", () => {
    const t = new rbtree({ compare: objCmp });
    t.insert({ key: 1, whatever: "1" });
    t.insert({ key: 2, whatever: "2" });
    t.insert({ key: 3, whatever: "3" });
    t.insert({ key: 4, whatever: "4" });
    t.insert({ key: 5, whatever: "5" });
    t.insert({ key: 6, whatever: "6" });
    t.insert({ key: 7, whatever: "7" });
    t.insert({ key: 8, whatever: "8" });
    expect(t.find({ key: 1, whatever: "1" })).toStrictEqual({ key: 1, whatever: "1" });
    expect(t.find({ key: 7, whatever: "7" })).toStrictEqual({ key: 7, whatever: "7" });
    expect(t.find({ key: 20, whatever: "20" })).toBeUndefined();
    t.clear();
    expect(t.find({ key: 1, whatever: "1" })).toBeUndefined();
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
    const t = new rbtree({ from: l, compare: objCmp });
    expect(t.find({ key: 1, whatever: "1" })).toStrictEqual({ key: 1, whatever: "1" });
    expect(t.find({ key: 7, whatever: "7" })).toStrictEqual({ key: 7, whatever: "7" });
    expect(t.find({ key: 20, whatever: "20" })).toBeUndefined();
    t.clear();
    expect(t.find({ key: 1, whatever: "1" })).toBeUndefined();
  });
});
