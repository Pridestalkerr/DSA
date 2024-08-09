import { getDefaultCompare, HasDefaultCompare } from ".";
import { RBTreeNode, Color, NILNode } from "./RBTreeNode";

type RBTreeConstructor<T> = (HasDefaultCompare<T> extends true
  ? // compare can be inferred from array values
    // if from is provided, we allow compare to be optional
    // if from is not provided, pass compare
    | {
          // dynamic array provided, could be empty so we cant infer
          from: T[];
          compare?: (a: T, b: T) => number;
        }
      | {
          // static array initializer provided, we can infer compare
          from: [T, ...T[]];
          compare?: (a: T, b: T) => number;
        }
  : // compare cannot be inferred from array values, force pass compare, allow optional from
    {
      from?: T[];
      compare: (a: T, b: T) => number;
    }) & {
  descending?: boolean;
};

export class RBTree<T> {
  protected root: RBTreeNode<T> | NILNode = NILNode;
  protected cmp: (a: T, b: T) => number;
  protected length = 0;
  constructor({ from, compare, descending }: RBTreeConstructor<T>) {
    const hasFrom = from !== undefined;
    const hasValues = hasFrom && from.length > 0;
    const hasCMP = compare !== undefined;

    // 1. Initialize cmp function
    let _cmp = compare;
    if (!hasCMP) {
      // see if we can infer it
      if (hasValues) {
        _cmp = getDefaultCompare(from[0]);
      } else {
        throw new Error("No compare function provided and could not infer one from the array");
      }
    }
    const sign = descending ? -1 : 1;
    this.cmp = (...args) => sign * _cmp!(...args);

    if (hasValues) {
      for (const v of from) {
        this.insert(v);
      }
    }
  }

  public insert(value: T) {
    const fresh = new RBTreeNode<T>(value);
    return this.__insert(fresh)?.value;
  }

  /**
   * Use at your own risk. Make sure to pass a fresh node.
   * @internal
   **/
  public __insert(node: RBTreeNode<T>) {
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
        return undefined; // duplicate value
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
    return node;
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
        // TODO: this should probably return the node instead
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

  public delete(node: RBTreeNode<T>) {
    if (node === NILNode) return undefined; // should this throw? maybe not

    // X. Decrease tree size;
    this.length--;
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
