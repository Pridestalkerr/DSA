import { CMP } from "@dsa/common";
import { RBTree } from "@dsa/rbtree";

type KV<K, V> = {
  k: K;
  v: V;
};

type FromStatic<K, V> = {
  from: [[K, V], ...[K, V][]];
} & CMP.OptionalCMP<K>;

// TODO: iterables
type FromArray<K, V> = {
  from?: Array<[K, V]>;
  compare: CMP.CMP<K>;
};

type Other = {
  descending?: boolean;
};

export class OrderedMap<K, V> {
  public tree: RBTree<KV<K, V>>;

  constructor(opt: (FromStatic<K, V> | FromArray<K, V>) & Other) {
    let _cmp: CMP.CMP<K>;
    if (!opt.from !== undefined) {
      // expect compare to be present
      if (opt.compare === undefined) {
        throw new Error("OrderedMap: Either 'from' or 'compare' must be present.");
      }
      _cmp = opt.compare;
    } else {
      // if compare is not present try to infer it
      if (opt.compare === undefined) {
        _cmp = CMP.getDefaultCompare(opt.from![0][0]);
      } else {
        _cmp = opt.compare;
      }
    }

    const sign = opt.descending ? -1 : 1;
    const from = opt.from !== undefined ? opt.from.map(([k, v]) => ({ k, v })) : undefined;
    this.tree = new RBTree<KV<K, V>>({
      from,
      // TODO: we can do better than this
      compare: (a, b) => sign * _cmp(a.k, b.k),
    });
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

  public insert(key: K, value: V) {
    const node = this.tree.insertUnique({ k: key, v: value });
    return node.key.v;
  }

  public erase(key: K) {
    const node = this.tree.erase({ k: key, v: undefined as V });
    return node?.key.v;
  }

  // ======================================
  // ===============LOOKUP=================
  // ======================================

  public find(key: K) {
    const node = this.tree.find({ k: key, v: undefined as V });
    return node?.key.v;
  }

  public contains(key: K) {
    return this.tree.find({ k: key, v: undefined as V }) !== undefined;
  }
}
