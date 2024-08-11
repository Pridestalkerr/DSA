// TODO: replace this with actual stack when implemented
const Stack = Array;

export type AugmentedNode<T> = {
  index: number;
  lowlink: number;
  onStack: boolean;
  original: T;
};

export const tarjanImpl =
  <T>({ getNeighbors }: { getNeighbors: (v: AugmentedNode<T>) => Iterable<AugmentedNode<T>> }) =>
  (nodes: AugmentedNode<T>[]) => {
    let index = 0;
    const stack = new Stack<AugmentedNode<T>>();
    const SCC = new Array<Array<AugmentedNode<T>>>();

    const strongConnect = (v: AugmentedNode<T>) => {
      v.index = index;
      v.lowlink = index;
      index++;
      stack.push(v);
      v.onStack = true;

      // should be an iterator
      for (const neighbor of getNeighbors(v)) {
        if (neighbor.index === -1) {
          strongConnect(neighbor);
          v.lowlink = Math.min(v.lowlink, neighbor.lowlink);
        } else if (neighbor.onStack) {
          v.lowlink = Math.min(v.lowlink, neighbor.index);
        }
      }

      if (v.lowlink === v.index) {
        const scc = [];
        while (true) {
          const w = stack.pop();
          if (!w) {
            // done
            break;
          }
          w.onStack = false;
          scc.push(w);
          if (w === v) {
            break;
          }
        }
        SCC.push(scc);
      }
    };

    for (const v of nodes) {
      if (v.index === -1) {
        strongConnect(v);
      }
    }
    return SCC;
  };

export type AugNodeAP<T> = {
  discoveryTime: number;
  lowlink: number;
  //   parent: AugNodeAP<T> | null;
  childrenCount: number;
  original: T;
};

export const articulationPoints =
  <T>({ getNeighbors }: { getNeighbors: (v: AugNodeAP<T>) => Iterable<AugNodeAP<T>> }) =>
  (nodes: AugNodeAP<T>[]) => {
    let discoveryTime = 0;

    const dfs = (v: AugNodeAP<T>, p: AugNodeAP<T>) => {
      console.log("DFS");
      let childrenCount = 0;
      discoveryTime++;
      v.discoveryTime = discoveryTime;
      v.lowlink = discoveryTime;

      for (const neighbor of getNeighbors(v)) {
        console.log("SHOULD NEVER PRINT");
        if (neighbor === p) continue; // dont go back through the same path

        if (neighbor.discoveryTime === -1) {
          // if the neighbor hasnt been discovered before
          childrenCount++;
          dfs(neighbor, v);
          v.lowlink = Math.min(v.lowlink, neighbor.lowlink);
        } else {
          // neighbor already discovered
          // we found an ancestor
          v.lowlink = Math.min(v.lowlink, neighbor.discoveryTime);
        }
      }

      return childrenCount;
    };

    const articulationPoints = new Set<AugNodeAP<T>>();
    for (const v of nodes) {
      if (v.discoveryTime === -1) {
        // if not discovered yet, v is a root
        const ct = dfs(v, v);
        if (ct > 1) {
          articulationPoints.add(v);
        }
      }
    }

    return articulationPoints;
  };
// doesnt have to contain all keys
const tarjanAdjList = <T>(adjList: Map<T, Set<T>>) => {};

// this will probably not be that useful
const tarjanAdjMatrix = (matrix: boolean[][]) => {
  const n = matrix.length;
  const m = matrix[0]?.length;
  if (m !== n) {
    throw new Error("Matrix must be square");
  }
  const nodes = matrix.map((_, i) => ({
    index: -1,
    lowlink: -1,
    onStack: false,
    original: i,
  }));

  const tj = tarjanImpl<number>({
    *getNeighbors(v): IterableIterator<AugmentedNode<number>> {
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[v.original]![i]) {
          yield nodes[i]!;
        }
      }
    },
  });

  return tj(nodes);
};
