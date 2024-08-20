import { LinkedList } from "@dsa/linkedlist";
import { ListIterator } from "./iterator";
export * from "./iterator";

export class List<T> {
  private _list: LinkedList<T> = new LinkedList<T>();

  constructor();
  constructor(iterable: Iterable<T>);
  constructor(iterable: Iterable<unknown>, mapFn: (value: unknown) => T);
  constructor(...args: unknown[]) {
    if (args.length === 0) {
      this._list = new LinkedList<T>();
    } else if (args.length === 1) {
      const iterable = args[0] as Iterable<T>;
      for (const elm of iterable) {
        this._list.pushBack(elm);
      }
    } else {
      const [iterable, mapFn] = args as [Iterable<unknown>, (value: unknown) => T];
      for (const elm of iterable) {
        this._list.pushBack(mapFn(elm));
      }
    }
  }

  // ======================================
  // ===========ELEMENT ACCESS=============
  // ======================================
  public front() {
    return this._list.front()?.data;
  }

  public back() {
    return this._list.back()?.data;
  }

  // ======================================
  // ==============ITERATORS===============
  // ======================================
  public begin() {
    return new ListIterator(this._list.begin());
  }

  public rbegin() {
    return new ListIterator(this._list.rbegin());
  }

  [Symbol.iterator]() {
    return this.begin();
  }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public empty() {
    return this._list.empty();
  }

  public get size() {
    return this._list.size;
  }

  public get length() {
    return this._list.length;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public clear() {
    this._list.clear();
  }

  public insertBefore(it: ListIterator<T>, data: T) {
    this._list.insertBefore(it.__iterator, data);
  }

  public insertAfter(it: ListIterator<T>, data: T) {
    this._list.insertAfter(it.__iterator, data);
  }

  public erase(it: ListIterator<T>) {
    this._list.erase(it.__iterator);
  }

  public pushBack(data: T) {
    this._list.pushBack(data);
  }

  public popBack() {
    this._list.popBack();
  }

  public pushFront(data: T) {
    this._list.pushFront(data);
  }

  public popFront() {
    this._list.popFront();
  }

  // ======================================
  // =============Operations===============
  // ======================================
  public sort(cmp: (a: T, b: T) => number) {
    // TODO: implement list sort
    throw new Error("Method not implemented.");
  }
  // TODO: rest https://en.cppreference.com/w/cpp/container/list
}

const x = new List<number>();
x;
