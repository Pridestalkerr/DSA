export const enum Color {
  RED,
  BLACK,
}

export class RBTreeNode<T> {
  value: T; // this can contain the key
  color: Color = Color.RED;
  left: RBTreeNode<T> | NILNode = NILNode;
  right: RBTreeNode<T> | NILNode = NILNode;
  parent: RBTreeNode<T> | NILNode = NILNode;

  constructor(value: T) {
    this.value = value;
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
