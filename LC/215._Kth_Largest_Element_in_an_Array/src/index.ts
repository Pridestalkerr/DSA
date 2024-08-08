import { quickselect } from "@dsa/quicksort";

export default function findKthLargest(nums: number[], k: number): number {
  // quickselect with Hoare's partition (default)
  return quickselect(nums, k - 1, { descending: true });
}
