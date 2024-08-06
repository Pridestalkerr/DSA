const stringCompare = (a: string, b: string): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const numberCompare = (a: number, b: number): number => a - b;

type Other<T> = {
  partition?: (arr: T[], low: number, high: number) => number;
  left?: number;
  right?: number;
  descending?: boolean;
};

type Options<T> = T extends string
  ? {
      compare?: typeof stringCompare;
    } & Other<T>
  : T extends number
    ? {
        compare?: typeof numberCompare;
      } & Other<T>
    : {
        compare: (a: T, b: T) => number;
      } & Other<T>;

export const quicksort = <T>(arr: T[], opt: Options<T>): T[] => {
  if (arr.length <= 1) return arr;

  let cmp = opt.compare;
  if (cmp === undefined) {
    // no compare function provided
    // this means cmp is should default to numberCompare or stringCompare
    if (typeof arr[0] === "number") {
      cmp = numberCompare;
    } else {
      cmp = stringCompare;
    }
  }

  const sign = opt.descending ? -1 : 1;

  return arr;
};

const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
quicksort(arr, {});
