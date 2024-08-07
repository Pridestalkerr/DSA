import { getDefaultCompare, OptionalCMP } from "./cmp";
import { PivotSelector, rightmostPivot } from "./pivot";
import { SafeArray } from "./utils";

type Options<T> = {
  left?: number;
  right?: number;
  descending?: boolean;
  pivot?: PivotSelector<T>;
} & OptionalCMP<T>;

export type Partition<T> = (arr: T[], opt: Options<T>) => number;

export const LomutoPartition = <T>(arr: T[], opt: Options<T>) => {
  // 1. Setup
  const left = opt.left ?? 0;
  const right = opt.right ?? arr.length - 1;
  checkBounds(arr, left, right);
  arr = SafeArray(arr);
  const _cmp = opt.compare ?? getDefaultCompare(arr[0]);
  const sign = opt.descending ? -1 : 1;
  const cmp: typeof _cmp = (...args) => sign * _cmp(...args);
  const pivot = opt.pivot ?? rightmostPivot;

  // 2. Choose pivot and move it to the end
  const pivotIndex = pivot({ left, right, arr, compare: cmp });
  swap(arr, pivotIndex, right);

  // 3. Partition
  const pivotValue = arr[right]!;
  let smallerBoundary = left - 1;
  for (let idx = left; idx < right; idx++) {
    if (sign * cmp(arr[idx]!, pivotValue) < 0) {
      smallerBoundary++;
      swap(arr, smallerBoundary, idx);
    }
  }

  // 4. Move pivot to its final place and return its index
  swap(arr, smallerBoundary + 1, right);
  return smallerBoundary + 1;
};

export const checkBounds = (arr: any[], left: number, right: number) => {
  if (left < 0 || right >= arr.length) {
    throw new Error(
      `Out of bounds access on array of size ${arr.length} at index ${left} or ${right}`,
    );
  }
};

const swap = <T>(arr: T[], i: number, j: number) => {
  checkBounds(arr, i, j);
  [arr[i]!, arr[j]!] = [arr[j]!, arr[i]!];
};