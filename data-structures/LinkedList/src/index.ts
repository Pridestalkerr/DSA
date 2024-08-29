import { ListNodeBidirectionalIterator, ListNodeIterator } from "./iterator";
import { ListNode } from "./node";

export class LinkedList<T> {
  // __header.prev is the first element
  // __header.next is the last element
  protected __header: ListNode<T> = new ListNode<T>(undefined as T);
  protected __size = 0;

  constructor(iterable?: Iterable<T>, mapFn?: (value: T) => T) {
    this.__head = this.__header;
    this.__tail = this.__header;
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
    return this.__header.next;
  }

  public back() {
    return this.__header.prev;
  }

  // ======================================
  // ==============ITERATORS===============
  // ======================================
  public begin() {
    return new ListNodeIterator(this.__header, this.__head);
  }

  public rbegin() {
    return new ListNodeIterator(this.__header, this.__tail, true);
  }

  // TODO: better naming
  public beginBidirectional() {
    return new ListNodeBidirectionalIterator(this.__header, this.__head);
  }

  public rbeginBidirectional() {
    return new ListNodeBidirectionalIterator(this.__header, this.__tail, true);
  }

  [Symbol.iterator]() {
    return this.begin();
  }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public get empty() {
    return this.size === 0;
  }

  public get size() {
    return this.__size;
  }

  public get length() {
    return this.__size;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public clear() {
    this.__head = this.__header;
    this.__tail = this.__header;
    this.__size = 0;
  }

  public pushBack(data: T) {
    const node = new ListNode(data);
    this.__header.insertBefore(node);
    this.__size++;
  }

  public pushFront(data: T) {
    const node = new ListNode(data);
    this.__header.insertAfter(node);
    this.__size++;
  }

  public insertBefore(it: ListNodeIterator<T> | ListNodeBidirectionalIterator<T>, data: T) {
    const node = new ListNode(data);
    it.value.insertBefore(node);
    this.__size++;
  }

  public insertAfter(it: ListNodeIterator<T> | ListNodeBidirectionalIterator<T>, data: T) {
    const node = new ListNode(data);
    it.value.insertAfter(node);
    this.__size++;
  }

  // TODO: make these return
  public popBack() {
    if (this.empty()) {
      return;
    }
    this.__tail.erase();
    this.__size--;
  }
  public popFront() {
    if (this.empty()) {
      return;
    }
    this.__head.erase();
    this.__size--;
  }
  public erase(it: ListNodeIterator<T> | ListNodeBidirectionalIterator<T>) {
    if (it.done) {
      return;
    }
    it.value.erase();
    this.__size--;
  }

  protected get __head() {
    return this.__header.next!;
  }

  protected set __head(node: ListNode<T>) {
    this.__header.next = node;
  }

  protected get __tail() {
    return this.__header.prev!;
  }

  protected set __tail(node: ListNode<T>) {
    this.__header.prev = node;
  }
}
