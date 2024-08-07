import { quickselect } from "@dsa/quicksort";
import { LomutoPartition } from "@dsa/quicksort/src/partition";

export default function kthLargestNumber(nums: string[], k: number): string {
  // override the default string cmp for strings
  // for this problem, we will write a custom compare instead of converting to number
  const cmp = (a: string, b: string): number => {
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return a.charCodeAt(i) - b.charCodeAt(i);
      }
    }
    return 0;
  };
  // theres a few large test cases where all elements are equal
  // using Lomuto's partition will result in the worse possible time complexity, regardless of pivot
  // we'll use Hoare's partition instead
  // NOTE: the @dsa/quicksort/quickselect function uses Hoare's partition by default
  return quickselect(nums, k - 1, { compare: cmp, descending: true });
}
