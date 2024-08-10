/**
 * The resulting grid is a planar graph, we can use Euler's formula to find the number of regions
 * We only need to find the number of edges and vertices that the graph represents
 *
 */
const euler = (grid: string[]): number => {
  return 0;
};

/**
 * this function will construct the actual grid, every cell is a 3x3 cube
 * so '/' will be represented as:
 * 0 0 1
 * 0 1 0
 * 1 0 0
 * '\' will be represented as:
 * 1 0 0
 * 0 1 0
 * 0 0 1
 * ' ' will be represented as:
 * 0 0 0
 * 0 0 0
 * 0 0 0
 * After doing this, we can perform a gril fill algorithm to find the number of regions
 * The tricky part is being efficient into finding the next region to fill
 * We can initialize a set of all cells, and remove them as we fill them
 * Even more, we dont even need the actual grid, since the set represents it fully
 * Additional Optimization:
 * it is likely theres more empty space than barriers, so we can flip the set and all conditions
 *
 */
const gridFill = (grid: string[]): number => {
  const n = grid.length * 3;
  const m = grid[0]!.length * 3;
  const stillEmpty = new Set<string>();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i]!.length; j++) {
      const c = grid[i]![j];
      if (c === "/") {
        stillEmpty.add(`${i * 3},${j * 3}`);
        stillEmpty.add(`${i * 3},${j * 3 + 1}`);
        stillEmpty.add(`${i * 3 + 1},${j * 3}`);
        stillEmpty.add(`${i * 3 + 1},${j * 3 + 2}`);
        stillEmpty.add(`${i * 3 + 2},${j * 3 + 1}`);
        stillEmpty.add(`${i * 3 + 2},${j * 3 + 2}`);
      } else if (c === "\\") {
        stillEmpty.add(`${i * 3},${j * 3 + 1}`);
        stillEmpty.add(`${i * 3},${j * 3 + 2}`);
        stillEmpty.add(`${i * 3 + 1},${j * 3}`);
        stillEmpty.add(`${i * 3 + 1},${j * 3 + 2}`);
        stillEmpty.add(`${i * 3 + 2},${j * 3}`);
        stillEmpty.add(`${i * 3 + 2},${j * 3 + 1}`);
      } else {
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            stillEmpty.add(`${i * 3 + k},${j * 3 + l}`);
          }
        }
      }
    }
  }

  let ans = 0;

  // flood fill
  const DFS = (i: number, j: number) => {
    if (i < 0 || j < 0 || i >= n || j >= m) return;
    if (!stillEmpty.has(`${i},${j}`)) return; // already filled
    stillEmpty.delete(`${i},${j}`); // mark as filled
    DFS(i - 1, j);
    DFS(i + 1, j);
    DFS(i, j - 1);
    DFS(i, j + 1);
  };

  while (stillEmpty.size > 0) {
    const [i, j] = stillEmpty.values().next().value.split(",").map(Number);
    DFS(i, j);
    ans++;
  }

  return ans;
};

export default function regionsBySlashes(grid: string[]): number {
  // planar graphs
  // F = E - V + 2
  // subtract 1 for the outer infinite space
  // we can have multiple embedded planar graphs
  // i.e example 3, bounded by spaces
  // there the answer should be 2
  // this means we have can have multiple disconnected forests
  // a DFS with a visited list should take care of it
  // 1. perform DFS from anywhere
  // 2. keep track of how many nodes and edges we parse
  // 3. when it ends, we have an answer for the current forest

  return gridFill(grid);
}
