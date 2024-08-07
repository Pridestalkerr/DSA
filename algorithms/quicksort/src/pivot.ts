import { getDefaultCompare, OptionalCMP } from "./cmp";
import { checkBounds } from "./partition";

type Options<T> = {
  left: number;
  right: number;
  arr: T[];
  descending?: boolean;
} & OptionalCMP<T>;

export type PivotSelector<T> = (opt: Options<T>) => number;

export const rightmostPivot = <T>({ right }: Options<T>) => right;

export const leftmostPivot = <T>({ left }: Options<T>) => left;

// TODO: middle calculation might overflow
export const middlePivot = <T>({ left, right }: Options<T>) => Math.floor((left + right) / 2);

export const randomPivot = <T>({ left, right }: Options<T>) => {
  return Math.floor(Math.random() * (right - left + 1)) + left;
};

export const medianOfThreePivot = <T>({ left, right, arr, compare }: Options<T>) => {
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

export const quarterPivot = <T>({ left, right }: Options<T>) => {
  return Math.floor((right - left + 1) / 4) + left;
};

// TODO: ninther method
