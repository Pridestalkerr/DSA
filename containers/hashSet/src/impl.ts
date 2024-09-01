import { HashTable } from "@dsa/hashtable";
import { CMP, Hash } from "@dsa/common";

export class HashSetBase<T> implements HashSetLike<T> {
  protected __table: HashTable<T>;
  constructor(
    keyType: DefaultKeys,
    options?: {
      from?: Iterable<T>;
      hashFn?: Hash.Fn<T>;
      equalsFn?: (a: T, b: T) => boolean;
    },
  ) {
    let from = options?.from;
    let hashFn = options?.hashFn;
    let equalsFn = options?.equalsFn;
    if (!hashFn) {
      switch (keyType) {
        case "string":
          hashFn = Hash.stringHash as Hash.Fn<T>;
          break;
        case "int32":
          hashFn = Hash.int32Hash as Hash.Fn<T>;
          break;
        case "number":
          hashFn = Hash.bigHash as Hash.Fn<T>;
          break;
        case "bigint":
          hashFn = Hash.bigHash as Hash.Fn<T>;
          break;
        case "other":
          throw new Error("hashFn must be provided for keyType 'other'");
      }
    }

    if (!equalsFn) {
      equalsFn = CMP.defaultEquals;
    }

    this.__table = new HashTable<T>(hashFn, equalsFn, from);
  }

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
    return this.__table.findFirst(key);
  }
  public contains(key: T) {
    return this.__table.contains(key);
  }
}

interface HashSetLike<T> {
  begin(): void; // bidirectional iterator is pointless, its unordered
  empty: boolean;
  size: number;
  length: number;
  clear(): void;
  insert(key: T): void;
  erase(key: T): T | undefined;
  find(key: T): T | undefined;
  contains(key: T): boolean;
}

export type DefaultKeys = "string" | "int32" | "number" | "bigint" | "other";

export interface HashSetConstructor {
  new (
    keyType: "string",
    opts?: {
      from?: Iterable<string>;
      hashFn?: Hash.Fn<string>;
      equalsFn?: CMP.EQ<string>;
    },
  ): HashSetLike<string>;
  new (
    keyType: "int32" | "number",
    opts?: {
      from?: Iterable<number>;
      hashFn?: Hash.Fn<number>;
      equalsFn?: CMP.EQ<number>;
    },
  ): HashSetLike<number>;
  new (
    keyType: "bigint",
    opts?: {
      from?: Iterable<bigint>;
      hashFn?: Hash.Fn<bigint>;
      equalsFn?: CMP.EQ<bigint>;
    },
  ): HashSetLike<number>;
  new <T>(
    keyType: "other",
    opts: {
      from?: Iterable<T>;
      hashFn: Hash.Fn<T>; // must be provided, we can add more overloads later
      equalsFn?: CMP.EQ<T>;
    },
  ): HashSetLike<T>;
}
