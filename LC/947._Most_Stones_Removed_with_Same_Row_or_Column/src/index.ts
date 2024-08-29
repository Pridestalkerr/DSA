export default function removeStones(stones: number[][]): number {
  const STONES = stones as [number, number][]; // make TS happy
  const n = stones.length;

  // consider we have the stone at (i, j)
  // then we can remove (i, x) and (y, j) for all x, y
  // this number can be as big as it can, for example for (0, 0) you can remove (0, 1), (0, 2), (0, 3), ...
  // we can view this as connections in a graph
  // is it a m-ary tree? nope, (0, 2) is also connected to its siblings of (0, 0)
  // we will have one or more connected components
  // take a connected component from all of them
  // can we remove all stones except one?
  // consider a level order traversal, we can remove all stones (after recusion) except the one we started with
  // is the problem basically asking us to find the number of connected components?
  // if so, call this number C
  // then the answer is n - C
  // tarjan comes to mind, but that find SCCs, our graph is not directed, so something simpler should work, either a DFS or a BFS
  // similar to flood fills we have done in LC1905

  // our graph representation should be a bit different
  // there could be many connections, but these connections are always formed based on the row or column

  // this is a mapping from ROW to all possible COLUMNS that form a node (ROW, COL)
  const row = new Map<number, Set<number>>();
  const col = new Map<number, Set<number>>(); // same as above

  // finding children of node (i, j) now becomes
  // row.get(i) and col.get(j)
  // i.e for (0, 1) => row.get(0) = {1, 2, 3, ...} and col.get(1) = {0, 2, 3, ...}
  // so connections would be (0, 1), (0, 2), (0, 3), ... and (1, 1), (2, 1), (3, 1), ...

  // lets build our unvisited set as well as our graph representation
  const unvisited = new Set<string>();
  for (let i = 0; i < n; i++) {
    const [x, y] = STONES[i]!;
    unvisited.add(`${x},${y}`); // add node to unvisited
    if (!row.has(x)) row.set(x, new Set<number>());
    if (!col.has(y)) col.set(y, new Set<number>());
    row.get(x)!.add(y);
    col.get(y)!.add(x);
    // TODO: figure out if adding the node as a child of itself is a good idea, maybe not...
  }

  // time for DFS/flood fill
  const DFS = (i: number, j: number) => {
    if (!unvisited.has(`${i},${j}`)) return; // already processed
    unvisited.delete(`${i},${j}`); // mark as processed
    // continue DFS for children based on row
    for (const x of row.get(i)!) {
      DFS(i, x);
    }
    // continue DFS for children based on column
    for (const y of col.get(j)!) {
      DFS(y, j);
    }
  };

  let ans = 0;
  while (unvisited.size > 0) {
    const [i, j] = unvisited.values().next().value.split(",").map(Number);
    DFS(i, j);
    ans++;
  }

  return n - ans;
}
