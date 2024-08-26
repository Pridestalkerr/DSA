import { ListNode } from "./node";

export class ListNodeIterator<T> implements Iterator<ListNode<T>> {
  protected __header: ListNode<T>;
  protected __current: ListNode<T>;
  protected __initialized = false;
  protected __reverse: boolean;

  constructor(header: ListNode<T>, node: ListNode<T>, reverse = false) {
    this.__header = header;
    this.__current = node;
    this.__reverse = reverse;
  }

  public get done() {
    return this.__current === this.__header;
  }

  public get value() {
    return this.__current;
  }

  public next() {
    // TODO: finding a way to remove these if checks would be great
    // unfortunately, we cant reassing the next method, as it would break the iterator
    // for variables who cached the value of next and call it repeatedly
    if (!this.__initialized) {
      this.__initialized = true;
      return this;
    }

    if (this.__reverse) {
      this.__current = this.__current.prev!;
    } else {
      this.__current = this.__current.next!;
    }
    return this;
  }
}

// Bidirectional iterator for ListNode
export class ListNodeBidirectionalIterator<T> implements Iterator<ListNode<T>> {
  private _header: ListNode<T>;
  private _current: ListNode<T>;
  public reverse: boolean;
  public initialised = false;
  private _next: () => ListNodeBidirectionalIterator<T>;
  private _prev: () => ListNodeBidirectionalIterator<T>;
  private _canNext = true;
  private _canPrev = true;

  public get canNext() {
    return this._canNext;
  }

  public get canPrev() {
    return this._canPrev;
  }

  constructor(header: ListNode<T>, node: ListNode<T>, reverse = false) {
    this._header = header;
    this._current = node;
    this.reverse = reverse;
    this._next = reverse ? this._prevImpl : this._nextImpl;
    this._prev = reverse ? this._nextImpl : this._prevImpl;
  }

  public get done() {
    return this._current === this._header;
  }

  public get value() {
    return this._current as ListNode<T>;
  }

  public next() {
    return this._next();
  }

  public prev() {
    return this._prev();
  }

  private _nextImpl() {
    if (!this.initialised) {
      this.initialised = true;
      return this;
    }
    // TODO: remove the throws and if checks, the user should take care of usage
    if (this.done && !this._canNext) {
      throw new Error("ListNodeIterator: cannot move past end");
    }

    this._canPrev = true;
    this._current = this._current.next!;
    this._canNext = this._current !== this._header;
    return this;
  }

  private _prevImpl() {
    if (!this.initialised) {
      this.initialised = true;
      return this;
    }
    if (this.done && !this._canPrev) {
      throw new Error("ListNodeIterator: cannot move past end");
    }

    this._canNext = true;
    this._current = this._current.prev!;
    this._canPrev = this._current !== this._header;
    return this;
  }

  [Symbol.iterator]() {
    return this;
  }
}
