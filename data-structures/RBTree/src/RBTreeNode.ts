import { BSTNode } from "./BSTNode";

export const enum Color {
  RED,
  BLACK,
}

export class RBTreeNode<T> extends BSTNode<T> {
  color: Color = Color.RED;

  constructor(key: T) {
    super(key);
  }

  public isRed() {
    return this.color === Color.RED;
  }

  public isBlack() {
    return this.color === Color.BLACK;
  }
}

class NIL extends RBTreeNode<never> {
  constructor() {
    super(undefined as never);
    this.color = Color.BLACK;
    this.left = this;
    this.right = this;
    this.parent = this;
  }
}

export const NILNode = Object.freeze(new NIL());
export type NILNode = typeof NILNode;
