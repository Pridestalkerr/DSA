import { getDefaultCompare, HasDefaultCompare } from ".";
import { BSTNode } from "./BSTNode";
import { BSTreeBase } from "./BSTreeBase";

export class BSTree<T, M = {}> {
  protected header: BSTNode<T, M>; // should never call cmp on it
  protected get root() {
    return this.header.parent;
  }
  protected cmp: (a: T, b: T) => number;
  protected newMeta: () => M;
  protected length = 0;

  public _getInsertUniquePosition: ReturnType<typeof BSTreeBase.getInsertUniquePosition<T, M>>;
  public _lowerBound: ReturnType<typeof BSTreeBase.lowerBound<T, M>>;
  public _upperBound: ReturnType<typeof BSTreeBase.upperBound<T, M>>;
  public _insertAtPosition: typeof BSTreeBase.insertAtPosition<T, M>;
  public _eraseNode: typeof BSTreeBase.eraseNode<T, M>;

  constructor({ from, compare, descending, newMeta }: BSTreeConstructor<T> & { newMeta: () => M }) {
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

    // 2. Initialize header node
    this.newMeta = newMeta;
    this.header = new BSTNode(undefined as T, this.newMeta());

    // 3. Initialize helper functions
    this._getInsertUniquePosition = BSTreeBase.getInsertUniquePosition<T, M>(this.cmp);
    this._lowerBound = BSTreeBase.lowerBound<T, M>(this.cmp);
    this._upperBound = BSTreeBase.upperBound<T, M>(this.cmp);
    this._insertAtPosition = BSTreeBase.insertAtPosition<T, M>;
    this._eraseNode = BSTreeBase.eraseNode<T, M>;

    // 4. Populate tree with initial values
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

  public insertUnique(key: T): BSTNode<T, M> {
    const [X, didInsert] = this._insertUnique(key);
    if (didInsert) {
      this.length++;
    }
    return X;
  }

  public find(key: T): BSTNode<T, M> | undefined {
    const X = this.lowerBound(key);
    // console.log("LOWER BOUND OF: ", key, X);
    if (X === undefined || this.cmp(X.key, key) !== 0) return undefined; // not found
    return X;
  }

  public erase(key: T): BSTNode<T, M> | undefined {
    const X = this.find(key);
    if (X === undefined) return undefined;
    this._eraseNode(X, this.header);
    this.length--;
    return X;
  }

  public clear() {
    this.header.parent = undefined;
    this.header.left = undefined;
    this.header.right = undefined;
    this.length = 0;
  }

  public inOrderTraversal() {
    BSTreeBase.inOrderTraversal(this.header.parent, (n) => console.log(n.key));
  }

  // ===============================================
  // ===============mostly private==================
  // ===============================================

  public _insertUnique(key: T) {
    const [exists, P] = this.getInsertUniquePosition(key);
    if (exists) return [exists, false] as const;

    let insertLeft = false;
    if (P === this.header || this.cmp(key, P.key) < 0) {
      insertLeft = true;
    }

    const X = new BSTNode(key, this.newMeta());
    this.insertAtPosition(insertLeft, X, P);
    return [X, true] as const;
  }

  public insertAtPosition(insertLeft: boolean, X: BSTNode<T, M>, P: BSTNode<T, M>) {
    this._insertAtPosition(insertLeft, X, P, this.header);
  }

  public getInsertUniquePosition(key: T) {
    return this._getInsertUniquePosition(key, this.header);
  }

  public lowerBound(key: T): BSTNode<T, M> | undefined {
    return this._lowerBound(key, this.header);
  }

  public upperBound(key: T): BSTNode<T, M> | undefined {
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
  // newMeta: () => M; // meta initializer
};
