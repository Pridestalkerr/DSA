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

  // TODO: implement this
  constructor(cmp: typeof this.cmp) {
    this.cmp = cmp;
    this._getInsertUniquePosition = BSTreeBase.getInsertUniquePosition<T>(this.cmp);
    this._lowerBound = BSTreeBase.lowerBound<T>(this.cmp);
    this._upperBound = BSTreeBase.upperBound<T>(this.cmp);
    this._insertAtPosition = BSTreeBase.insertAtPosition<T>;
    this._eraseNode = BSTreeBase.eraseNode<T>;
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
