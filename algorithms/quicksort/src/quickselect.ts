import { getDefaultCompare, OptionalCMP } from "./cmp";
import { checkBounds, LomutoPartition, Partition } from "./partition";
import { SafeArray } from "./utils";

type Options<T> = {
  partition?: Partition<T>;
  left?: number;
  right?: number;
  descending?: boolean;
} & OptionalCMP<T>;
export const quickselect = <T>(arr: T[], k: number, opt: Options<T>): T => {
  // 1. Setup
  if (arr.length === 0) throw new Error("Cannot select from empty array");
  if (k < 0 || k >= arr.length) {
    throw new Error(
      `Quickselect k-th order statistic out of bounds: ${k} for array of size ${arr.length}`,
    );
  }
  const left = opt.left ?? 0;
  const right = opt.right ?? arr.length - 1;
  checkBounds(arr, left, right);
  arr = SafeArray(arr);
  const _cmp = opt.compare ?? getDefaultCompare(arr[0]);
  const sign = opt.descending ? -1 : 1;
  const cmp: typeof _cmp = (...args) => sign * _cmp(...args);
  const partition = opt.partition ?? LomutoPartition;

  // 2. Quickselect helper
  const select = (left: number, right: number): T => {
    if (left === right) return arr[left]!;
    const pivotIndex = partition(arr, { left, right, compare: cmp });
    if (k === pivotIndex) return arr[k]!;
    if (k < pivotIndex) return select(left, pivotIndex - 1);
    return select(pivotIndex + 1, right);
  };

  // 3. Select and return
  return select(left, right);
};
