import { CMP } from "@dsa/common";
import { RBTree } from "@dsa/rbtree";

type FromStatic<T> = {
  from: [T, ...T[]];
} & CMP.OptionalCMP<T>;

// TODO: iterables
type FromArray<T> = {
  from?: Array<T>;
  compare: CMP.CMP<T>;
};

type Other = {
  descending?: boolean;
};

export class OrderedSet<T> {
  private tree: RBTree<T>;

  constructor(opt: (FromStatic<T> | FromArray<T>) & Other) {
    let _cmp: CMP.CMP<T>;
    if (!opt.from !== undefined) {
      // expect compare to be present
      if (opt.compare === undefined) {
        throw new Error("OrderedSet: Either 'from' or 'compare' must be present.");
      }
      _cmp = opt.compare;
    } else {
      // if compare is not present try to infer it
      if (opt.compare === undefined) {
        _cmp = CMP.getDefaultCompare(opt.from![0]);
      } else {
        _cmp = opt.compare;
      }
    }

    const sign = opt.descending ? -1 : 1;
    this.tree = new RBTree<T>({ from: opt.from, compare: (a, b) => sign * _cmp(a, b) });
  }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public empty() {
    return this.tree.size === 0;
  }

  public size() {
    return this.tree.size;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================

  public clear() {
    this.tree.clear();
  }

  public insert(key: T) {
    const node = this.tree.insertUnique(key);
    return node.key;
  }

  public erase(key: T) {
    const node = this.tree.erase(key);
    return node?.key;
  }

  // ======================================
  // ===============LOOKUP=================
  // ======================================

  public find(key: T) {
    const node = this.tree.find(key);
    return node?.key;
  }

  public contains(key: T) {
    return this.tree.find(key) !== undefined;
  }
}
