import { RBTreeNode, Color } from "./RBTreeNode";

// Header is still a node
// but all of its links point to the actual root
// we also never set it directly, so its initialized only once per tree
// we need it because many functions want to set the root itself, but we would lose the reference
export type Header<T> = RBTreeNode<T>;

export class RBTreeBase {
  /**
   *
   * @param X Node to insert
   * @param P Parent where X should be inserted
   * @param insertLeft Whether X should be inserted as a left child
   */
  static rebalanceAfterInsert<T>(
    // insertLeft: boolean,
    X: RBTreeNode<T>,
    // P: RBTreeNode<T>,
    header: Header<T>,
  ) {
    type Safe = RBTreeNode<T>;

    while (X !== header.parent && X.parent!.meta.color === Color.RED) {
      // check above makes sure that X is not root, so parent exists
      const P = X.parent as Safe;

      // root of RBT is always black, we know that X is not the root
      // we also know that its parent is RED, therefore its grandparent must exist (maybe BLACK)
      const GP = X.parent!.parent as Safe;

      if (P === GP.left) {
        // parent is a left child
        const uncle = GP.right;
        if (uncle && uncle.meta.color === Color.RED) {
          // Case 1: uncle is RED
          P.meta.color = Color.BLACK;
          uncle.meta.color = Color.BLACK;
          GP.meta.color = Color.RED;
          X = GP;
        } else {
          if (X === P!.right) {
            // Case 2: uncle is BLACK and X is a right child
            X = P;
            RBTreeBase.rotateLeft(X, header);
          }
          // Case 3: followup of Case 2, uncle is BLACK and X is a left child
          X.parent!.meta.color = Color.BLACK;
          GP.meta.color = Color.RED;
          RBTreeBase.rotateRight(GP, header);
        }
      } else {
        // parent is a right child (same as above but mirrored)
        const aunt = GP.left;
        if (aunt && aunt.meta.color === Color.RED) {
          // Case 1: Aunt is RED
          P.meta.color = Color.BLACK;
          aunt.meta.color = Color.BLACK;
          GP.meta.color = Color.RED;
          X = GP;
        } else {
          if (X === P.left) {
            // Case 2: aunt is BLACK and curr is a right child
            X = P;
            RBTreeBase.rotateRight(X, header);
          }
          // Case 3: followup of Case 2, aunt is BLACK and curr is a left child
          X.parent!.meta.color = Color.BLACK;
          GP.meta.color = Color.RED;
          RBTreeBase.rotateLeft(GP, header);
        }
      }
    }
    // we've inserted, so there's always a root, and it must be BLACK
    (header.parent as Safe).meta.color = Color.BLACK;
  }

  static rebalanceAfterDelete<T>(
    // insertLeft: boolean,
    X: RBTreeNode<T>,
    // P: RBTreeNode<T>,
    header: Header<T>,
  ) {
    type Safe = RBTreeNode<T>;

    let P = X.parent as Safe;
    while (X !== header.parent && (X === undefined || X.meta.color === Color.BLACK)) {
      // const GP = P.parent as Safe;
      if (X === P.left) {
        let W = P.right as Safe;
        if (W.meta.color === Color.RED) {
          W.meta.color = Color.BLACK;
          P.meta.color = Color.RED;
          RBTreeBase.rotateLeft(P, header);
          W = P.right as Safe;
        }
        if (
          (W.left === undefined || W.left.meta.color === Color.BLACK) &&
          (W.right === undefined || W.right.meta.color === Color.BLACK)
        ) {
          W.meta.color = Color.RED;
          X = P;
          P = X.parent as Safe;
        } else {
          if (W.right === undefined || W.right.meta.color === Color.BLACK) {
            if (W.left !== undefined) {
              // defensive, but it shouldnt happen
              // look previous if statement, for W.left to be undefined here, W.right shouldve been undefined
              W.left.meta.color = Color.BLACK;
            }
            W.meta.color = Color.RED;
            RBTreeBase.rotateRight(W, header);
            W = P.right as Safe;
          }
          W.meta.color = P.meta.color;
          P.meta.color = Color.BLACK;
          if (W.right !== undefined) {
            W.right.meta.color = Color.BLACK;
          }
          RBTreeBase.rotateLeft(P, header);
          break;
        }
      } else {
        // mirror of above (right <-> left)
        let W = P.left as Safe;
        if (W.meta.color === Color.RED) {
          W.meta.color = Color.BLACK;
          P.meta.color = Color.RED;
          RBTreeBase.rotateRight(P, header);
          W = P.left as Safe;
        }
        if (
          (W.right === undefined || W.right.meta.color === Color.BLACK) &&
          (W.left === undefined || W.left.meta.color === Color.BLACK)
        ) {
          W.meta.color = Color.RED;
          X = P;
          P = X.parent as Safe;
        } else {
          if (W.left === undefined || W.left.meta.color === Color.BLACK) {
            if (W.right !== undefined) {
              W.right.meta.color = Color.BLACK;
            }
            W.meta.color = Color.RED;
            RBTreeBase.rotateLeft(W, header);
            W = P.left as Safe;
          }
          W.meta.color = P.meta.color;
          P.meta.color = Color.BLACK;
          if (W.left !== undefined) {
            W.left.meta.color = Color.BLACK;
          }
          RBTreeBase.rotateRight(P, header);
          break;
        }
      }
    }
    if (X !== undefined) {
      X.meta.color = Color.BLACK;
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
  static rotateLeft<T>(X: RBTreeNode<T>, header: Header<T>) {
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
    if (X === header.parent) {
      // 3.a. X is the root, Y becomes the new root
      header.parent = Y;
      // this.root = Y;
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
  static rotateRight<T>(X: RBTreeNode<T>, header: Header<T>) {
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
    if (X === header.parent) {
      // 3.a. X is the root, Y becomes the new root
      header.parent = Y;
      //   this.root = Y;
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
}
