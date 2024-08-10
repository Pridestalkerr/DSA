import { getDefaultCompare, HasDefaultCompare } from ".";
import { BSTNode } from "./BSTNode";
import { BSTHeader, BSTreeBase } from "./BSTreeBase";

export class BSTree<T> {
  protected header: BSTHeader<T> = new BSTNode<T>(undefined as T); // should never call cmp on it
  protected get root() {
    return this.header.parent;
  }
  protected cmp: (a: T, b: T) => number;
  protected length = 0;

  public _getInsertUniquePosition;
  public _lowerBound; // finds the first element that is not less than the key (<=)
  public _upperBound; // finds the first element that is greater than the key (>)
  public _insertAtPosition; // inserts a node at a given position
  public _eraseNode; // removes a node from the tree

  constructor({ from, compare, descending }: BSTreeConstructor<T>) {
    const hasFrom = from !== undefined;
    const hasValues = hasFrom && from.length > 0;
    const hasCMP = compare !== undefined;

    // 1. Initialize cmp function
    let _cmp = compare;
    if (!hasCMP) {
      // see if we can infer it
      if (hasValues) {
        _cmp = getDefaultCompare(from[0]);
      } else {
        throw new Error("No compare function provided and could not infer one from the array");
      }
    }
    const sign = descending ? -1 : 1;
    this.cmp = (...args) => sign * _cmp!(...args);

    // 2. Initialize helper functions
    this._getInsertUniquePosition = BSTreeBase.getInsertUniquePosition<T>(this.cmp);
    this._lowerBound = BSTreeBase.lowerBound<T>(this.cmp);
    this._upperBound = BSTreeBase.upperBound<T>(this.cmp);
    this._insertAtPosition = BSTreeBase.insertAtPosition<T>;
    this._eraseNode = BSTreeBase.eraseNode<T>;

    // 3. Populate tree with initial values
    if (hasValues) {
      for (const v of from) {
        this.insertUnique(v);
      }
    }

    return this;
  }

  get size() {
    return this.length;
  }

  public insertUnique(key: T) {
    const [X, didInsert] = this._insertUnique(key);
    if (didInsert) {
      this.length++;
    }
    return X;
  }

  public find(key: T) {
    const X = this.lowerBound(key);
    if (X === undefined || this.cmp(X.key, key) !== 0) return undefined; // not found
    return X;
  }

  public erase(key: T) {
    const X = this.find(key);
    if (X === undefined) return undefined;
    this._eraseNode(X, this.header);
    this.length--;
    return X;
  }

  // ===============================================
  // ===============mostly private==================
  // ===============================================

  public _insertUnique(key: T) {
    const [exists, P] = this.getInsertUniquePosition(key);
    if (exists) return [exists, false];

    let insertLeft = false;
    if (P === this.header || this.cmp(key, P.key) < 0) {
      insertLeft = true;
    }

    const X = new BSTNode<T>(key);
    this.insertAtPosition(insertLeft, X, P);
    return [X, true];
  }

  public insertAtPosition(insertLeft: boolean, X: BSTNode<T>, P: BSTNode<T>) {
    this._insertAtPosition(insertLeft, X, P, this.header);
  }

  public getInsertUniquePosition(key: T) {
    return this._getInsertUniquePosition(key, this.header);
  }

  public lowerBound(key: T) {
    return this._lowerBound(key, this.header);
  }

  public upperBound(key: T) {
    return this._upperBound(key, this.header);
  }
}

export type BSTreeConstructor<T> = (HasDefaultCompare<T> extends true
  ? // compare can be inferred from array values
    // if from is provided, we allow compare to be optional
    // if from is not provided, pass compare
    | {
          // dynamic array provided, could be empty so we cant infer
          from: T[];
          compare?: (a: T, b: T) => number;
        }
      | {
          // static array initializer provided, we can infer compare
          from: [T, ...T[]];
          compare?: (a: T, b: T) => number;
        }
      | {
          // if compare is provided, then from can be ommitted
          from?: T[];
          compare: (a: T, b: T) => number;
        }
  : // compare cannot be inferred from array values, force pass compare, allow optional from
    {
      from?: T[];
      compare: (a: T, b: T) => number;
    }) & {
  descending?: boolean;
};
