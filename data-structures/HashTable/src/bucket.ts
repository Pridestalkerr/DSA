import { CMP } from "@dsa/common";
import { List } from "@dsa/list";
import { RBTree } from "@dsa/rbtree";

const enum BucketType {
  EMPTY = 0,
  ONE = 1,
  LIST = 2,
}
type BucketData<T> = undefined | T | List<T>;

export class Bucket<T, M = {}> {
  protected __holds = BucketType.EMPTY;
  protected __data: BucketData<T>;
  protected __meta: M;

  // protected static __inserts = [
  //   Bucket.__insertIntoEmpty,
  //   Bucket.__insertIntoOne,
  //   Bucket.__insertIntoList,
  // ] as const;

  // protected static __removes = [];

  // protected static __insertIntoEmpty<T>(t: Bucket<T>, key: T) {
  //   t.__data = key;
  //   t.__holds = BucketType.ONE;
  // }

  // protected static __insertIntoOne<T>(t: Bucket<T>, key: T) {
  //   t.__data = new List([t.__data as T, key]);
  //   t.__holds = BucketType.LIST;
  // }

  // protected static __insertIntoList<T>(t: Bucket<T>, key: T) {
  //   (t.__data as List<T>).pushBack(key);
  // }

  // protected static removeFromEmpty<T>(t: Bucket<T>, key: T) {
  //   return undefined;
  // }

  // protected static removeFromOne<T>(t: Bucket<T>, key: T) {
  //   if (t.__data === key) {
  //     t.__holds = BucketType.EMPTY;
  //     return key;
  //   }
  //   return undefined;
  // }

  public get meta() {
    return this.__meta;
  }

  public set meta(meta: M) {
    this.__meta = meta;
  }

  constructor() {}

  public get empty() {
    return this.__holds === BucketType.EMPTY;
  }

  public get size() {
    switch (this.__holds) {
      case BucketType.EMPTY:
        return 0;
      case BucketType.ONE:
        return 1;
      case BucketType.LIST:
        return (this.__data as List<T>).length;
    }
  }

  public get length() {
    return this.size;
  }

  public insertUnique(key: T) {
    switch (this.__holds) {
      case BucketType.EMPTY:
        this.__data = key;
        this.__holds = BucketType.ONE;
        break;
      case BucketType.ONE:
        if (this.__data === key) {
          return;
        }
        this.__data = new List([this.__data as T, key]);
        this.__holds = BucketType.LIST;
        break;
      case BucketType.LIST:
        (this.__data as List<T>).pushBack(key);
        break;
    }
  }
}
