export class Stack<T> {
  private _stack: T[] = [];

  constructor();
  constructor(iterable: Iterable<T>);
  // TODO: https://github.com/microsoft/TypeScript/issues/54157
  // constructor(iterable: Iterable<unknown>, mapFn: (value: unknown) => T);

  // TODO: add ownership transfer
  constructor(...args: unknown[]) {
    if (args.length === 0) {
      return;
    } else if (args.length === 1) {
      this._stack = Array.from(args[0] as Iterable<T>);
      return;
    }

    throw new Error("Stack: Invalid arguments");
  }

  // ======================================
  // ============ELEMENT ACCESS============
  // ======================================
  public top() {
    return this._stack[this._stack.length - 1];
  }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public get empty() {
    return this._stack.length === 0;
  }

  public get size() {
    return this._stack.length;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public push(...args: Parameters<Array<T>["push"]>) {
    this._stack.push(...args);
  }

  public pop() {
    return this._stack.pop();
  }
}
