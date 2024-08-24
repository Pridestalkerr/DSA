import { BSTree, type BSTreeConstructor } from "@dsa/bstree";
import { RBTUtils } from "./utils";
import { Color, newRBTNode, RBMeta } from "./node";

export class RBTree<T> extends BSTree<T, RBMeta> {
  constructor({ from, compare, descending }: BSTreeConstructor<T>) {
    super({
      from,
      compare,
      descending,
      newMeta: () => ({ color: Color.RED }),
    } as BSTreeConstructor<T> & { newMeta: () => RBMeta });
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public insertUnique(key: T) {
    const [X, didInsert] = this.__insertUnique(key);
    if (didInsert) {
      this.__length++;
    }
    return X;
  }

  public erase(key: T) {
    const X = this.__erase(key);
    return X;
  }

  // ======================================
  // ===============PRIVATE================
  // ======================================
  protected __insertUnique(key: T) {
    const [exists, P] = super.__getInsertUniquePosition(key);
    if (exists) return [exists, false] as const;
    let insertLeft = false;
    if (P === this.__header || this.__cmp(key, P.key) < 0) {
      insertLeft = true;
    }
    const X = newRBTNode<T>(key);
    X.meta.color = Color.RED;
    super.__insertAtPosition(insertLeft, X, P);
    RBTUtils.rebalanceAfterInsert(X, this.__header);
    return [X, true] as const;
  }

  protected __erase(key: T) {
    const Y = this.find(key);
    if (Y === undefined) return undefined;

    // X is the node that took the place of Y
    const X = this.__utils.eraseNode(Y, this.__header);
    this.__length--;

    if (Y.meta.color === Color.BLACK) {
      // if the deleted node's color was black we need to rebalance
      if (X !== undefined) {
        RBTUtils.rebalanceAfterDelete(X, this.__header);
      } else if (Y.parent !== undefined) {
        // rebalance from parent
        RBTUtils.rebalanceAfterDelete(Y.parent, this.__header);
      }
    }

    return Y;
  }
}
