import { HeapUtils } from "./utils";

export class Heap<T> {
  protected tree: T[] = [];
  protected utils: InstanceType<typeof HeapUtils.Builder<T>>;
  protected cmp: (a: T, b: T) => number;

  constructor({
    from,
    compare,
  }: {
    from: Parameters<typeof Array.from>;
    compare: (a: T, b: T) => number;
  }) {
    this.cmp = compare;
    this.tree = Array.from(from);
    this.utils = new HeapUtils.Builder(this.cmp);
  }

  public push(value: T) {
    this.utils.pushHeap(this.tree, value);
  }

  public pop() {
    return this.utils.popHeap(this.tree);
  }

  public get size() {
    return this.tree.length;
  }

  public get empty() {
    return this.tree.length === 0;
  }

  public clear() {
    this.tree = [];
  }

  public peek() {
    return this.tree[0] ?? undefined;
  }
}

// HeapUtils
