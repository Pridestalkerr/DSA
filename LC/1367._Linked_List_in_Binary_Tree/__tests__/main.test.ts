import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";
import { TreeNode, ListNode } from "../src/node";

// Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value
const makeBinaryTree = (arr: (number | null)[]): TreeNode | null => {
  if (arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]!);
  const queue: TreeNode[] = [root];
  let i = 1; // root is first
  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift()!;

    if (i < arr.length && arr[i] !== null) {
      const left = new TreeNode(arr[i] as number);
      current.left = left;
      queue.push(left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      const right = new TreeNode(arr[i] as number);
      current.right = right;
      queue.push(right);
    }
    i++;
  }

  return root;
};

const makeList = (arr: number[]): ListNode | null => {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
};

describe("LC/1367._Linked_List_in_Binary_Tree", () => {
  test("T1", () => {
    const head = [4, 2, 8];
    const root = [1, 4, 4, null, 2, 2, null, 1, null, 6, 8, null, null, null, null, 1, 3];
    const result = true;
    expect(fn(makeList(head), makeBinaryTree(root))).toStrictEqual(result);
  });
  test("T2", () => {
    const head = [1, 4, 2, 6];
    const root = [1, 4, 4, null, 2, 2, null, 1, null, 6, 8, null, null, null, null, 1, 3];
    const result = true;
    expect(fn(makeList(head), makeBinaryTree(root))).toStrictEqual(result);
  });
  test("T3", () => {
    const head = [1, 4, 2, 6, 8];
    const root = [1, 4, 4, null, 2, 2, null, 1, null, 6, 8, null, null, null, null, 1, 3];
    const result = false;
    expect(fn(makeList(head), makeBinaryTree(root))).toStrictEqual(result);
  });
  test("T60", () => {
    const head = [1, 10];
    const root = [1, null, 1, 10, 1, 9];
    const result = true;
    expect(fn(makeList(head), makeBinaryTree(root))).toStrictEqual(result);
  });
});
