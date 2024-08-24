import { BSTreeIterator } from "@dsa/bstree";
import { RBMeta, RBTreeNode } from "./node";

export class RBTreeIterator<T> extends BSTreeIterator<T, RBMeta> {
  constructor(header: RBTreeNode<T>, node: RBTreeNode<T>, reverse = false) {
    super(header, node, reverse);
  }
}
