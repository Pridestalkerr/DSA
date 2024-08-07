import { getDefaultCompare, OptionalCMP } from "./cmp";
import { checkBounds } from "./partition";

export type PivotSelector = <T>(
  opt: {
    left: number;
    right: number;
    arr: T[];
  } & OptionalCMP<T>,
) => number;

export const rightmostPivot: PivotSelector = ({ right }) => right;

export const leftmostPivot: PivotSelector = ({ left }) => left;

// TODO: middle calculation might overflow
export const middlePivot: PivotSelector = ({ left, right }) => Math.floor((left + right) / 2);

export const randomPivot: PivotSelector = ({ left, right }) => {
  return Math.floor(Math.random() * (right - left + 1)) + left;
};

export const medianOfThreePivot: PivotSelector = ({ left, right, arr, compare }) => {
  checkBounds(arr, left, right);
  const mid = Math.floor((left + right) / 2);
  const a = arr[left]!;
  const b = arr[Math.floor((left + right) / 2)]!;
  const c = arr[right]!;

  const cmp = compare ?? getDefaultCompare(a);

  if ((cmp(a, b) <= 0 && cmp(b, c) <= 0) || (cmp(c, b) <= 0 && cmp(b, a) <= 0)) return mid;
  if ((cmp(b, a) <= 0 && cmp(a, c) <= 0) || (cmp(c, a) <= 0 && cmp(a, b) <= 0)) return left;
  return right;
};

export const quarterPivot: PivotSelector = ({ left, right }) => {
  return Math.floor((right - left + 1) / 4) + left;
};

// TODO: ninther method
