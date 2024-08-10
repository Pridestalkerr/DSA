export const enum Color {
  RED,
  BLACK,
}

export class RBTreeNode<T> {
  key: T; // this can contain additional data as well, such as in a map implementation
  color: Color = Color.RED;
  left: RBTreeNode<T> | undefined = undefined;
  right: RBTreeNode<T> | undefined = undefined;
  parent: RBTreeNode<T> | undefined = undefined;

  constructor(key: T) {
    this.key = key;
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
