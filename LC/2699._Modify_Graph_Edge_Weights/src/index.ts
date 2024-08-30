import { Heap } from "@dsa/heap";

export default function modifiedGraphEdges(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
  target: number,
): number[][] {
  const EDGES = edges as [number, number, number][]; // make ts happy
  // sort of a poorly formulated problem
  // theres 2 options, either it works, or it doesnt
  // if it doesnt work, then we return []
  // in the other case
  // we assume it works, we change all negative weights to 1
  // all thats left is to pathfind from source to destination
  // we only have to change a single edge
  // if this value is smaller than target, then were set since we can choose any value
  // we then return the modified edges (all negs to 1) and the one edge with leftover value
  // dijkstra will find the shortest path
  // our only issue is when theres multiple paths with the same weight
  // for example, our modified edges have a weight of 1
  // but other edges can too
  // if theres 2 identical paths, we sort of have to soft force the path to go through the
  // edge we modified
  // we can stop dijkstra as soon as we have the shortest path
  // we can keep a track of one of the modified edges that contributed

  // 1. process the edges
  // ill be using a map representation
  // source => destination => weight
  const graph = new Map<number, Map<number, number>>();
  for (const edge of EDGES) {
    const [from, to, weight] = edge;
    // outgoing
    if (!graph.has(from)) {
      graph.set(from, new Map());
    }
    graph.get(from)!.set(to, weight);

    // incoming
    if (!graph.has(to)) {
      graph.set(to, new Map());
    }
    graph.get(to)!.set(from, weight);
  }

  // lets postpone the update of -1 to 1, we will have a check within dijkstra
  // helps us know which nodes we can modify instead of keeping a set of them

  // 2. dijkstra
  const dist = new Array(n).fill(Infinity);
  // we will be using this to find the path at the end, and check if it has a modified edge
  const prev = new Array(n).fill(undefined);
  dist[source] = 0;
  // lazy queue
  const visited = new Set<number>();
  const queue = new Heap({ compare: (a, b) => b.weight - a.weight }, [{ node: source, weight: 0 }]);
  while (!queue.empty) {
    const curr = queue.pop()!;
    if (visited.has(curr.node)) {
      continue;
    }
    if (curr.node === destination) {
      break;
    }
    visited.add(curr.node);
    const neighbors = graph.get(curr.node);
    if (!neighbors) {
      continue;
    }
    for (const [neighbor, weight] of neighbors.entries()) {
      const newDist = dist[curr.node] + Math.abs(weight);
      if (newDist < dist[neighbor]) {
        prev[neighbor] = [neighbor, curr.node, weight]; // these should be checked at the end
        dist[neighbor] = newDist;
        queue.push({ node: neighbor, weight: newDist });
      } else if (newDist === dist[neighbor] && weight < 0) {
        // tie, and negative edge, we take it!
        prev[neighbor] = [neighbor, curr.node, weight];
        dist[neighbor] = newDist;
        queue.push({ node: neighbor, weight: newDist });
      }
    }
  }

  if (dist[destination] > target) {
    return []; // nothing we can do here, we cant decrease values of the weights
  }

  console.log(dist[destination]);

  // 3. figure out if the shortest path has a modified edge
  // we for sure have a path, since the graph is connected
  // backtrack on prev
  let hasModifiedEdge = false;
  let modifiedEdge = undefined;
  if (prev[destination] === undefined) {
    return []; // will never happen but left for clarity
  } else {
    let u = prev[destination];
    // source is different than destination so no need to check
    while (u) {
      if (u[2] < 0) {
        // we have a modified edge
        hasModifiedEdge = true;
        modifiedEdge = u;
        break;
      }
      // keep going up
      const parent = u[1]; // curr.node is where it came from
      u = prev[parent];
    }
  }

  // 4. return if no modified edge available
  if (!hasModifiedEdge) {
    return [];
  }

  // 5. return all the edges, and the first modified edge we find with leftover value
  for (const edge of EDGES) {
    edge[2] = Math.abs(edge[2]);
    const [from, to, _] = edge;
    if (
      (from === modifiedEdge[1] && to === modifiedEdge[0]) ||
      (from === modifiedEdge[0] && to === modifiedEdge[1])
    ) {
      // edge case, this can be negative, taken into account as soon as we exit dijkstra
      edge[2] = target - dist[destination] + 1;
    }
  }

  return EDGES;
}
