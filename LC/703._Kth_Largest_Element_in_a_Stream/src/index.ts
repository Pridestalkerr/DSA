import { HeapUtils } from "@dsa/heap";

export default class KthLargest {
  heap: number[];
  utils: InstanceType<typeof HeapUtils.Builder<number>>;
  k: number;
  constructor(k: number, nums: number[]) {
    // k is the max size of our heap
    // nums could initially hold more than k elements
    // we use a max heap
    this.utils = new HeapUtils.Builder<number>((a, b) => b - a);
    this.heap = nums;
    this.utils.makeHeap(nums);
    this.k = k;
    while (this.heap.length > k) {
      this.utils.popHeap(this.heap);
    }
  }

  add(val: number): number {
    this.utils.pushHeap(this.heap, val);
    if (this.heap.length > this.k) {
      this.utils.popHeap(this.heap);
    }
    return this.heap[0]!;
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
