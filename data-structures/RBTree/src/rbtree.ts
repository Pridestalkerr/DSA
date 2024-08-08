const enum Color {
  RED = 0,
  BLACK = 1,
}

type RBTreeNodeConstructor<T> = {
  color?: Color;
  value: T;
  left?: RBTreeNode<T> | NIL;
  right?: RBTreeNode<T> | NIL;
  parent?: RBTreeNode<T> | NIL;
};

class RBTreeNode<T> {
  color: Color;
  value: T;
  left: RBTreeNode<T> | NIL;
  right: RBTreeNode<T> | NIL;
  parent: RBTreeNode<T> | NIL;
  constructor(opt: RBTreeNodeConstructor<T>) {
    this.color = opt.color ?? Color.RED;
    this.value = opt.value;
    this.left = opt.left ?? NIL;
    this.right = opt.right ?? NIL;
    this.parent = opt.parent ?? NIL;
  }
}

type NIL = RBTreeNode<undefined>;
const NIL = new RBTreeNode<undefined>({ color: Color.BLACK, value: undefined }) as NIL;

type RBTreeConstructor<T> = {
  from?: T[]; // TODO: should allow iterators
  compare: (a: T, b: T) => number;
  descending?: boolean;
};

export class RBTree<T> {
  protected root: RBTreeNode<T> | NIL = NIL;
  protected cmp: (a: T, b: T) => number;
  protected length = 0;
  constructor({ from, compare, descending }: RBTreeConstructor<T>) {
    if (from) {
      // populate with given values
    }
    const sign = descending ? -1 : 1;
    // TODO: to default, array values must be provided, could default later
    this.cmp = (...args) => sign * compare(...args);
  }

  public insert(value: T) {
    let newNode = new RBTreeNode<T>({ value });
    let current = this.root;
    let parent: RBTreeNode<T> | NIL = NIL;

    // 1. BST insert
    while (current !== NIL) {
      const cmpResult = this.cmp(value, current.value!);
      if (cmpResult === 0) {
        // duplicate value
        // TODO: maybe throw?
        return;
      }
      parent = current;
      if (cmpResult < 0) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    newNode.parent = parent;
    if (parent === NIL) {
      this.root = newNode;
    } else if (this.cmp(value, parent.value!) < 0) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    this.insertFixup(newNode);
    this.length++;
  }

  public find(value: T) {
    let current = this.root;
    while (current !== NIL) {
      const cmpResult = this.cmp(value, current.value!);
      if (cmpResult === 0) {
        return current;
      } else if (cmpResult < 0) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return NIL; // TODO: hmmm, not sure about this one
  }

  public contains(value: T) {
    return this.find(value) !== NIL;
  }

  public delete(value: T) {
    const nodeToDelete = this.find(value);
    if (nodeToDelete === NIL) {
      return false;
    }

    let replacementNode;
    let nodeToFix;

    if (nodeToDelete.left === NIL || nodeToDelete.right === NIL) {
      // Case 1 and 2: node to delete has at most one child
      replacementNode = nodeToDelete.left !== NIL ? nodeToDelete.left : nodeToDelete.right;
      this.transplant(nodeToDelete, replacementNode);
      nodeToFix = replacementNode;
    } else {
      // Case 3: node to delete has two children
    }
  }

  protected transplant(target: RBTreeNode<T>, replacement: RBTreeNode<T>) {
    if (target.parent === NIL) {
      this.root = replacement;
    } else if (target === target.parent.left) {
      target.parent.left = replacement;
    } else {
      target.parent.right = replacement;
    }
    replacement.parent = target.parent;
  }

  protected insertFixup(node: RBTreeNode<T>) {
    while (node.parent.color === Color.RED) {
      if (node.parent === node.parent.parent.left) {
        let uncle = node.parent.parent.right;
        if (uncle.color === Color.RED) {
          // Case 1: uncle is red
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          node = node.parent.parent as RBTreeNode<T>;
        } else {
          if (node === node.parent.right) {
            // Case 2: uncle is black and node is a right child
            node = node.parent as RBTreeNode<T>;
            this.leftRotate(node);
          }
          // Case 3: uncle is black and node is a left child
          node.parent.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          this.rightRotate(node.parent.parent as RBTreeNode<T>);
        }
      } else {
        // Same as above but mirrored
        let uncle = node.parent.parent.left;
        if (uncle.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          node = node.parent.parent as RBTreeNode<T>;
        } else {
          if (node === node.parent.left) {
            node = node.parent as RBTreeNode<T>;
            this.rightRotate(node);
          }
          node.parent.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          this.leftRotate(node.parent.parent as RBTreeNode<T>);
        }
      }
    }
    this.root.color = Color.BLACK;
  }

  protected leftRotate(pivot: RBTreeNode<T>) {
    const newTop = pivot.right;
    pivot.right = newTop.left;

    if (newTop.left !== NIL) {
      newTop.left.parent = pivot;
    }

    newTop.parent = pivot.parent;

    if (pivot.parent === NIL) {
      this.root = newTop;
    } else if (pivot === pivot.parent.left) {
      pivot.parent.left = newTop;
    } else {
      pivot.parent.right = newTop;
    }

    newTop.left = pivot;
    pivot.parent = newTop;
  }

  protected rightRotate(pivot: RBTreeNode<T>) {
    const newTop = pivot.left; // We know this isn't null because we're rotating
    pivot.left = newTop.right;

    if (newTop.right !== NIL) {
      newTop.right.parent = pivot;
    }

    newTop.parent = pivot.parent;

    if (pivot.parent === NIL) {
      this.root = newTop;
    } else if (pivot === pivot.parent.right) {
      pivot.parent.right = newTop;
    } else {
      pivot.parent.left = newTop;
    }

    newTop.right = pivot;
    pivot.parent = newTop;
  }

  public clear() {
    this.root = NIL;
    this.length = 0;
  }
}
