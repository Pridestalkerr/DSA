export class BSTNode<T, M = {}> {
  key: T;
  left: BSTNode<T, M> | undefined;
  right: BSTNode<T, M> | undefined;
  parent: BSTNode<T, M> | undefined;
  meta: M; // additional metadata, such as color in a Red-Black Tree

  constructor(key: T, meta: M) {
    this.key = key;
    this.meta = meta;
  }

  minimum() {
    let X: BSTNode<T, M> = this;
    while (X.left !== undefined) {
      X = X.left;
    }
    return X;
  }

  maximum() {
    let X: BSTNode<T, M> = this;
    while (X.right !== undefined) {
      X = X.right;
    }
    return X;
  }

  static minimum<G, S>(X: BSTNode<G, S>) {
    while (X.left !== undefined) {
      X = X.left;
    }
    return X;
  }

  static maximum<G, S>(X: BSTNode<G, S>) {
    while (X.right !== undefined) {
      X = X.right;
    }
    return X;
  }
}
