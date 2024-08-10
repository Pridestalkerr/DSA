// Node for M-ary tree
export class MTreeNode<T> {
  key: T;
  children: (MTreeNode<T> | undefined)[] = [];
  parent: MTreeNode<T> | undefined = undefined;

  constructor(key: T) {
    this.key = key;
  }
}
