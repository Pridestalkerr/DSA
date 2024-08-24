import { CMP } from "@dsa/common";
import { BSTNode } from "./node";
import { BSTUtils } from "./utils";
import { BSTreeIterator } from "./iterator";

export class BSTree<T, M = {}> {
  public readonly __header: BSTNode<T, M>; // should never call cmp on it
  protected __cmp: CMP.CMP<T>;
  protected __newMeta: () => M;
  protected __length = 0;
  protected __utils: InstanceType<typeof BSTUtils.Builder<T, M>>;

  constructor({ from, compare, descending, newMeta }: BSTreeConstructor<T> & { newMeta: () => M }) {
    const hasFrom = from !== undefined;
    const hasValues = hasFrom && from.length > 0;
    const hasCMP = compare !== undefined;

    // 1. Initialize cmp function
    let cmp = compare;
    if (!hasCMP) {
      // see if we can infer it
      if (hasValues) {
        cmp = CMP.getDefaultCompare(from[0]);
      } else {
        throw new Error("No compare function provided and could not infer one from the array");
      }
    }
    const sign = descending ? -1 : 1;
    this.__cmp = (...args) => sign * cmp!(...args);

    // 2. Initialize header node
    this.__newMeta = newMeta;
    this.__header = new BSTNode(undefined as T, this.__newMeta());
    // this.__header.parent = this.__header;
    // this.__header.left = this.__header;
    // this.__header.right = this.__header;

    // 3. Initialize utils
    this.__utils = new BSTUtils.Builder<T, M>(this.__cmp);

    // 4. Populate tree with initial values
    if (hasValues) {
      for (const v of from) {
        this.insertUnique(v);
      }
    }

    return this;
  }

  // ======================================
  // ==============ITERATORS===============
  // ======================================
  public begin() {
    return new BSTreeIterator(this.__header, this.leftmost);
  }

  public rbegin() {
    return new BSTreeIterator(this.__header, this.rightmost, true);
  }

  [Symbol.iterator]() {
    return this.begin();
  }

  public inOrderTraversal(callback: (node: BSTNode<T, M>) => void = console.log) {
    this.__utils.inOrderTraversal(this.__header.parent, (n) => callback(n));
  }

  public preOrderTraversal(callback: (node: BSTNode<T, M>) => void = console.log) {
    this.__utils.preOrderTraversal(this.__header.parent, (n) => callback(n));
  }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public empty() {
    return this.__length === 0;
  }

  get size() {
    return this.__length;
  }

  get length() {
    return this.__length;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public clear() {
    this.__header.parent = undefined;
    this.__header.left = undefined;
    this.__header.right = undefined;
    this.__length = 0;
  }

  public insertUnique(key: T): BSTNode<T, M> {
    const [X, didInsert] = this.__insertUnique(key);
    if (didInsert) {
      this.__length++;
    }
    return X;
  }

  public erase(key: T): BSTNode<T, M> | undefined {
    const X = this.find(key);
    if (X === undefined) return undefined;
    this.__utils.eraseNode(X, this.__header);
    this.__length--;
    return X;
  }

  // ======================================
  // ===============LOOKUP=================
  // ======================================
  public find(key: T): BSTNode<T, M> | undefined {
    const X = this.lowerBound(key);
    if (X === undefined || this.__cmp(X.key, key) !== 0) return undefined; // not found
    return X;
  }

  public contains(key: T) {
    return this.find(key) !== undefined;
  }

  public lowerBound(key: T): BSTNode<T, M> | undefined {
    return this.__utils.lowerBound(key, this.__header);
  }

  public upperBound(key: T): BSTNode<T, M> | undefined {
    return this.__utils.upperBound(key, this.__header);
  }

  public inorderSuccessor(node: BSTNode<T, M>): BSTNode<T, M> | undefined {
    return this.__utils.inorderSuccessor(node, this.__header);
  }

  public postorderSuccessor(node: BSTNode<T, M>): BSTNode<T, M> | undefined {
    return this.__utils.postorderSuccessor(node, this.__header);
  }

  // ======================================
  // ===============PRIVATE================
  // ======================================
  protected get root() {
    return this.__header.parent!;
  }
  protected get leftmost() {
    return this.__header.left!;
  }
  protected get rightmost() {
    return this.__header.right!;
  }

  protected __insertUnique(key: T) {
    const [exists, P] = this.__getInsertUniquePosition(key);
    if (exists) return [exists, false] as const;

    let insertLeft = false;
    if (P === this.__header || this.__cmp(key, P.key) < 0) {
      insertLeft = true;
    }

    const X = new BSTNode(key, this.__newMeta());
    this.__insertAtPosition(insertLeft, X, P);
    return [X, true] as const;
  }

  protected __insertAtPosition(insertLeft: boolean, X: BSTNode<T, M>, P: BSTNode<T, M>) {
    this.__utils.insertAtPosition(insertLeft, X, P, this.__header);
  }

  protected __getInsertUniquePosition(key: T) {
    return this.__utils.getInsertUniquePosition(key, this.__header);
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
