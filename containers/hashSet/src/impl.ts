import { HashTable } from "@dsa/hashtable";

export class HashSetBase<T> implements HashSetLike<T> {
  protected __table: HashTable<T>;
  constructor() {
    this.__table = new HashTable<T>();
  }

  // no need for other iterators, its unordered and unindexed
  public begin() {}

  public get empty() {
    return this.__table.empty;
  }
  public get size() {
    return this.__table.size;
  }
  public get length() {
    return this.__table.size;
  }

  public clear() {
    this.__table.clear();
  }
  public insert(key: T) {
    this.__table.insertUnique(key);
  }
  public erase(key: T) {
    return this.__table.eraseOne(key);
  }
  public find(key: T) {
    return this.__table.find(key);
  }
  public contains(key: T) {
    return this.__table.contains(key);
  }
}

interface HashSetLike<T> {
  empty: boolean;
  size: number;
  length: number;
  clear(): void;
  insert(key: T): void;
  erase(key: T): T;
  find(key: T): T;
  contains(key: T): boolean;
}

export interface HashSetConstructor {
  new <T>(): HashSetLike<T>;
}
