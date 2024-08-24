import { RBTree } from "@dsa/rbtree";
import { SetIterator } from "./iterator";
import { type CMP } from "@dsa/common";

export class Set<T> {
  protected __tree: RBTree<T>;

  constructor(opt: CMP.From<T>) {
    this.__tree = new RBTree(opt);
  }

  // ======================================
  // ==============ITERATORS===============
  // ======================================
  public begin() {
    return new SetIterator(this.__tree.__header, this.__tree.__leftmost);
  }

  public rbegin() {
    return new SetIterator(this.__tree.__header, this.__tree.__rightmost, true);
  }

  [Symbol.iterator]() {
    return this.begin();
  }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public empty() {
    return this.__tree.size === 0;
  }

  public size() {
    return this.__tree.size;
  }

  public length() {
    return this.__tree.size;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public clear() {
    this.__tree.clear();
  }

  public insert(key: T) {
    return this.__tree.insertUnique(key);
  }

  public erase(key: T) {
    return this.__tree.erase(key)?.key;
  }

  // ======================================
  // ===============LOOKUP=================
  // ======================================
  public find(key: T) {
    return this.__tree.find(key)?.key;
  }

  public contains(key: T) {
    return this.__tree.contains(key);
  }

  public lowerBound(key: T) {
    return this.__tree.lowerBound(key)?.key;
  }

  public upperBound(key: T) {
    return this.__tree.upperBound(key)?.key;
  }
}
