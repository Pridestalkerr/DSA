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
  // we will obtain the shortest possible path
  // now, this shortest path can be smaller than target
  // we can just increase the weight of a modifiable edge
  // but that could make it so that its no longer the shortest path
  // to solve this:
  //  - first run dijkstra with Math.abs(weight) to find shortest distances possible
  //  - then we run it again, everytime we encounter a modifiable edge, we increase it by leftover
  //  - if at any point this value is greater than the shortest, then we stop and return []

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

  // 2. dijkstra, calculate the shortest possible distances, Math.abs(weight)
  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;
  // lazy queue
  const visited = new Set<number>();
  const queue = new Heap({ compare: (a, b) => b.weight - a.weight }, [{ node: source, weight: 0 }]);
  while (!queue.empty) {
    const curr = queue.pop()!;
    if (visited.has(curr.node)) {
      continue;
    }
    visited.add(curr.node);
    const neighbors = graph.get(curr.node);
    if (!neighbors) {
      continue;
    }
    for (const [neighbor, weight] of neighbors.entries()) {
      const newDist = dist[curr.node] + Math.abs(weight);
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        queue.push({ node: neighbor, weight: newDist });
      }
    }
  }

  console.log(dist);

  if (dist[destination] > target) {
    return []; // nothing we can do here, shortest path is already greater than target
  }

  // quick exit, when shortest path is already target
  if (dist[destination] === target) {
    return EDGES.map(([from, to, weight]) => [from, to, Math.abs(weight)]);
  }

  // so far weve calculated the shortest possible distances by setting all weights to positive
  // lets calculate the leftoever value, it will be strictly positive because of the previous checks
  const diff = target - dist[destination];

  // we now have to run dijkstra again, but this time we will attempt to modify edges by leftover
  // we have access to the shortest distances at any time, in dist
  // if we encounter a modifiable edge, instead of just setting it to +1,
  // we will bump up that edge so that it matches the expected leftover distance
  // we do this for EVERY modifiable edge, we end up with all the possible paths
  // where the first time we hit the modifiable edge, that one is increased
  const dist2 = new Array(n).fill(Infinity);
  dist2[source] = 0;
  const visited2 = new Set<number>();
  const queue2 = new Heap({ compare: (a, b) => b.weight - a.weight }, [
    { node: source, weight: 0 },
  ]);

  while (!queue2.empty) {
    const curr = queue2.pop()!;
    if (visited2.has(curr.node)) {
      continue;
    }
    visited2.add(curr.node);
    const neighbors = graph.get(curr.node);
    if (!neighbors) {
      continue;
    }
    for (const [neighbor, weight] of neighbors.entries()) {
      let w = Math.abs(weight);
      const shortestToNeighbor = dist[neighbor]; // this is dist[curr.node] + Math.abs(weight)
      // take this value, by how much should we increase it to expect leftover?
      const currDist = dist2[curr.node];
      // we must match these somehow
      if (weight < 0) {
        // attempt to increase the current edge
        // shortestDist = dist[curr.node] + Math.abs(weight)
        // newWeight = dist[curr.node] + Math.abs(weight) + diff - dist[neighbor]
        // maybe we cant increase it
        const newWeight = diff + shortestToNeighbor - currDist;
        if (newWeight > w) {
          // save the biggest one
          w = newWeight;
          neighbors.set(neighbor, w);
          // other way around as well just to be sure
          const other = graph.get(neighbor);
          if (other) {
            other.set(curr.node, w);
          }
        }
      }
      const newDist = dist2[curr.node] + w;
      if (newDist < dist2[neighbor]) {
        dist2[neighbor] = newDist;
        queue2.push({ node: neighbor, weight: newDist });
      }
    }
  }

  console.log(dist2);

  // weve now obtained the shortest distance by attempting to increase all possible paths
  // if this value is still smaller than target, then it means theres a shorter path that we cant modify
  if (dist2[destination] < target) {
    return [];
  }

  return EDGES.map(([from, to, weight]) => [from, to, Math.abs(weight)]);
}
