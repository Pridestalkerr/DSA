/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import type ListNode from "./node";

export default function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
  // theyre never empty apparently, so thats nice
  // first of all, add the nums to a hashset for ammortized O(1) lookup
  const set = new Set(nums);

  if (!head) return null; // make TS happy as well as not existent edge case

  // now we just iterate over the list
  // we must keep track of:
  // 1. the new head
  // 2. previous node (not null)
  // 3. current node

  let newHead: ListNode | null = null;
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr) {
    if (!set.has(curr.val)) {
      // leave it there
      if (!newHead) newHead = curr;
      prev = curr;
    } else {
      // remove it
      if (prev) {
        // splice it, keep prev node
        prev.next = curr.next;
      }
    }
    curr = curr.next;
  }

  return newHead;
}
