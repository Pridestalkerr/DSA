import { describe, expect, test } from "@jest/globals";
import { List } from "../src/index";

describe("LinkedList", () => {
  test("PUSH:BACK_FRONT", () => {
    const l = new List<number>();
    expect(l.size).toBe(0);
    expect(l.empty()).toBe(true);
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    expect(l.size).toBe(4);
    expect(l.front()).toBe(1);
    expect(l.back()).toBe(4);
    expect([...l]).toStrictEqual([1, 2, 3, 4]);
    l.pushFront(0);
    expect(l.size).toBe(5);
    expect(l.front()).toBe(0);
    expect(l.back()).toBe(4);
    l.pushFront(-1);
    l.pushFront(-2);
    expect(l.size).toBe(7);
    expect(l.front()).toBe(-2);
    expect(l.back()).toBe(4);
    expect([...l]).toStrictEqual([-2, -1, 0, 1, 2, 3, 4]);
  });
  test("INSERT", () => {
    const l = new List<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.begin().next();
    l.insertBefore(it, 0.5);
    expect(l.size).toBe(5);
    expect([...l]).toStrictEqual([0.5, 1, 2, 3, 4]);
    l.insertBefore(it, 0.25);
    expect(l.size).toBe(6);
    expect([...l]).toStrictEqual([0.5, 0.25, 1, 2, 3, 4]);
    // it is still at 1
    // lets move it a bit to the right
    it.next().next();
    expect(it.value).toBe(3);
    l.insertAfter(it, 3.5);
    expect(l.size).toBe(7);
    expect([...l]).toStrictEqual([0.5, 0.25, 1, 2, 3, 3.5, 4]);
    // lets test the ends a bit
    while (!it.done) {
      it.next();
    }
    expect(() => it.next()).toThrowError("ListNodeIterator: cannot move past end");
    expect(it.value).toBe(undefined);
    it.prev();
    expect(it.value).toBe(4);
    expect(it.done).toBe(false);
    expect(it.prev().value).toBe(3.5);
  });
  test("ITERATORS:default", () => {
    const l = new List<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.rbegin().next();
    expect(it.value).toBe(4);
    it.next();
    expect(it.value).toBe(3);
    it.next();
    expect(it.value).toBe(2);
    it.next();
    expect(it.value).toBe(1);
    it.next();
    expect(it.done).toBe(true);
    expect(it.value).toBe(undefined);
  });
  test("ITERATORS:reverse", () => {
    const l = new List<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.begin().next();
    expect(it.value).toBe(1);
    it.next();
    expect(it.value).toBe(2);
    it.next();
    expect(it.value).toBe(3);
    it.next();
    expect(it.value).toBe(4);
    it.next();
    expect(it.done).toBe(true);
    expect(it.value).toBe(undefined);
  });
  test("ERASE", () => {
    const l = new List<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.begin().next(); // 1
    it.next(); // 2
    it.next(); // 3
    l.erase(it);
    expect(l.size).toBe(3);
    expect([...l]).toStrictEqual([1, 2, 4]);
    expect(it.value).toBe(3); // iterator still alive
    expect(it.next().value).toBe(4); // move it
    l.erase(it); // erase 4
    expect(l.size).toBe(2);
    console.log([...l]);
    expect([...l]).toStrictEqual([1, 2]);
    l.pushBack(3);
    l.pushBack(4);
    l.pushBack(5);
    l.popBack();
    expect(l.size).toBe(4);
    expect([...l]).toStrictEqual([1, 2, 3, 4]);
    l.popFront();
    expect(l.size).toBe(3);
    expect([...l]).toStrictEqual([2, 3, 4]);
  });
});
