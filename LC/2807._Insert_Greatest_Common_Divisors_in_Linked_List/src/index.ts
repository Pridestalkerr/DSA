import { LC } from "@dsa/common";
import { gcd } from "@dsa/factorization";
type ListNode = LC.ListNode;
const ListNode = LC.ListNode;

export default function insertGreatestCommonDivisors(head: ListNode | null): ListNode | null {
  // pretty simple, just iterate through the list and, as long as theres a next
  // add the gcd in between them
  let current = head;
  while (current?.next) {
    const next = current.next;
    const between = new ListNode(gcd(current.val, next.val), next);
    current.next = between;
    current = next;
  }

  return head;
}
