import { BSTNode } from "./BSTNode";

export type BSTHeader<T> = BSTNode<T>;

export class BSTreeBase {
  public static root<T>(header: BSTHeader<T>): BSTNode<T> | undefined {
    return header.parent;
  }

  /**
   * @internal Find the expected parent node of the not yet inserted key. To be used for trees with unique keys.
   * @returns [node, undefined] if the key already exists, node is the existing node
   * @returns [undefined, trail] if the key does not exist, trail is the parent node
   **/
  public static getInsertUniquePosition =
    <T>(cmp: (a: T, b: T) => number) =>
    (key: T, header: BSTHeader<T>): [BSTNode<T>, undefined] | [undefined, BSTNode<T>] => {
      const root = header.parent;
      let X = root;
      let trail = header;
      while (X !== undefined) {
        trail = X;
        const cmpResult = cmp(key, X.key);
        if (cmpResult === 0) {
          return [X, undefined];
        }
        X = cmpResult < 0 ? X.left : X.right;
      }
      return [undefined, trail];
    };

  /**
   * Find the expected parent node of the not yet inserted key.
   * To be used for trees with duplicate keys.
   * @internal
   * Not yet implemented
   **/
  public static getInsertDuplicatePosition =
    <T>(cmp: (a: T, b: T) => number) =>
    (key: T, header: BSTHeader<T>): [BSTNode<T>, undefined] | [undefined, BSTNode<T>] => {
      throw new Error("Method not implemented.");
    };

  public static lowerBound =
    <T>(cmp: (a: T, b: T) => number) =>
    (key: T, header: BSTHeader<T>): BSTNode<T> | undefined => {
      let X = BSTreeBase.root(header);
      let bound: BSTNode<T> | undefined = undefined;
      while (X !== undefined) {
        const cmpResult = cmp(X.key, key);
        if (cmpResult < 0) {
          X = X.right;
        } else if (cmpResult > 0) {
          bound = X;
          X = X.left;
        } else {
          return X;
        }
      }
      return bound;
    };

  public static upperBound =
    <T>(cmp: (a: T, b: T) => number) =>
    (key: T, header: BSTHeader<T>): BSTNode<T> | undefined => {
      let X = BSTreeBase.root(header);
      let bound: BSTNode<T> | undefined = undefined;
      while (X !== undefined) {
        const cmpResult = cmp(X.key, key);
        if (cmpResult <= 0) {
          X = X.right;
        } else {
          bound = X;
          X = X.left;
        }
      }
      return bound;
    };

  public static insertAtPosition<T>(
    insertLeft: boolean,
    X: BSTNode<T>,
    P: BSTNode<T>,
    header: BSTHeader<T>,
  ) {
    if (insertLeft) {
      P.left = X;
      if (P === header) {
        // X is root, link header to it (left link done above already)
        header.parent = X;
        header.right = X;
      } else if (P === header.left) {
        header.left = X; // maintain the leftmost node
      }
      X.parent = P;
    } else {
      P.right = X;
      if (P === header.right) {
        header.right = X; // maintain the rightmost node
      }
      X.parent = P;
    }
  }

  public static eraseNode<T>(Z: BSTNode<T>, header: BSTHeader<T>) {
    let Y = Z;
    let X = undefined;

    if (Z.left === undefined) {
      // Z has no left child, place its right subtree in place of Z
      X = Z.right;
      BSTreeBase.transplant(Z, Z.right, header);
    } else if (Z.right === undefined) {
      // Z has no right child, place its left subtree in place of Z
      X = Z.left;
      BSTreeBase.transplant(Z, Z.left, header);
    } else {
      // Z has two children, find the successor
      Y = Z.minimum();
      X = Y.right;

      if (Y.parent === Z) {
        // Y is the right child of Z, so X is Y's right child
        if (X !== undefined) {
          X.parent = Y;
        }
      } else {
        // Y is not the right child of Z, so replace Y with its right child
        BSTreeBase.transplant(Y, Y.right, header);
        Y.right = Z.right;
        Y.right.parent = Y;
      }

      // replace Z with Y
      BSTreeBase.transplant(Z, Y, header);
      Y.left = Z.left;
      Y.left.parent = Y;
    }

    if (header.left === Z) {
      if (Z.right === undefined) {
        header.left = Z.parent;
      } else {
        header.left = X!.minimum(); // TODO: is this safe?
      }
    }
    if (header.right === Z) {
      if (Z.left === undefined) {
        header.right = Z.parent;
      } else {
        header.right = X!.maximum(); // TODO: is this safe?
      }
    }

    return Z;
  }

  // place V's subtree in place of U's subtree, all data is lost in U's subtree
  // can also be used to splice subtrees or nodes by passing undefined as V
  public static transplant<T>(U: BSTNode<T>, V: BSTNode<T> | undefined, header: BSTHeader<T>) {
    type Safe = BSTNode<T>;
    const root = header.parent;
    if (U === root) {
      // set V as the root
      header.parent = V;
    } else if (U === (U.parent as Safe).left) {
      // U is not the root, so it safe to dereference
      // U is a left child, so set V as the left child of U's parent
      (U.parent as Safe).left = V;
    } else {
      // U is a right child, so set V as the right child of U's parent
      (U.parent as Safe).right = V;
    }
    if (V !== undefined) {
      // set V's parent to U's parent
      V.parent = U.parent;
    }
  }
}
