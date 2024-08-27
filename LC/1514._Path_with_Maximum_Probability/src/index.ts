import { Heap } from "@dsa/heap";

export default function maxProbability(
  n: number,
  edges: [number, number][],
  succProb: number[],
  start_node: number,
  end_node: number,
): number {
  // an interesting formulation
  // we can still use dijkstra's algorithm
  // dijkstra's algorithm relies on the fact that the shortest path to a node is the shortest path to one of its neighbors + the edge weight
  // in other words, the path always grows
  // in our case, the total probability keeps decreasing, we can just invert the condition
  // floating point error is something to consider
  let ans = 0;

  // lets build a map from the edges, in case the graph is sparse
  const edgeMap = new Map<number, Map<number, number>>();
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i]!;
    const prob = succProb[i]!;
    if (!edgeMap.has(a)) {
      edgeMap.set(a, new Map());
    }
    if (!edgeMap.has(b)) {
      edgeMap.set(b, new Map());
    }
    edgeMap.get(a)!.set(b, prob);
    edgeMap.get(b)!.set(a, prob);
  }

  const dijkstra = () => {
    const source = start_node;
    const target = end_node;
    const dist = Array(n).fill(0); // 0 is Infinity
    dist[source] = 1; // max value
    const visited = new Set<number>();
    // sort the queue by the distance, doesnt need to be embedded
    const queue = new Heap<number>({ compare: (a, b) => dist[a] - dist[b] }, [source]);
    while (!queue.empty) {
      const curr = queue.pop()!;
      if (visited.has(curr)) continue;

      if (curr === target) {
        return dist[curr];
      }

      visited.add(curr);

      const neighbors = edgeMap.get(curr);
      if (!neighbors) continue;
      for (const [neighbor, prob] of neighbors.entries()) {
        if (visited.has(neighbor)) continue;

        const alt = dist[curr] * prob;
        if (alt > dist[neighbor]) {
          dist[neighbor] = alt;
          queue.push(neighbor);
        }
      }
    }
  };

  return dijkstra() ?? 0;
}
