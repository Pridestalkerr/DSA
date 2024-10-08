import { describe, expect, test } from "@jest/globals";
import { BSTree } from "../src/tree";
import { BSTreeIterator } from "../src/iterator";

describe("RBTree", () => {
  type T = {
    key: number;
    whatever: string;
  };
  const objCmp = (a: T, b: T) => a.key - b.key;
  test("INSERT", () => {
    const t = new BSTree({ compare: objCmp, newMeta: () => ({}) });
    t.insertUnique({ key: 1, whatever: "1" });
    t.insertUnique({ key: 2, whatever: "2" });
    t.insertUnique({ key: 3, whatever: "3" });
    t.insertUnique({ key: 4, whatever: "4" });
    t.insertUnique({ key: 5, whatever: "5" });
    t.insertUnique({ key: 6, whatever: "6" });
    t.insertUnique({ key: 7, whatever: "7" });
    t.insertUnique({ key: 8, whatever: "8" });
    expect(t.size).toBe(8);
    expect(t.find({ key: 1, whatever: "1" })!.key).toStrictEqual({ key: 1, whatever: "1" });
    expect(t.find({ key: 7, whatever: "7" })!.key).toStrictEqual({ key: 7, whatever: "7" });
    expect(t.find({ key: 20, whatever: "20" })).toBeUndefined();
  });
  test("ERASE", () => {
    const t = new BSTree({ compare: objCmp, newMeta: () => ({}) });
    t.insertUnique({ key: 1, whatever: "1" });
    t.insertUnique({ key: 2, whatever: "2" });
    t.insertUnique({ key: 3, whatever: "3" });
    t.insertUnique({ key: 4, whatever: "4" });
    t.insertUnique({ key: 5, whatever: "5" });
    t.insertUnique({ key: 6, whatever: "6" });
    t.insertUnique({ key: 7, whatever: "7" });
    t.insertUnique({ key: 8, whatever: "8" });
    expect(t.size).toBe(8);
    expect(t.erase({ key: 1, whatever: "1" })!.key).toStrictEqual({ key: 1, whatever: "1" });
    expect(t.size).toBe(7);
    expect(t.find({ key: 1, whatever: "1" })).toBeUndefined();
  });
  test("ITERATOR", () => {
    const t = new BSTree({ compare: objCmp, newMeta: () => ({}) });
    // random inserts
    t.insertUnique({ key: 3, whatever: "3" });
    t.insertUnique({ key: 1, whatever: "1" });
    t.insertUnique({ key: 2, whatever: "2" });
    t.insertUnique({ key: 4, whatever: "4" });
    t.insertUnique({ key: 8, whatever: "8" });
    t.insertUnique({ key: 7, whatever: "7" });
    t.insertUnique({ key: 5, whatever: "5" });
    t.insertUnique({ key: 6, whatever: "6" });
    expect(t.size).toBe(8);
    const node = t.find({ key: 4, whatever: "4" });
    expect(node!.key).toStrictEqual({ key: 4, whatever: "4" });
    const it = new BSTreeIterator(t.__header, node!);
    expect(it.initialized).toBe(false);
    expect(it.done).toBe(false);
    expect(it.next().value.key).toStrictEqual({ key: 4, whatever: "4" });
    expect(it.done).toBe(false);
    expect(it.next().value.key).toStrictEqual({ key: 5, whatever: "5" });
    expect(it.next().value.key).toStrictEqual({ key: 6, whatever: "6" });
    expect(it.next().next().value.key).toStrictEqual({ key: 8, whatever: "8" });
    expect(it.prev().value.key).toStrictEqual({ key: 7, whatever: "7" });
    expect(it.next().value.key).toStrictEqual({ key: 8, whatever: "8" });
    expect(it.next().done).toBe(true);
    expect(() => it.next()).toThrowError("BSTreeIterator: cannot move past end");
    expect(it.canPrev).toBe(true);
    expect(it.canNext).toBe(false);
    expect(it.prev().value.key).toStrictEqual({ key: 8, whatever: "8" });
    expect(it.prev().prev().prev().prev().prev().prev().value.key).toStrictEqual({
      key: 2,
      whatever: "2",
    });
    expect(it.prev().value.key).toStrictEqual({ key: 1, whatever: "1" });
    expect(it.prev().done).toBe(true);
    expect(() => it.prev()).toThrowError("BSTreeIterator: cannot move past end");
    expect(it.canNext).toBe(true);
    expect(it.canPrev).toBe(false);
    expect(it.next().value.key).toStrictEqual({ key: 1, whatever: "1" });
    expect(it.canNext).toBe(true);
    expect(it.canPrev).toBe(true);
  });
});
