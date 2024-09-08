import { LC } from "@dsa/common";
type ListNode = LC.ListNode;

export default function splitListToParts(head: ListNode | null, k: number): Array<ListNode | null> {
  // fairly straight forward
  // we first have to calculate the length of the linked list
  // after that, we just perform a single iteration
  // when we reach the n / kth node, we cut the list
  // the first n % k lists will have an extra node

  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }

  const size = Math.floor(length / k);
  const remainder = length % k;

  const ans = new Array<ListNode | null>(k).fill(null);
  current = head;
  for (let i = 0; i < k; i++) {
    if (!current) break;
    ans[i] = current;
    const partitionSize = size + (i < remainder ? 1 : 0);
    for (let j = 0; j < partitionSize - 1 && current; j++) {
      current = current.next;
    }
    const next = current!.next;
    current!.next = null;
    current = next;
  }

  return ans;
}
