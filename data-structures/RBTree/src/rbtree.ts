import { RBTreeNode, Color, NILNode } from "./RBTreeNode";

type RBTreeConstructor<T> = {
  from?: T[]; // TODO: should allow iterators
  compare: (a: T, b: T) => number;
  descending?: boolean;
};

export class RBTree<T> {
  protected root: RBTreeNode<T> | NILNode = NILNode;
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

  public insert(node: RBTreeNode<T>) {
    type Safe = RBTreeNode<T>;
    let curr = this.root;
    let trail: RBTreeNode<T> | NILNode = NILNode;

    // 1. BST insert, find suitable leaf position
    while (curr !== NILNode) {
      trail = curr;
      const cmpResult = this.cmp(node.value, curr.value);
      if (cmpResult < 0) {
        curr = curr.left;
      } else if (cmpResult > 0) {
        curr = curr.right;
      } else {
        return; // duplicate value, TODO: notify somehow maybe?
      }
    }
    node.parent = trail;

    // 2. Add node as a leaf
    if (trail === NILNode) {
      // 2.a. tree is empty, node becomes our root
      this.root = node;
    } else if (this.cmp(node.value, trail.value) < 0) {
      // 2.b. node goes to the left
      (trail as Safe).left = node;
    } else {
      // 2.c. node goes to the right
      (trail as Safe).right = node;
    }

    // 3. Node's children should be NIL, handled by default

    // 4. FIX UP
    this.insertFixup(node);

    // 5. Increment tree size
    this.length++;
  }

  public find(value: T) {
    let curr = this.root;
    while (curr !== NILNode) {
      const cmpResult = this.cmp(value, curr.value);
      if (cmpResult < 0) {
        curr = curr.left;
      } else if (cmpResult > 0) {
        curr = curr.right;
      } else {
        return curr.value;
      }
    }
    return undefined;
  }

  public clear() {
    // garbage collection will take care of the rest
    this.root = NILNode;
    this.length = 0;
  }

  protected insertFixup(node: RBTreeNode<T>) {
    // Node is a RED leaf
    type Safe = RBTreeNode<T>;
    let curr = node;

    while (curr.parent.color === Color.RED) {
      const P = curr.parent as Safe; // parent
      const GP = P.parent as Safe; // grandparent

      if (P === GP.left) {
        // parent is a left child
        const uncle = GP.right as Safe;
        if (uncle.color === Color.RED) {
          // Case 1: uncle is RED
          P.color = Color.BLACK;
          uncle.color = Color.BLACK;
          GP.color = Color.RED;
          curr = GP;
        } else if (curr === P.right) {
          // Case 2: uncle is BLACK and curr is a right child
          curr = P;
          this.rotateLeft(curr);
        } else {
          // Case 3: uncle is BLACK and curr is a left child
          P.color = Color.BLACK;
          GP.color = Color.RED;
          this.rotateRight(GP);
        }
      } else {
        // parent is a right child (same as above but mirrored)
        const aunt = GP.left as Safe;
        if (aunt.color === Color.RED) {
          // Case 1: Aunt is RED
          P.color = Color.BLACK;
          aunt.color = Color.BLACK;
          GP.color = Color.RED;
          curr = GP;
        } else if (curr === P.right) {
          // Case 2: aunt is BLACK and curr is a right child
          curr = P;
          this.rotateRight(curr);
        } else {
          // Case 2: aunt is BLACK and curr is a right child
          P.color = Color.BLACK;
          GP.color = Color.RED;
          this.rotateLeft(GP);
        }
      }
    }

    if (this.root !== NILNode) {
      (this.root as Safe).color = Color.BLACK;
    }
  }

  /* LEFT ROTATION
   *         P
   *         |
   *         X
   *        / \
   *      xl   Y
   *          / \
   *        yl   yr
   */
  protected rotateLeft(X: RBTreeNode<T>) {
    // 0. Setup (for clarity)
    type Safe = RBTreeNode<T>;
    const P = X.parent as Safe;
    const Y = X.right as Safe;

    // early exit, but it can be removed
    if (Y === NILNode) {
      return; // nothing to rotate
    }

    // 1. Move yl to X->right (splice Y out)
    X.right = Y.left;

    // 2. Update the parent of yl to X
    if (Y.left !== NILNode) {
      // yl is an actual subtree, can update the parent safely
      (Y.left as Safe).parent = X;
    }

    // 3. Swap X and Y
    if (P === NILNode) {
      // 3.a. X is the root, Y becomes the new root
      this.root = Y;
    } else if (X === P.left) {
      // 3.b. X is the left child of P, Y becomes the left child of P
      P.left = Y;
    } else {
      // 3.c. X is the right child of P, Y becomes the right child of P
      P.right = Y;
    }

    // 4. Y becomes the new parent of X, Y's old left ST was moved previously
    X.parent = Y;
    Y.left = X;
  }

