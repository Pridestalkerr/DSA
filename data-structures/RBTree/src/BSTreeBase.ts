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
    } else {
      P.right = X;
      if (P === header.right) {
        header.right = X; // maintain the rightmost node
      }
    }
  }
}
