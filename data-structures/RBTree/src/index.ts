import { RBTree } from "./rbtree";

type Options<T> = {
  from: T[];
} & OptionalCMP<T>;

class OrderedSet<T> {
  protected cmp: (a: T, b: T) => number;
  protected rbtree: RBTree<T>;
  constructor({ from, compare }: Options<T>) {
    // TODO: this will fail if from is empty, typescript is limiting my power
    this.cmp = compare ?? getDefaultCompare(from[0]);
    this.rbtree = new RBTree({ from, cmp: this.cmp });
  }
  // TODO: iterators

  // capacity
  public empty() {
    return this.rbtree.empty();
  }
  public size() {
    return this.rbtree.size();
  }
  public maxSize() {
    return this.rbtree.maxSize();
  } // mostly for preallocating on the fly

  // modifiers
  public clear() {
    this.rbtree.clear();
  }
  // TODO: allow batch insert
  public insert(value: T) {
    this.rbtree.insert(value);
  }
  // TODO: deep copy of given elements (or reverse them)
  public emplace(value: T) {
    throw new Error("Not implemented");
  }
  public erase(valueOrLike: T | ((value: T) => boolean)) {
    if (typeof valueOrLike === "function") {
      return this.rbtree.eraseIf(valueOrLike);
    } else {
      return this.rbtree.erase(valueOrLike);
    }
  }

  // lookup
  public count() {} // allow counting with a given function
  public find() {} // allow finding specific value, or allow passing a function to return all elements like it
  public has(): boolean {
    return false; // allow passing of like function
  }
  public equalRange() {
    throw new Error("Not implemented");
  } // pass LIKE function to get more (default cmp returns only one)
  public lowerBound() {
    throw new Error("Not implemented");
  } // returns elements less than LIKE (or default cmp)
  public upperBound() {
    throw new Error("Not implemented");
  } // returns elements greater than LIKE (or default cmp)

  // set operations
  public merge() {
    throw new Error("Not implemented");
  } // merge two sets
  public intersect() {
    throw new Error("Not implemented");
  } // intersect two sets

  static merge() {
    throw new Error("Not implemented");
  } // merge two sets
  static intersect() {
    throw new Error("Not implemented");
  } // intersect two sets
}

export type CMP<T> = (a: T, b: T) => number;
export type OptionalCMP<T> = [T] extends [string]
  ? { compare?: CMP<T> }
  : [T] extends [number]
    ? { compare?: CMP<T> }
    : { compare: CMP<T> };

export type HasDefaultCompare<T> = [T] extends [string]
  ? true
  : [T] extends [number]
    ? true
    : false;

export const stringCompare: CMP<string> = (a, b): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const numberCompare: CMP<number> = (a, b): number => a - b;

export const getDefaultCompare = <T>(val: T) => {
  if (typeof val === "number") {
    return numberCompare as CMP<T>;
  } else if (typeof val === "string") {
    return stringCompare as CMP<T>;
  }
  throw new Error(`No default compare function for type ${typeof val}`);
};
