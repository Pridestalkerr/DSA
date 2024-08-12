import { BSTree, type BSTreeConstructor } from "@dsa/bstree";
import { RBTreeBase } from "./RBTreeBase";
import { Color, newRBTNode, RBMeta, type RBTreeNode } from "./RBTreeNode";

export class RBTree<T> extends BSTree<T, RBMeta> {
  constructor({ from, compare, descending }: BSTreeConstructor<T>) {
    // typescript what the hell is this????
    super({
      from,
      compare,
      descending,
      newMeta: () => ({ color: Color.RED }),
    } as BSTreeConstructor<T> & { newMeta: () => RBMeta });
  }

  public insertUnique(key: T) {
    const [X, didInsert] = this.__insertUnique(key);
    if (didInsert) {
      this.length++;
    }
    return X;
  }

  public erase(key: T) {
    const X = this.__erase(key);
    return X;
  }

  protected __insertUnique(key: T) {
    const [exists, P] = super.getInsertUniquePosition(key);
    if (exists) return [exists, false] as const;
    let insertLeft = false;
    if (P === this.header || this.cmp(key, P.key) < 0) {
      insertLeft = true;
    }
    const X = newRBTNode<T>(key);
    X.meta.color = Color.RED;
    this.insertAtPosition(insertLeft, X, P);
    RBTreeBase.rebalanceAfterInsert(X, this.header);
    return [X, true] as const;
  }

  protected __erase(key: T) {
    const Y = this.find(key);
    if (Y === undefined) return undefined;

    // X is the node that took the place of Y
    const X = this.utils.eraseNode(Y, this.header);
    this.length--;

    if (Y.meta.color === Color.BLACK) {
      // if the deleted node's color was black we need to rebalance
      if (X !== undefined) {
        RBTreeBase.rebalanceAfterDelete(X, this.header);
      } else if (Y.parent !== undefined) {
        // rebalance from parent
        RBTreeBase.rebalanceAfterDelete(Y.parent, this.header);
      }
    }

    return Y;
  }
}