  /* RIGHT ROTATION
   *         P
   *         |
   *         X
   *        / \
   *       Y   xl
   *      / \
   *    yl   yr
   */
  protected rotateRight(X: RBTreeNode<T>) {
    // 0. Setup (for clarity)
    type Safe = RBTreeNode<T>;
    const P = X.parent as Safe;
    const Y = X.left as Safe;

    // early exit, but it can be removed
    if (Y === NILNode) {
      return; // nothing to rotate
    }

    // 1. Move yr to X->left (splice Y out)
    X.left = Y.right;

    // 2. Update the parent of yr to X
    if (Y.right !== NILNode) {
      // yl is an actual subtree, can update the parent safely
      (Y.right as Safe).parent = X;
    }

    // 3. Swap X and Y
    if (P === NILNode) {
      // 3.a. X is the root, Y becomes the new root
      this.root = Y;
    } else if (X === P.left) {
      // 3.b. X is the left child of P, Y becomes the left child of P
      P.left = Y;
    } else {
      // 3.c. X is the right child of P, Y becomes the right child of P
      P.right = Y;
    }

    // 4. Y becomes the new parent of X, Y's old right ST was moved previously
    X.parent = Y;
    Y.right = X;
  }

  //   public insert(value: T) {
  //     let newNode = new RBTreeNode<T>({ value });
  //     let current = this.root;
  //     let parent: RBTreeNode<T> | NIL = NIL;

  //     // 1. BST insert
  //     while (current !== NIL) {
  //       const cmpResult = this.cmp(value, current.value!);
  //       if (cmpResult === 0) {
  //         // duplicate value
  //         // TODO: maybe throw?
  //         return;
  //       }
  //       parent = current;
  //       if (cmpResult < 0) {
  //         current = current.left;
  //       } else {
  //         current = current.right;
  //       }
  //     }

  //     newNode.parent = parent;
  //     if (parent === NIL) {
  //       this.root = newNode;
  //     } else if (this.cmp(value, parent.value!) < 0) {
  //       parent.left = newNode;
  //     } else {
  //       parent.right = newNode;
  //     }

  //     this.insertFixup(newNode);
  //     this.length++;
  //   }

  //   public find(value: T) {
  //     let current = this.root;
  //     while (current !== NIL) {
  //       const cmpResult = this.cmp(value, current.value!);
  //       if (cmpResult === 0) {
  //         return current;
  //       } else if (cmpResult < 0) {
  //         current = current.left;
  //       } else {
  //         current = current.right;
  //       }
  //     }
  //     return NIL; // TODO: hmmm, not sure about this one
  //   }

  //   public contains(value: T) {
  //     return this.find(value) !== NIL;
  //   }

  //   public delete(value: T) {
  //     const nodeToDelete = this.find(value);
  //     if (nodeToDelete === NIL) {
  //       return false;
  //     }

  //     let replacementNode;
  //     let nodeToFix;

  //     if (nodeToDelete.left === NIL || nodeToDelete.right === NIL) {
  //       // Case 1 and 2: node to delete has at most one child
  //       replacementNode = nodeToDelete.left !== NIL ? nodeToDelete.left : nodeToDelete.right;
  //       this.transplant(nodeToDelete, replacementNode);
  //       nodeToFix = replacementNode;
  //     } else {
  //       // Case 3: node to delete has two children
  //     }
  //   }

  //   protected transplant(target: RBTreeNode<T>, replacement: RBTreeNode<T>) {
  //     if (target.parent === NIL) {
  //       this.root = replacement;
  //     } else if (target === target.parent.left) {
  //       target.parent.left = replacement;
  //     } else {
  //       target.parent.right = replacement;
  //     }
  //     replacement.parent = target.parent;
  //   }
}
