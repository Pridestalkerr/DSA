export default function countSubIslands(grid1: number[][], grid2: number[][]): number {
  // this problem is similar to LC/959._Regions_Cut_By_Slashes
  // https://leetcode.com/problems/regions-cut-by-slashes/description/
  // both problems are tagged for union find, but i think a simple flood fill will perform better

  const n = grid1.length;
  const m = grid1[0]!.length;

  // lets use a set of pairs for all island cells in grid2
  // all of these will be considered unexplored at the beginning
  const unexplored = new Set<string>();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid2[i]![j] === 1) {
        unexplored.add(`${i},${j}`);
      }
    }
  }

  // flood fill on unexplored
  const DFS = (i: number, j: number, isFull: { val: boolean }) => {
    if (i < 0 || j < 0 || i >= n || j >= m) return;
    if (!unexplored.has(`${i},${j}`)) return; // already filled
    unexplored.delete(`${i},${j}`); // mark as filled

    if (grid1[i]![j] === 0) {
      isFull.val = false; // not a sub island
      // we keep exploring to remove all cells of this island though
    }
    // move in all possible directions
    DFS(i - 1, j, isFull);
    DFS(i + 1, j, isFull);
    DFS(i, j - 1, isFull);
    DFS(i, j + 1, isFull);
  };

  let ans = 0;
  while (unexplored.size > 0) {
    const [i, j] = unexplored.values().next().value.split(",").map(Number);
    const isFull = { val: true };
    DFS(i, j, isFull);
    if (isFull.val) ans++;
  }

  return ans;
}
