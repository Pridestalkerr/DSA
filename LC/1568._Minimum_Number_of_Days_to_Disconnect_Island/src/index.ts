// import { optBruteforce } from "./optimizedBruteforce";
import { AugNodeAP, articulationPoints } from "./tarjan";

const tarjanSol = (grid: number[][]): number => {
  // 1. build adj map
  const n = grid.length;
  const m = grid[0]!.length;

  const adjList = new Map<string, Set<string>>();
  const augNodes = new Map<string, AugNodeAP<string>>();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const key = `${i},${j}`;
      if (grid[i]![j] === 0) {
        continue; // ignore water
      }
      if (!adjList.has(key)) {
        adjList.set(key, new Set<string>());
        // augment the node
        if (!augNodes.has(key)) {
          augNodes.set(key, {
            discoveryTime: -1,
            lowlink: -1,
            original: key,
            // parent: null,
            childrenCount: 0,
          });
        }
      }
      // lets add the neighbors
      const currNeighbors = adjList.get(key)!;
      if (i > 0 && grid[i - 1]![j] === 1) {
        currNeighbors.add(`${i - 1},${j}`); // up
      }
      if (i < n - 1 && grid[i + 1]![j] === 1) {
        currNeighbors.add(`${i + 1},${j}`); // down
      }
      if (j > 0 && grid[i]![j - 1] === 1) {
        currNeighbors.add(`${i},${j - 1}`); // left
      }
      if (j < m - 1 && grid[i]![j + 1] === 1) {
        currNeighbors.add(`${i},${j + 1}`); // right
      }
    }
  }

  // early exit for an island with 1 cell, or no islands
  if (augNodes.size === 0) {
    return 0;
  } else if (augNodes.size === 1) {
    return 1;
  }

  const getAP = articulationPoints<string>({
    *getNeighbors(v) {
      const neighbors = adjList.get(v.original);
      if (!neighbors) {
        return; // no neighbors
      }
      for (const neighbor of neighbors) {
        yield augNodes.get(neighbor)!;
      }
    },
  });

  const art = getAP([...augNodes.values()]);

  console.log(augNodes);
  console.log(art);
  if (art.size === 0) {
    // no articulation points
    // its either strongly connected
    // or its already made up of islands of size 2
    // if amount of nodes is 2, we know for sure that we can disconnect it in 2 days
    // if its more than 3, we either have a single island of size 3 which should have an art point
    // or we have 2 islands (which implies answer is 0)

    if (augNodes.size === 2) {
      // no articulation points, and only 2 nodes
      // could either be disconnected, or connected
    }
    return 0;
  } else {
    // we have at least one articulation point
    return 1;
  }
};

export default function minDays(grid: number[][]): number {
  //   return optBruteforce(grid);
  return tarjanSol(grid);
}
