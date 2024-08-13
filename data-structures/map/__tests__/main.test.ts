import { describe, expect, test } from "@jest/globals";
import { OrderedMap } from "../src/index";

describe("RBTree", () => {
  type T = {
    data: string;
  };

  type K = {
    key: number;
    stuff: string;
  };
  const objCmp = (a: K, b: K) => a.key - b.key;

  test("INSERT", () => {
    const t = new OrderedMap({ compare: objCmp });
    t.insert({ key: 1, stuff: "1" }, { data: "1" });
    t.insert({ key: 2, stuff: "2" }, { data: "2" });
    t.insert({ key: 3, stuff: "3" }, { data: "3" });
    t.insert({ key: 4, stuff: "4" }, { data: "4" });
    t.insert({ key: 5, stuff: "5" }, { data: "5" });
    t.insert({ key: 6, stuff: "6" }, { data: "6" });
    t.insert({ key: 7, stuff: "7" }, { data: "7" });
    t.insert({ key: 8, stuff: "8" }, { data: "8" });
    expect(t.size()).toBe(8);
    expect(t.erase({ key: 1, stuff: "1" })).toStrictEqual({ data: "1" });
    expect(t.size()).toBe(7);
    expect(t.find({ key: 1, stuff: "1" })).toBeUndefined();
    expect(t.find({ key: 2, stuff: "2" })).toStrictEqual({ data: "2" });
  });

  test("INSERT:defaultKey", () => {
    const t = new OrderedMap({
      from: [["first", { data: "1" }]],
    });
    t.insert("second", { data: "2" });
    t.insert("third", { data: "3" });
    t.insert("fourth", { data: "4" });
    t.insert("fifth", { data: "5" });
    t.insert("sixth", { data: "6" });
    t.insert("seventh", { data: "7" });
    t.insert("eighth", { data: "8" });
    expect(t.size()).toBe(8);
    expect(t.erase("first")).toStrictEqual({ data: "1" });
    expect(t.size()).toBe(7);
    expect(t.find("first")).toBeUndefined();
    expect(t.find("second")).toStrictEqual({ data: "2" });
  });
});
