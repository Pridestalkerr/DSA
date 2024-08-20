import { List } from "@dsa/list";
import { RBTree } from "@dsa/rbtree";

const enum BucketType {
  EMPTY,
  ONE,
  ARRAY,
  LIST,
  TREE,
}

export class Bucket<T> {
  private _data: undefined | T | T[] | List<T> | RBTree<T>;
  private _holds: BucketType = BucketType.EMPTY;
  private _equals: (a: T, b: T) => boolean;
  //   private _cmp: (a: T, b: T) => number; // for tree
  private _MAX_ARRAY_SIZE = 8;
  private _MAX_LIST_SIZE = 32;

  constructor(equals?: (a: T, b: T) => boolean) {
    this._equals = equals ?? ((a, b) => a === b);
  }

  public insert(key: T) {
    switch (this._holds) {
      case BucketType.EMPTY:
        this._data = key;
        this._holds = BucketType.ONE;
        break;
      case BucketType.ONE:
        if (this._equals(this._data as T, key)) {
          return;
        } else {
          this._data = [this._data as T, key];
          this._holds = BucketType.ARRAY;
        }
        break;
      case BucketType.ARRAY:
        if ((this._data as T[]).length < this._MAX_ARRAY_SIZE) {
          (this._data as T[]).push(key);
        } else {
          // convert to list
          const list = new List<T>(this._data as T[]);
          list.pushBack(key);
          this._data = list;
          this._holds = BucketType.LIST;
        }
      //   case BucketType.TREE:
      //     (this._data as RBTree<T>).insert();
      //     break;
    }
  }

  public erase(key: T) {
    switch (this._holds) {
      case BucketType.EMPTY:
        break;
      case BucketType.ONE:
        if (this._equals(this._data as T, key)) {
          this._data = undefined;
          this._holds = BucketType.EMPTY;
        }
        break;
      //   case BucketType.TREE:
      //     (this._data as RBTree<T>).erase(key);
      //     break;
    }
  }
}
