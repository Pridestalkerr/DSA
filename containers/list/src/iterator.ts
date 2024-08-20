import { ListNodeIterator } from "@dsa/linkedlist/src/iterator";

export class ListIterator<T> {
  protected _iterator: ListNodeIterator<T>;
  constructor(iterator: ListNodeIterator<T>) {
    this._iterator = iterator;
  }

  public get done() {
    return this._iterator.done;
  }

  public get value() {
    return this._iterator.value.data;
  }

  public next() {
    this._iterator.next();
    return this;
  }

  public prev() {
    this._iterator.prev();
    return this;
  }

  public [Symbol.iterator]() {
    return this;
  }

  /**
   * @internal
   */
  public get __iterator() {
    return this._iterator;
  }
}
