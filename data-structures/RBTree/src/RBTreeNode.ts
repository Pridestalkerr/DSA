import { BSTNode } from "@dsa/bstree";

export const enum Color {
  RED,
  BLACK,
}

export type RBMeta = { color: Color };
export type RBTreeNode<T> = BSTNode<T, RBMeta>;
export function newRBTNode<T>(key: T) {
  return new BSTNode<T, RBMeta>(key, { color: Color.RED });
}

export function isRed<T>(node: RBTreeNode<T>) {
  return node.meta.color === Color.RED;
}

export function isBlack<T>(node: RBTreeNode<T>) {
  return node.meta.color === Color.BLACK;
}
