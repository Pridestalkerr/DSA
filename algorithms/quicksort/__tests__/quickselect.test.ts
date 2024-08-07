import { describe, expect, test } from "@jest/globals";
import { quickselect } from "../src/quickselect";
import { stringCompare } from "../src/cmp";

describe("QuickSelect", () => {
  test("NUMBER:ascending", () => {
    const arr = Array.from({ length: 100 }, () => (Math.random() - 0.5) * 100);
    const sorted = [...arr].sort((a, b) => a - b);
    expect(quickselect(arr, 0, {})).toEqual(sorted[0]);
    expect(quickselect(arr, 50, {})).toEqual(sorted[50]);
    expect(quickselect(arr, 99, {})).toEqual(sorted[99]);
  });
  test("NUMBER:descending", () => {
    const arr = Array.from({ length: 100 }, () => (Math.random() - 0.5) * 100);
    const sorted = [...arr].sort((a, b) => b - a);
    expect(quickselect(arr, 0, { descending: true })).toEqual(sorted[0]);
    expect(quickselect(arr, 50, { descending: true })).toEqual(sorted[50]);
    expect(quickselect(arr, 99, { descending: true })).toEqual(sorted[99]);
  });
  test("STRING:ascending", () => {
    const arr = Array.from({ length: 100 }, () => Math.random().toString(36).substring(2));
    const sorted = [...arr].sort();
    expect(quickselect(arr, 0, { compare: stringCompare })).toEqual(sorted[0]);
    expect(quickselect(arr, 50, { compare: stringCompare })).toEqual(sorted[50]);
    expect(quickselect(arr, 99, { compare: stringCompare })).toEqual(sorted[99]);
  });
  test("STRING:descending", () => {
    const arr = Array.from({ length: 100 }, () => Math.random().toString(36).substring(2));
    const sorted = [...arr].sort().reverse();
    expect(quickselect(arr, 0, { compare: stringCompare, descending: true })).toEqual(sorted[0]);
    expect(quickselect(arr, 50, { compare: stringCompare, descending: true })).toEqual(sorted[50]);
    expect(quickselect(arr, 99, { compare: stringCompare, descending: true })).toEqual(sorted[99]);
  });
});
