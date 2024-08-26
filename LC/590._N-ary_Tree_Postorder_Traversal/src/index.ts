import _Node from "./node";
export default function postorder(root: _Node | null): number[] {
  const ans: number[] = [];
  const dfs = (node: _Node | null) => {
    if (!node) return;
    // recurse on left to right
    for (const child of node.children) {
      dfs(child);
    }
    // push current parent/root
    ans.push(node.val);
  };
  dfs(root);
  return ans;
}
