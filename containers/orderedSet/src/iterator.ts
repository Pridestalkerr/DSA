import { type BidirectionalIterator } from "@dsa/interface";
import { RBTreeIterator, RBTreeNode } from "@dsa/rbtree";

export class SetIterator<T> implements BidirectionalIterator<T> {
  protected __iterator: RBTreeIterator<T>;
  constructor(header: RBTreeNode<T>, node: RBTreeNode<T>, reverse = false) {
    this.__iterator = new RBTreeIterator(header, node, reverse);
  }

  // ======================================
  // ==============GETTERS=================
  // ======================================
  public get value() {
    return this.__iterator.value.key;
  }

  public get reverse() {
    return this.__iterator.reverse;
  }

  public get initialized() {
    return this.__iterator.initialized;
  }

  public get canNext() {
    return this.__iterator.canNext;
  }

  public get canPrev() {
    return this.__iterator.canPrev;
  }

  public get done() {
    return this.__iterator.done;
  }

  // ======================================
  // ==============STEPPER=================
  // ======================================
  public next() {
    this.__iterator.next();
    return this;
  }

  public prev() {
    this.__iterator.prev();
    return this;
  }

  [Symbol.iterator]() {
    return this;
  }
}
