import { describe, expect, test } from "@jest/globals";
import { LinkedList } from "../src/index";

describe("LinkedList", () => {
  test("PUSH:BACK_FRONT", () => {
    const l = new LinkedList<number>();
    expect(l.size).toBe(0);
    expect(l.empty()).toBe(true);
    l.clear();
    expect(l.size).toBe(0);
    expect(l.empty()).toBe(true);
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    expect(l.size).toBe(4);
    expect(l.front()?.data).toBe(1);
    expect(l.back()?.data).toBe(4);
    expect([...l].map((v) => v.data)).toStrictEqual([1, 2, 3, 4]);
    l.pushFront(0);
    expect(l.size).toBe(5);
    expect(l.front()?.data).toBe(0);
    expect(l.back()?.data).toBe(4);
    l.pushFront(-1);
    l.pushFront(-2);
    expect(l.size).toBe(7);
    expect(l.front()?.data).toBe(-2);
    expect(l.back()?.data).toBe(4);
    expect([...l].map((v) => v.data)).toStrictEqual([-2, -1, 0, 1, 2, 3, 4]);
  });
  test("INSERT", () => {
    const l = new LinkedList<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.beginBidirectional().next();
    l.insertBefore(it, 0.5);
    expect(l.size).toBe(5);
    expect([...l].map((v) => v.data)).toStrictEqual([0.5, 1, 2, 3, 4]);
    l.insertBefore(it, 0.25);
    expect(l.size).toBe(6);
    expect([...l].map((v) => v.data)).toStrictEqual([0.5, 0.25, 1, 2, 3, 4]);
    // it is still at 1
    // lets move it a bit to the right
    it.next().next();
    expect(it.value.data).toBe(3);
    l.insertAfter(it, 3.5);
    expect(l.size).toBe(7);
    expect([...l].map((v) => v.data)).toStrictEqual([0.5, 0.25, 1, 2, 3, 3.5, 4]);
    // lets test the ends a bit
    while (!it.done) {
      it.next();
    }
    expect(() => it.next()).toThrowError("ListNodeIterator: cannot move past end");
    expect(it.value.data).toBe(undefined);
    it.prev();
    expect(it.value.data).toBe(4);
    expect(it.done).toBe(false);
    expect(it.prev().value.data).toBe(3.5);
  });
  test("ITERATORS:default", () => {
    const l = new LinkedList<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.begin().next();
    expect(it.value.data).toBe(1);
    it.next();
    expect(it.value.data).toBe(2);
    it.next();
    expect(it.value.data).toBe(3);
    it.next();
    expect(it.value.data).toBe(4);
    it.next();
    expect(it.done).toBe(true);
    expect(it.value.data).toBe(undefined);
  });
  test("ITERATORS:reverse", () => {
    const l = new LinkedList<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.rbegin().next();
    expect(it.value.data).toBe(4);
    it.next();
    expect(it.value.data).toBe(3);
    it.next();
    expect(it.value.data).toBe(2);
    it.next();
    expect(it.value.data).toBe(1);
    it.next();
    expect(it.done).toBe(true);
    expect(it.value.data).toBe(undefined);
  });
  test("ITERATORS:past_end", () => {
    const l = new LinkedList<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.beginBidirectional();
    expect(it.canNext).toBe(true);
    expect(it.canPrev).toBe(true);
    it.next();
    expect(it.canNext).toBe(true);
    expect(it.canPrev).toBe(true);
    expect(it.done).toBe(false);
    expect(it.value.data).toBe(1);
    expect(it.next().done).toBe(false);
    expect(it.value.data).toBe(2);
    expect(it.next().next().value.data).toBe(4);
    expect(it.canNext).toBe(true);
    expect(it.canPrev).toBe(true);
    expect(it.next().done).toBe(true);
    expect(it.canNext).toBe(false);
    expect(it.canPrev).toBe(true);
    expect(it.done).toBe(true);
    expect(() => it.next()).toThrowError("ListNodeIterator: cannot move past end");
    expect(it.prev().value.data).toBe(4);
    expect(it.done).toBe(false);
    expect(it.canNext).toBe(true);
    expect(it.canPrev).toBe(true);
    expect(it.prev().prev().prev().value.data).toBe(1);
    expect(it.done).toBe(false);
    expect(it.prev().done).toBe(true);
    expect(it.canNext).toBe(true);
    expect(it.canPrev).toBe(false);
    expect(() => it.prev()).toThrowError("ListNodeIterator: cannot move past end");
    expect(it.next().value.data).toBe(1);
    expect(it.done).toBe(false);
    expect(it.canNext).toBe(true);
    expect(it.canPrev).toBe(true);
  });
  test("ERASE", () => {
    const l = new LinkedList<number>();
    l.pushBack(1);
    l.pushBack(2);
    l.pushBack(3);
    l.pushBack(4);
    const it = l.begin().next(); // 1
    it.next(); // 2
    it.next(); // 3
    l.erase(it);
    expect(l.size).toBe(3);
    expect([...l].map((v) => v.data)).toStrictEqual([1, 2, 4]);
    expect(it.value.data).toBe(3); // iterator still alive
    expect(it.next().value.data).toBe(4); // move it
    l.erase(it); // erase 4
    expect(l.size).toBe(2);
    expect([...l].map((v) => v.data)).toStrictEqual([1, 2]);
    l.pushBack(3);
    l.pushBack(4);
    l.pushBack(5);
    l.popBack();
    expect(l.size).toBe(4);
    expect([...l].map((v) => v.data)).toStrictEqual([1, 2, 3, 4]);
    l.popFront();
    expect(l.size).toBe(3);
    expect([...l].map((v) => v.data)).toStrictEqual([2, 3, 4]);
  });
});
