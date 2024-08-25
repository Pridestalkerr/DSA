import TreeNode from "./node";

export default function postorderTraversal(root: TreeNode | null): number[] {
  // recursive impl, challenge is too boring
  // you can find iterative implementations for all traversals in @dsa/bstree/utils.ts
  const res: number[] = [];
  const dfs = (node: TreeNode | null) => {
    if (node === null) return;
    dfs(node.left);
    dfs(node.right);
    res.push(node.val);
  };

  dfs(root);
  return res;
}
