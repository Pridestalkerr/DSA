import { BSTNode } from "./node";
import { BSTUtils } from "./utils";
import { type BidirectionalIterator } from "@dsa/interface";

/**
 * @description Iterator for BSTree (or binary trees in general).
 * Full traversal is O(n+h) where h is the height of the tree.
 * Next and Prev are O(h) operations at worst (ammortized O(1)).
 */
export class BSTreeIterator<T, M = {}> implements BidirectionalIterator<BSTNode<T, M>> {
  protected __header: BSTNode<T, M>;
  protected __current: BSTNode<T, M>;
  protected __reverse: boolean;
  protected __initialized = false;
  protected __canNext = true;
  protected __canPrev = true;
  protected __next: () => BSTreeIterator<T, M>;
  protected __prev: () => BSTreeIterator<T, M>;

  constructor(header: BSTNode<T, M>, node: BSTNode<T, M>, reverse = false) {
    this.__header = header;
    this.__current = node;
    this.__reverse = reverse;
    this.__next = reverse ? this.__prevImpl : this.__nextImpl;
    this.__prev = reverse ? this.__nextImpl : this.__prevImpl;
  }

  // ======================================
  // ==============GETTERS=================
  // ======================================
  public get value() {
    return this.__current as BSTNode<T, M>;
  }

  public get reverse() {
    return this.__reverse;
  }

  public get initialized() {
    return this.__initialized;
  }

  public get canNext() {
    return this.__canNext;
  }

  public get canPrev() {
    return this.__canPrev;
  }

  public get done() {
    return this.__current === this.__header;
  }

  // ======================================
  // ==============STEPPER=================
  // ======================================
  public next() {
    return this.__next();
  }

  public prev() {
    return this.__prev();
  }

  [Symbol.iterator]() {
    return this;
  }

  // ======================================
  // ==============PRIVATE=================
  // ======================================
  protected __nextImpl() {
    if (!this.__initialized) {
      this.__initialized = true;
      return this;
    }
    if (this.done && !this.__canNext) {
      throw new Error("BSTreeIterator: cannot move past end");
    }

    this.__canPrev = true;

    if (this.done) {
      this.__current = this.__header.left!;
      return this;
    }

    this.__current = BSTUtils.inorderSuccessor(this.__current, this.__header);
    this.__canNext = this.__current !== this.__header;
    return this;
  }

  protected __prevImpl() {
    if (!this.__initialized) {
      this.__initialized = true;
      return this;
    }
    if (this.done && !this.__canPrev) {
      throw new Error("BSTreeIterator: cannot move past end");
    }

    this.__canNext = true;

    if (this.done) {
      this.__current = this.__header.right!;
      return this;
    }

    this.__current = BSTUtils.postorderSuccessor(this.__current, this.__header);
    this.__canPrev = this.__current !== this.__header;
    return this;
  }
}
