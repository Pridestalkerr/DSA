import { describe, expect, test } from "@jest/globals";
import { Set } from "../src";

describe("RBTree", () => {
  type T = {
    key: number;
    whatever: string;
  };
  const objCmp = (a: T, b: T) => a.key - b.key;
  test("INSERT", () => {
    const t = new Set({ compare: objCmp });
    t.insert({ key: 1, whatever: "1" });
    t.insert({ key: 2, whatever: "2" });
    t.insert({ key: 3, whatever: "3" });
    t.insert({ key: 4, whatever: "4" });
    t.insert({ key: 5, whatever: "5" });
    t.insert({ key: 6, whatever: "6" });
    t.insert({ key: 7, whatever: "7" });
    t.insert({ key: 8, whatever: "8" });
    expect(t.size()).toBe(8);
    expect(t.erase({ key: 1, whatever: "1" })).toStrictEqual({ key: 1, whatever: "1" });
    expect(t.size()).toBe(7);
    expect(t.find({ key: 1, whatever: "1" })).toBeUndefined();
  });
});
