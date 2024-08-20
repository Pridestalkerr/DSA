import { CMP } from "@dsa/common";
import { BSTNode } from "./node";
import { BSTUtils } from "./utils";

export class BSTree<T, M = {}> {
  protected header: BSTNode<T, M>; // should never call cmp on it
  protected get root() {
    return this.header.parent;
  }
  protected cmp: CMP.CMP<T>;
  protected newMeta: () => M;
  protected length = 0;

  protected utils: InstanceType<typeof BSTUtils.Builder<T, M>>;

  constructor({ from, compare, descending, newMeta }: BSTreeConstructor<T> & { newMeta: () => M }) {
    const hasFrom = from !== undefined;
    const hasValues = hasFrom && from.length > 0;
    const hasCMP = compare !== undefined;

    // 1. Initialize cmp function
    let _cmp = compare;
    if (!hasCMP) {
      // see if we can infer it
      if (hasValues) {
        _cmp = CMP.getDefaultCompare(from[0]);
      } else {
        throw new Error("No compare function provided and could not infer one from the array");
      }
    }
    const sign = descending ? -1 : 1;
    this.cmp = (...args) => sign * _cmp!(...args);

    // 2. Initialize header node
    this.newMeta = newMeta;
    this.header = new BSTNode(undefined as T, this.newMeta());

    // 3. Initialize utils
    this.utils = new BSTUtils.Builder<T, M>(this.cmp);

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
    this.utils.eraseNode(X, this.header);
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
    this.utils.inOrderTraversal(this.header.parent, (n) => console.log(n.key));
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
    this.utils.insertAtPosition(insertLeft, X, P, this.header);
  }

  public getInsertUniquePosition(key: T) {
    return this.utils.getInsertUniquePosition(key, this.header);
  }

  public lowerBound(key: T): BSTNode<T, M> | undefined {
    return this.utils.lowerBound(key, this.header);
  }

  public upperBound(key: T): BSTNode<T, M> | undefined {
    return this.utils.upperBound(key, this.header);
  }
}

export type BSTreeConstructor<T> = (CMP.HasDefaultCompare<T> extends true
  ? // compare can be inferred from array values
    // if from is provided, we allow compare to be optional
    // if from is not provided, pass compare
    | {
          // dynamic array provided, could be empty so we cant infer
          from: T[];
          compare?: CMP.CMP<T>;
        }
      | {
          // static array initializer provided, we can infer compare
          from: [T, ...T[]];
          compare?: CMP.CMP<T>;
        }
      | {
          // if compare is provided, then from can be ommitted
          from?: T[];
          compare: CMP.CMP<T>;
        }
  : // compare cannot be inferred from array values, force pass compare, allow optional from
    {
      from?: T[];
      compare: CMP.CMP<T>;
    }) & {
  descending?: boolean;
};
