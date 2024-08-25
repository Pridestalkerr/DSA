export class StackBase<T> implements StackLike<T> {
  private __stack: T[] = [];

  constructor();
  constructor(iterable: Iterable<T>);
  constructor(iterable: Iterable<unknown>, mapFn: (value: unknown) => T);

  // TODO: add ownership transfer
  constructor(...args: unknown[]) {
    if (args.length === 0) {
      return;
    } else if (args.length === 1) {
      this.__stack = Array.from(args[0] as Iterable<T>);
      return;
    } else if (args.length === 2) {
      const [iterable, mapFn] = args as [Iterable<unknown>, (value: unknown) => T];
      this.__stack = Array.from(iterable, mapFn);
      return;
    }

    throw new Error("Stack: Invalid arguments");
  }

  // ======================================
  // ============ELEMENT ACCESS============
  // ======================================
  public top() {
    return this.__stack[this.__stack.length - 1];
  }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public get empty() {
    return this.__stack.length === 0;
  }

  public get size() {
    return this.__stack.length;
  }

  public get length() {
    return this.__stack.length;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public push(...args: Parameters<Array<T>["push"]>) {
    this.__stack.push(...args);
  }

  public pop() {
    return this.__stack.pop();
  }
}

export interface StackLike<T> {
  push(item: T): void;
  pop(): T | undefined;
  top(): T | undefined;
  empty: boolean;
  size: number;
}

export interface StackConstructor {
  new <T>(): StackBase<T>;
  new <T>(iterable: Iterable<T>): StackBase<T>;
}
