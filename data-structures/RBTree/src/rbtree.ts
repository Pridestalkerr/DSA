import { getDefaultCompare, HasDefaultCompare } from ".";
import { RBTreeNode, Color } from "./RBTreeNode";

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
  protected root: RBTreeNode<T> | undefined = undefined;
  protected header: RBTreeNode<T> = new RBTreeNode(undefined as T);
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

  public insert(key: T) {
    const [X, inserted] = this.__insertUnique(key);
    if (inserted) this.length++;
    return X;
  }

  //   public find(value: T) {
  //     return this.__find(value)?.key;
  //   }

  //   public delete(value: T) {
  //     const node = this.__find(value);
  //     if (!node) return undefined;
  //     return this.__delete(node);
  //   }

  //   public contains(value: T): boolean {
  //     return this.__find(value) !== undefined;
  //   }

  public clear() {
    // garbage collection will take care of the rest
    this.root = undefined;
    this.length = 0;
  }

  //   /**
  //    * Find a node with the given value.
  //    * @internal
  //    **/
  //   public __find(value: T): RBTreeNode<T> | undefined {
  //     let curr = this.root;
  //     while (curr !== NILNode) {
  //       const cmpResult = this.cmp(value, curr.key);
  //       if (cmpResult < 0) {
  //         curr = curr.left;
  //       } else if (cmpResult > 0) {
  //         curr = curr.right;
  //       } else {
  //         return curr;
  //       }
  //     }
  //     return undefined;
  //   }

  public __insertUnique(key: T) {
    const [exists, P] = this.__getInsertUniquePosition(key);
    if (exists) return [exists, false];
    let insertLeft = false;
    if (P === this.header || this.cmp(key, P.key) < 0) {
      // if the tree is empty, the new node becomes the root
      // root always goes to the left of header
      // otherwise, fallback to cmp
      insertLeft = true;
    }
    const X = new RBTreeNode<T>(key);
    this.__insertAndRebalance(X, P, insertLeft);
    return [X, true];
  }

  /**
   * Find the expected parent node of the not yet inserted key.
   * @internal
   * @param key
   * @returns [node, undefined] if the key already exists, node is the existing node
   * @returns [undefined, trail] if the key does not exist, trail is the parent node
   **/
  public __getInsertUniquePosition(
    key: T,
  ): [RBTreeNode<T>, undefined] | [undefined, RBTreeNode<T>] {
    let X = this.root;
    let trail = this.header;
    while (X !== undefined) {
      trail = X;
      const cmpResult = this.cmp(key, X.key);
      if (cmpResult === 0) {
        return [X, undefined];
      }
      X = cmpResult < 0 ? X.left : X.right;
    }
    return [undefined, trail];
  }

  //   /**
  //    * @internal
  //    * @param node Node to insert
  //    **/
  //   public __insert(node: RBTreeNode<T>) {
  //     type Safe = RBTreeNode<T>;
  //     let curr = this.root;
  //     let trail: RBTreeNode<T> | undefined = undefined;

  //     // 1. BST insert, find suitable leaf position
  //     while (curr !== undefined) {
  //       trail = curr;
  //       const cmpResult = this.cmp(node.key, curr.key);
  //       if (cmpResult < 0) {
  //         curr = curr.left;
  //       } else if (cmpResult > 0) {
  //         curr = curr.right;
  //       } else {
  //         return undefined; // duplicate value
  //       }
  //     }
  //     node.parent = trail;

  //     // 2. Add node as a leaf
  //     if (trail === undefined) {
  //       // 2.a. tree is empty, node becomes our root
  //       this.root = node;
  //     } else if (this.cmp(node.key, trail.key) < 0) {
  //       // 2.b. node goes to the left
  //       (trail as Safe).left = node;
  //     } else {
  //       // 2.c. node goes to the right
  //       (trail as Safe).right = node;
  //     }

  //     // 3. Node's children should be NIL, handled by default

  //     // 4. FIX UP
  //     this.rebalanceAfterInsert(node);

  //     // 5. Increment tree size
  //     this.length++;
  //     return node;
  //   }

  //   /**
  //    * Use at your own risk. Make sure the node actually belongs to the tree.
  //    * @internal
  //    **/
  //   public __delete(node: RBTreeNode<T>) {
  //     type Safe = RBTreeNode<T>;
  //     if (node === NILNode) return undefined;

  //     const P: RBTreeNode<T> = node.parent; // could be NIL, so check before using

  //     // 1. BST DELETE
  //     if (node.left !== NILNode && node.right !== NILNode) {
  //       // Case 1. Node has two children. Find the successor and replace the node with it.
  //       // Successor is the leftmost node in the right subtree (right => left forever)
  //       let succ = node.right as Safe;
  //       while (succ.left !== NILNode) {
  //         succ = succ.left as Safe;
  //       }
  //       if (node === this.root) {
  //         this.root = succ;
  //       } else {
  //         if (P.left === node) {
  //           // node was a left child
  //           P.left = succ;
  //         } else {
  //           // node was a right child
  //           P.right = succ;
  //         }
  //       }

  //       const C = succ.right;
  //       if (node === succ.parent) {
  //         // node was the parent of succ
  //       } else {
  //         if (C !== NILNode) {
  //           (C as Safe).parent = succ.parent;
  //         }
  //         succ.parent.left = C;
  //         succ.right = node.right;
  //         node.right.parent = succ;
  //       }
  //       succ.parent = node.parent;
  //       node.left.parent = succ;
  //       if (succ.color === Color.RED) {
  //         // no need to fixup
  //         succ.color = node.color;
  //         return;
  //       }
  //       succ.color = node.color;
  //     } else {
  //       // Case 2. Node has one child at most. It takes the place of current node.
  //       const C = node.left === NILNode ? node.right : node.left;

  //       if (C !== NILNode) {
  //         (C as Safe).parent = P;
  //       }

  //       if (node === this.root) {
  //         this.root = C;
  //       } else {
  //         if (P.left === node) {
  //           // node was a left child
  //           P.left = C;
  //         } else {
  //           // node was a right child
  //           P.right = C;
  //         }
  //       }
  //       // node removed from hierarchy, we can reuse the variable
  //       node = C;
  //     }

  //     this.deleteFixup(node);

  //     // X. Decrease tree size;
  //     this.length--;
  //   }

  /**
   *
   * @param X Node to insert
   * @param P Parent where X should be inserted
   * @param insertLeft Whether X should be inserted as a left child
   */
  protected __insertAndRebalance(X: RBTreeNode<T>, P: RBTreeNode<T>, insertLeft: boolean) {
    type Safe = RBTreeNode<T>;

    // 1. Initialize X
    X.parent = P;
    X.left = undefined;
    X.right = undefined;
    X.color = Color.RED;

    if (insertLeft) {
      P.left = X;
      if (P === this.header) {
        // X is root, link header to it (left link done above already)
        this.header.parent = X;
        this.header.right = X;
      } else if (P === this.header.left) {
        this.header.left = X; // maintain the leftmost node
      }
    } else {
      P.right = X;
      if (P === this.header.right) {
        this.header.right = X; // maintain the rightmost node
      }
    }

    while (X !== this.root && X.parent!.isRed()) {
      // check above makes sure that X is not root, so parent exists
      const P = X.parent as Safe;
      // root of RBT is always black, we know that X is not the root
      // we also know that its parent is RED, therefore its grandparent must exist (maybe BLACK)
      const GP = P.parent as Safe;

      if (P === GP.left) {
        // parent is a left child
        const uncle = GP.right;
        if (uncle && uncle.isRed()) {
          // Case 1: uncle is RED
          P.color = Color.BLACK;
          uncle.color = Color.BLACK;
          GP.color = Color.RED;
          X = GP;
        } else {
          if (X === P.right) {
            // Case 2: uncle is BLACK and X is a right child
            X = P;
            this.rotateLeft(X);
          }
          // Case 3: followup of Case 2, uncle is BLACK and X is a left child
          P.color = Color.BLACK;
          GP.color = Color.RED;
          this.rotateRight(GP);
        }
      } else {
        // parent is a right child (same as above but mirrored)
        const aunt = GP.left;
        if (aunt && aunt.isRed()) {
          // Case 1: Aunt is RED
          P.color = Color.BLACK;
          aunt.color = Color.BLACK;
          GP.color = Color.RED;
          X = GP;
        } else {
          if (X === P.left) {
            // Case 2: aunt is BLACK and curr is a right child
            X = P;
            this.rotateRight(X);
          }
          // Case 3: followup of Case 2, aunt is BLACK and curr is a left child
          P.color = Color.BLACK;
          GP.color = Color.RED;
          this.rotateLeft(GP);
        }
      }
    }

    // we've inserted, so there's always a root, and it must be BLACK
    (this.header.parent as Safe).color = Color.BLACK;
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
    if (Y === undefined) {
      return; // nothing to rotate
    }

    // 1. Move yl to X->right (splice Y out)
    X.right = Y.left;

    // 2. Update the parent of yl to X
    if (Y.left !== undefined) {
      // yl is an actual subtree, can update the parent safely
      (Y.left as Safe).parent = X;
    }

    // 3. Swap X and Y
    Y.parent = P;
    if (P === undefined) {
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
    Y.left = X;
    X.parent = Y;
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
    if (Y === undefined) {
      return; // nothing to rotate
    }

    // 1. Move yr to X->left (splice Y out)
    X.left = Y.right;

    // 2. Update the parent of yr to X
    if (Y.right !== undefined) {
      // yl is an actual subtree, can update the parent safely
      (Y.right as Safe).parent = X;
    }

    // 3. Swap X and Y
    Y.parent = P;
    if (P === undefined) {
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
    Y.right = X;
    X.parent = Y;
  }

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
