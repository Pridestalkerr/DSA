import { describe, expect, test } from "@jest/globals";
import { HashTable } from "../src/save";

describe("RBTree", () => {
  //   type T = {
  //     key: number;
  //     whatever: string;
  //   };
  //   const objCmp = (a: T, b: T) => b.key - a.key;
  test("MINHEAP", () => {
    const t = new HashTable<number>();
    t.insertUnique(1);
    t.insertUnique(2);
    t.insertUnique(3);
    t.insertUnique(4);
    expect(t.size).toBe(4);
    expect(t.findFirst(1)).toBe(1);
    expect(t.findFirst(4)).toBe(4);
    expect(t.eraseOne(4)).toBe(4);
    expect(t.size).toBe(3);
    expect(t.findFirst(4)).toBe(undefined);
  });
  //   test("MAXHEAP", () => {
  //     const t = new Heap({ compare: (a: T, b: T) => -objCmp(a, b) }, []);
  //     t.push({ key: 4, whatever: "4" });
  //     t.push({ key: 3, whatever: "3" });
  //     t.push({ key: 8, whatever: "8" });
  //     t.push({ key: 1, whatever: "1" });
  //     t.push({ key: 6, whatever: "6" });
  //     t.push({ key: 5, whatever: "5" });
  //     t.push({ key: 7, whatever: "7" });
  //     t.push({ key: 2, whatever: "2" });
  //     expect(t.size).toBe(8);
  //     expect(t.pop()).toStrictEqual({ key: 8, whatever: "8" });
  //     expect(t.pop()).toStrictEqual({ key: 7, whatever: "7" });
  //     expect(t.size).toBe(6);
  //   });
});
