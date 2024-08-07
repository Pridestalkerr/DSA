import { describe, expect, test } from "@jest/globals";
import { quicksort } from "../src";

describe("QuickSort", () => {
  test("NUMBER:ascending", () => {
    const arr = Array.from({ length: 100 }, () => (Math.random() - 0.5) * 100);
    const sorted = [...arr].sort((a, b) => a - b);
    expect(quicksort(arr, {})).toEqual(sorted);
  });
  test("NUMBER:descending", () => {
    const arr = Array.from({ length: 100 }, () => (Math.random() - 0.5) * 100);
    const sorted = [...arr].sort((a, b) => b - a);
    expect(quicksort(arr, { descending: true })).toEqual(sorted);
  });
  test("NUMBER:already_sorted", () => {
    const arr = Array.from({ length: 100 }, (_, i) => i);
    const sorted = [...arr];
    expect(quicksort(arr, {})).toEqual(sorted);
  });
  test("NUMBER:one_element", () => {
    const arr = [1];
    const sorted = [1];
    expect(quicksort(arr, {})).toEqual(sorted);
  });
  test("NUMBER:empty", () => {
    const arr: number[] = [];
    const sorted: number[] = [];
    expect(quicksort(arr, {})).toEqual(sorted);
  });

  test("STRING:ascending", () => {
    const arr = Array.from({ length: 100 }, () => Math.random().toString(36).substring(2));
    const sorted = [...arr].sort();
    expect(quicksort(arr, {})).toEqual(sorted);
  });
  test("STRING:descending", () => {
    const arr = Array.from({ length: 100 }, () => Math.random().toString(36).substring(2));
    const sorted = [...arr].sort().reverse();
    expect(quicksort(arr, { descending: true })).toEqual(sorted);
  });
  test("STRING:duplicates", () => {
    const arr = Array.from({ length: 100 }, () => (Math.random() > 0.5 ? "a" : "b"));
    const sorted = [...arr].sort();
    expect(quicksort(arr, {})).toEqual(sorted);
  });

  test("OBJECT:ascending", () => {
    const arr = Array.from({ length: 100 }, () => ({ val: Math.random(), key: Math.random() }));
    const sorted = [...arr].sort((a, b) => a.val - b.val);
    expect(quicksort(arr, { compare: (a, b) => a.val - b.val })).toEqual(sorted);
  });
  test("OBJECT:descending", () => {
    const arr = Array.from({ length: 100 }, () => ({ val: Math.random(), key: Math.random() }));
    const sorted = [...arr].sort((a, b) => b.val - a.val);
    expect(quicksort(arr, { compare: (a, b) => a.val - b.val, descending: true })).toEqual(sorted);
  });
  test("OBJECT:descending_cmp", () => {
    const arr = Array.from({ length: 100 }, () => ({ val: Math.random(), key: Math.random() }));
    const sorted = [...arr].sort((a, b) => b.val - a.val);
    expect(quicksort(arr, { compare: (a, b) => b.val - a.val })).toEqual(sorted);
  });
});
