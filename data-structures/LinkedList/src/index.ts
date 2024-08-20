import { ListNodeIterator } from "./iterator";
import { ListNode } from "./node";

export class LinkedList<T> {
  // _header.prev is the first element
  // _header.next is the last element
  protected _header: ListNode<T> = new ListNode<T>(undefined as T);
  protected _size = 0;

  constructor(iterable?: Iterable<T>, mapFn?: (value: T) => T) {
    this._head = this._header;
    this._tail = this._header;
    if (iterable) {
      for (const elm of iterable) {
        this.pushBack(mapFn ? mapFn(elm) : elm);
      }
    }
  }

  // ======================================
  // ===========ELEMENT ACCESS=============
  // ======================================
  public front() {
    return this._header.next;
  }

  public back() {
    return this._header.prev;
  }

  // ======================================
  // ==============ITERATORS===============
  // ======================================
  public begin() {
    return new ListNodeIterator(this._header, this._head);
  }

  public rbegin() {
    return new ListNodeIterator(this._header, this._tail, true);
  }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public empty() {
    return this.size === 0;
  }

  public get size() {
    return this._size;
  }

  public get length() {
    return this.size;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public clear() {
    this._head = this._header;
    this._tail = this._header;
    this._size = 0;
  }

  public pushBack(data: T) {
    const node = new ListNode(data);
    this._header.insertBefore(node);
    this._size++;
  }

  public pushFront(data: T) {
    const node = new ListNode(data);
    this._header.insertAfter(node);
    this._size++;
  }

  public insertBefore(it: ListNodeIterator<T>, data: T) {
    const node = new ListNode(data);
    it.value.insertBefore(node);
    this._size++;
  }

  public insertAfter(it: ListNodeIterator<T>, data: T) {
    const node = new ListNode(data);
    it.value.insertAfter(node);
    this._size++;
  }

  // TODO: make these return
  public popBack() {
    if (this.empty()) {
      return;
    }
    this._tail.erase();
    this._size--;
  }
  public popFront() {
    if (this.empty()) {
      return;
    }
    this._head.erase();
    this._size--;
  }
  public erase(it: ListNodeIterator<T>) {
    if (it.done || !it.initialised) {
      return;
    }
    it.value.erase();
    this._size--;
  }

  [Symbol.iterator]() {
    return new ListNodeIterator(this._header, this._head);
  }

  private get _head() {
    return this._header.next!;
  }

  private set _head(node: ListNode<T>) {
    this._header.next = node;
  }

  private get _tail() {
    return this._header.prev!;
  }

  private set _tail(node: ListNode<T>) {
    this._header.prev = node;
  }
}
