export class BSTNode<T> {
  key: T;
  left: BSTNode<T> | undefined;
  right: BSTNode<T> | undefined;

  constructor(key: T) {
    this.key = key;
  }

  minimum() {
    let X: BSTNode<T> = this;
    while (X.left !== undefined) {
      X = X.left;
    }
    return X;
  }

  maximum() {
    let X: BSTNode<T> = this;
    while (X.right !== undefined) {
      X = X.right;
    }
    return X;
  }

  static minimum<G>(X: BSTNode<G>) {
    while (X.left !== undefined) {
      X = X.left;
    }
    return X;
  }

  static maximum<G>(X: BSTNode<G>) {
    while (X.right !== undefined) {
      X = X.right;
    }
    return X;
  }
}
