import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";
import Node from "../src/node";

describe("LC/145._Binary_Tree_Postorder_Traversal", () => {
  test("T1", () => {
    const root = new Node(1);
    root.right = new Node(2);
    root.right.left = new Node(3);
    expect(fn(root)).toStrictEqual([3, 2, 1]);
  });
  test("T2", () => {
    expect(fn(null)).toStrictEqual([]);
  });
  test("T3", () => {
    const root = new Node(1);
    expect(fn(root)).toStrictEqual([1]);
  });
});
