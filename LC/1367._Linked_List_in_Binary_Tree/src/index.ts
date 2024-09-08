import type { ListNode, TreeNode } from "./node";

function listToArray(head: ListNode | null): number[] {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

export default function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
  // easiest solution would be to perform a dfs on the tree from every node, and see
  // if that node is the root of the linked list
  // complexity would be O(n * m) where m is length of list
  // can we do better?
  // notice how the problem is very similar to word matching in a string
  // KMP exists for that, linear time complexity, but we need more space
  // anything else? doubt it, the problem should be equivalent to string matching

  if (head === null) return true;
  if (root === null) return false;
  const word = listToArray(head);

  let pos = 1;
  let cnd = 0;
  const table = new Array<number>(word.length);
  table[0] = -1;

  while (pos < word.length) {
    if (word[pos] === word[cnd]) {
      table[pos] = table[cnd]!;
    } else {
      table[pos] = cnd;
      //   cnd = table[cnd]!;
      while (cnd >= 0 && word[pos] !== word[cnd]) {
        cnd = table[cnd]!;
      }
    }
    pos++;
    cnd++;
  }
  table[pos] = cnd;

  // node is current node, k is current idx in list were were at currently
  const DFS = (node: TreeNode | null, k: number): boolean => {
    if (k === word.length) return true;
    if (node === null) return false;

    if (node.val === word[k]) {
      // we go down the tree i guess?
      // j = j + 1;
      k = k + 1;
      if (k === word.length) return true;
      return DFS(node.left, k) || DFS(node.right, k);
    } else {
      k = table[k]!;
      if (k < 0) {
        k = k + 1;
        return DFS(node.left, k) || DFS(node.right, k);
      } else {
        return DFS(node, k);
      }
    }
  };

  return DFS(root, 0);
}

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

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
