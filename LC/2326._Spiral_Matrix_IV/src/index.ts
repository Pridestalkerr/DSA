import { LC } from "@dsa/common";
type ListNode = LC.ListNode;

export default function spiralMatrix(m: number, n: number, head: ListNode | null): number[][] {
  // very straight forward
  // pre initialize the m x n matrix with -1
  // then iterate in a spyral and populate with values in the linked list
  const ans = Array.from({ length: m }, () => new Array<number>(n).fill(-1));

  const moves = [
    [0, 1], // RIGHT
    [1, 0], // DOWN
    [0, -1], // LEFT
    [-1, 0], // UP
  ] as const;

  let i = 0;
  let j = 0;
  let current = head;
  if (!current) return ans;

  let direction = 0;
  while (current) {
    ans[i]![j] = current.val;
    let [di, dj] = moves[direction]!;
    di += i;
    dj += j;
    if (di < 0 || di >= m || dj < 0 || dj >= n || ans[di]![dj] !== -1) {
      direction = (direction + 1) % 4;
      [di, dj] = moves[direction]!;
      di += i;
      dj += j;
    }
    i = di;
    j = dj;
    current = current.next;
  }

  return ans;
}
