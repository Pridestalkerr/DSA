import { ListNode } from "./node";

// Bidirectional iterator for ListNode
export class ListNodeIterator<T> implements Iterator<ListNode<T>> {
  private _header: ListNode<T>;
  private _current: ListNode<T>;
  public reverse: boolean;
  public initialised = false;
  private _next: () => ListNodeIterator<T>;
  private _prev: () => ListNodeIterator<T>;
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
}
