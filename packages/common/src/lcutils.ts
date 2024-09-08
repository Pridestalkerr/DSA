export namespace LC {
  export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = val ?? 0;
      this.left = left ?? null;
      this.right = right ?? null;
    }
  }
  export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val ?? 0;
      this.next = next ?? null;
    }
  }
  export const makeBinaryTree = (arr: (number | null)[]): TreeNode | null => {
    if (arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]!);
    const queue: TreeNode[] = [root];
    let i = 1; // root is first
    while (queue.length > 0 && i < arr.length) {
      const current = queue.shift()!;

      if (i < arr.length && arr[i] !== null) {
        const left = new TreeNode(arr[i] as number);
        current.left = left;
        queue.push(left);
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        const right = new TreeNode(arr[i] as number);
        current.right = right;
        queue.push(right);
      }
      i++;
    }

    return root;
  };

  export class NTreeNode {
    val: number;
    children: NTreeNode[];
    constructor(val?: number) {
      this.val = val === undefined ? 0 : val;
      this.children = [];
    }
  }

  export const makeTree = (arr: (number | null)[]): NTreeNode | null => {
    if (arr.length === 0 || arr[0] === null) return null;
    const root = new NTreeNode(arr[0]!);
    const queue: NTreeNode[] = [root];
    let i = 2; // root is first
    while (queue.length > 0 && i < arr.length) {
      const current = queue.shift()!;

      while (i < arr.length && arr[i] !== null) {
        const child = new NTreeNode(arr[i] as number);
        current.children.push(child);
        queue.push(child);
        i++;
      }

      i++; // skip null
    }

    return root;
  };

  export const makeList = (arr: number[]): ListNode | null => {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  };
}
