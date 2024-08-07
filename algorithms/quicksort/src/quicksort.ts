import { getDefaultCompare, OptionalCMP } from "./cmp";
import { checkBounds, LomutoPartition, Partition } from "./partition";
import { SafeArray } from "./utils";

type Options<T> = {
  partition?: Partition<T>;
  left?: number;
  right?: number;
  descending?: boolean;
} & OptionalCMP<T>;

export const quicksort = <T>(arr: T[], opt: Options<T>): T[] => {
  // 1. Setup
  if (arr.length <= 1) return arr;
  const left = opt.left ?? 0;
  const right = opt.right ?? arr.length - 1;
  checkBounds(arr, left, right);
  arr = SafeArray(arr);
  const _cmp = opt.compare ?? getDefaultCompare(arr[0]);
  const sign = opt.descending ? -1 : 1;
  const cmp: typeof _cmp = (...args) => sign * _cmp(...args);
  const partition = opt.partition ?? LomutoPartition;

  // 2. Recursion helper
  const sort = (left: number, right: number) => {
    if (left >= right) return;
    const pivotIndex = partition(arr, { left, right, compare: cmp });
    sort(left, pivotIndex - 1);
    sort(pivotIndex + 1, right);
  };

  // 3. Sort and return
  sort(left, right);
  return arr;
};
