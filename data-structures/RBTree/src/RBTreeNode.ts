import { BSTNode } from "./BSTNode";

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

// export class RBTreeNode<T> extends BSTNode<
//   T,
//   {
//     color: Color;
//   }
// > {
//   constructor(key: T) {
//     super(key, { color: Color.RED });
//   }

//   public isRed() {
//     return this.meta.color === Color.RED;
//   }

//   public isBlack() {
//     return this.meta.color === Color.BLACK;
//   }
// }

// class NIL extends RBTreeNode<never> {
//   constructor() {
//     super(undefined as never);
//     this.meta.color = Color.BLACK;
//     this.left = this;
//     this.right = this;
//     this.parent = this;
//   }
// }

// export const NILNode = Object.freeze(new NIL());
// export type NILNode = typeof NILNode;
