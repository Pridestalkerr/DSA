import { BSTNode } from "./node";
import { BSTUtils } from "./utils";
/**
 * @description Iterator for BSTree (or trees in general).
 * Full traversal is O(n+h) where h is the height of the tree.
 * Next and Prev are O(h) operations at worst (ammortized O(1)).
 */
export class BSTreeIterator<T, M = {}> {
  private _header: BSTNode<T, M>;
  private _current: BSTNode<T, M>;
  public reverse: boolean;
  public initialised = false;
  private _next: () => BSTreeIterator<T, M>;
  private _prev: () => BSTreeIterator<T, M>;
  private _canNext = true;
  private _canPrev = true;

  public get canNext() {
    return this._canNext;
  }

  public get canPrev() {
    return this._canPrev;
  }

  constructor(header: BSTNode<T, M>, node: BSTNode<T, M>, reverse = false) {
    this._header = header;
    this._current = node;
    this.reverse = reverse;
    this._next = reverse ? this._prevImpl : this._nextImpl;
    this._prev = reverse ? this._nextImpl : this._prevImpl;
  }

  public get done() {
    return this._current === this._header;
  }

  public get value() {
    return this._current as BSTNode<T, M>;
  }

  public next() {
    return this._next();
  }

  public prev() {
    return this._prev();
  }

  private _nextImpl() {
    if (!this.initialised) {
      this.initialised = true;
      return this;
    }
    if (this.done && !this._canNext) {
      throw new Error("BSTreeIterator: cannot move past end");
    }

    this._canPrev = true;

    if (this.done) {
      // it means current node is the header
      // but we can still iterate apparently
      this._current = this._header.left!;
      return this;
    }

    this._current = BSTUtils.inorderSuccessor(this._current, this._header);
    this._canNext = this._current !== this._header;
    return this;
  }

  private _prevImpl() {
    if (!this.initialised) {
      this.initialised = true;
      return this;
    }
    if (this.done && !this._canPrev) {
      throw new Error("BSTreeIterator: cannot move past end");
    }

    this._canNext = true;

    if (this.done) {
      // it means current node is the header
      // but we can still iterate apparently
      this._current = this._header.right!;
      return this;
    }

    this._current = BSTUtils.postorderSuccessor(this._current, this._header);
    this._canPrev = this._current !== this._header;
    return this;
  }

  [Symbol.iterator]() {
    return this;
  }
}
