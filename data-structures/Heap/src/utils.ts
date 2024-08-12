export namespace HeapUtils {
  export const left = (pos: number) => 2 * pos + 1;
  export const right = (pos: number) => 2 * pos + 2;
  export const parent = (pos: number) => Math.floor((pos - 1) / 2);

  export class Builder<T> {
    private cmp: (a: T, b: T) => number;

    constructor(cmp: (a: T, b: T) => number) {
      this.cmp = cmp;
    }

    public makeHeap = (tree: T[]) => {
      for (let i = Math.floor(tree.length / 2) - 1; i >= 0; i--) {
        this.heapifyDown(tree, i);
      }
    };

    public heapifyDown = (tree: T[], pos: number) => {
      const n = tree.length;

      while (true) {
        let largest = pos;
        const left = HeapUtils.left(pos);
        const right = HeapUtils.right(pos);

        if (left < n && this.cmp(tree[left]!, tree[largest]!) > 0) {
          largest = left;
        }

        if (right < n && this.cmp(tree[right]!, tree[largest]!) > 0) {
          largest = right;
        }

        if (largest === pos) {
          break;
        }

        [tree[pos]!, tree[largest]!] = [tree[largest]!, tree[pos]!];
        pos = largest;
      }
    };

    public heapifyUp = (tree: T[], pos: number) => {
      while (pos > 0) {
        const parent = HeapUtils.parent(pos);
        if (this.cmp(tree[pos]!, tree[parent]!) <= 0) {
          break;
        }
        [tree[pos]!, tree[parent]!] = [tree[parent]!, tree[pos]!];
        pos = parent;
      }
    };
  }

  export const makeHeap = <T>(tree: T[], cmp: (a: T, b: T) => number) => {
    new Builder(cmp).makeHeap(tree);
  };

  export const heapifyDown = <T>(tree: T[], pos: number, cmp: (a: T, b: T) => number) => {
    new Builder(cmp).heapifyDown(tree, pos);
  };

  export const heapifyUp = <T>(tree: T[], pos: number, cmp: (a: T, b: T) => number) => {
    new Builder(cmp).heapifyUp(tree, pos);
  };

  export const push = <T>(tree: T[], value: T, cmp: (a: T, b: T) => number) => {
    tree.push(value);
    new Builder(cmp).heapifyUp(tree, tree.length - 1);
  };

  export const pop = <T>(tree: T[], cmp: (a: T, b: T) => number) => {
    if (tree.length === 0) return undefined;
    if (tree.length === 1) return tree.pop();
    const root = tree[0];
    tree[0] = tree.pop()!;
    new Builder(cmp).heapifyDown(tree, 0);
    return root;
  };
}
