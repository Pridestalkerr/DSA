import { RBTreeNode } from "./RBTreeNode";

// TODO: extract iterator logic somewhere else since every container will use it
class RBTreeIterator<T> {
  protected node: RBTreeNode<T>;
  protected header: RBTreeNode<T>;

  constructor(node: RBTreeNode<T>, header: RBTreeNode<T>) {
    this.node = node;
    this.header = header;
  }

  next() {
    this.node = this.__increment(this.node);
    return this;
  }

  pre() {
    this.node = this.__decrement(this.node);
    return this;
  }

  protected __increment(X: RBTreeNode<T>) {
    if (X.right !== undefined) {
      X = X.right;
      while (X.left !== undefined) {
        X = X.left;
      }
    } else {
      // TODO: node->parent is always defined, but it could be header, can we make TS happy?
      let P = X.parent as RBTreeNode<T>; // this is safe since it always points to header
      while (X === P.right) {
        X = P;
        P = X.parent as RBTreeNode<T>;
      }
      if (X.right !== P) {
        X = P;
      }
    }
    return X;
  }

  protected __decrement(X: RBTreeNode<T>) {
    let GP = X.parent?.parent;
    if (X.isRed() && GP === X) {
      X = X.right;
    } else if (X.left !== undefined) {
      X = X.left;
      while (X.right !== undefined) {
        X = X.right;
      }
    } else {
      let P = X.parent;
      while (X === P.left) {
        X = P;
        P = X.parent;
      }
      X = P;
    }
    return X;
  }
}
