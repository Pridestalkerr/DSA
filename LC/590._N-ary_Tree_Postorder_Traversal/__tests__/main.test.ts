import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";
import Node from "../src/node";

// Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value
const makeTree = (arr: (number | null)[]): Node | null => {
  if (arr.length === 0 || arr[0] === null) return null;
  const root = new Node(arr[0]!);
  const queue: Node[] = [root];
  let i = 2; // root is first
  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift()!;

    while (i < arr.length && arr[i] !== null) {
      const child = new Node(arr[i] as number);
      current.children.push(child);
      queue.push(child);
      i++;
    }

    i++; // skip null
  }

  return root;
};

describe("LC/590._N-ary_Tree_Postorder_Traversal", () => {
  test("T1", () => {
    const root = [1, null, 3, 2, 4, null, 5, 6];
    const output = [5, 6, 3, 2, 4, 1];
    expect(fn(makeTree(root))).toStrictEqual(output);
  });
  test("T2", () => {
    const root = [
      1,
      null,
      2,
      3,
      4,
      5,
      null,
      null,
      6,
      7,
      null,
      8,
      null,
      9,
      10,
      null,
      null,
      11,
      null,
      12,
      null,
      13,
      null,
      null,
      14,
    ];
    const output = [2, 6, 14, 11, 7, 3, 12, 8, 4, 13, 9, 10, 5, 1];
    expect(fn(makeTree(root))).toStrictEqual(output);
  });
  test("T3", () => {});
});
