import { HashTable } from "@dsa/hashtable";
import { CMP, Hash } from "@dsa/common";

export class HashSetBase<T> implements HashSetLike<T> {
  protected __table: HashTable<T>;
  constructor(
    keyType: DefaultKeys,
    options?: {
      from?: Iterable<T>;
      hashFn?: (key: T, cap: number) => number;
      equalsFn?: (a: T, b: T) => boolean;
    },
  ) {
    let from = options?.from;
    let hashFn = options?.hashFn;
    let equalsFn = options?.equalsFn;
    if (!hashFn) {
      switch (keyType) {
        case "string":
          hashFn = Hash.stringHash as (key: T, cap: number) => number;
          break;
        case "int32":
          hashFn = Hash.int32Hash as (key: T, cap: number) => number;
          break;
        case "number":
          hashFn = Hash.bigHash as (key: T, cap: number) => number;
          break;
        case "bigint":
          hashFn = Hash.bigHash as (key: T, cap: number) => number;
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
  // these have a default hash function
  // how to postpone the retrieval of that function
  // so that the user doesnt have to pass it explicitly everytime?
  // i dont like adding an if statement to the insert function, it worsens performance
  new (
    keyType: "string",
    opts?: {
      from?: Iterable<string>;
      hashFn?: (key: string, cap: number) => number;
      equalsFn?: (a: string, b: string) => boolean;
    },
  ): HashSetLike<string>;
  new (
    keyType: "int32" | "number",
    opts?: {
      from?: Iterable<number>;
      hashFn?: (key: number, cap: number) => number;
      equalsFn?: (a: number, b: number) => boolean;
    },
  ): HashSetLike<number>;
  new (
    keyType: "bigint",
    opts?: {
      from?: Iterable<bigint>;
      hashFn?: (key: bigint, cap: number) => number;
      equalsFn?: (a: bigint, b: bigint) => boolean;
    },
  ): HashSetLike<number>;
  new <T>(
    keyType: "other",
    opts: {
      from?: Iterable<T>;
      hashFn: (key: T, cap: number) => number; // muyst be provided, we can add more overloads later
      equalsFn?: (a: T, b: T) => boolean;
    },
  ): HashSetLike<T>;
}
