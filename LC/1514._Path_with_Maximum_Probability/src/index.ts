import { Heap } from "@dsa/heap";

const convert = (a: number) => Math.log(a);
const unpack = (a: number) => Math.exp(a);

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

  // we'll deal with floating point errors by converting to log and summing values instead
  // log(a * b) = log(a) + log(b)
  // e^(log(x)) = x
  // P = p1 * p2 * p3 * ... * pn
  // log(P) = log(p1 * p2 * p3 * ... * pn)
  // log(P) = log(p1) + log(p2) + log(p3) + ... + log(pn)
  // e^(log(P)) = P
  // P = e^(log(p1) + log(p2) + log(p3) + ... + log(pn))
  // P = e^(log(p1)) * e^(log(p2)) * e^(log(p3)) * ... * e^(log(pn))
  // P = p1 * p2 * p3 * ... * pn
  for (let i = 0; i < succProb.length; i++) {
    succProb[i] = convert(succProb[i]!);
  }

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
    const dist = Array(n).fill(convert(0)); // 0 is Infinity
    dist[source] = convert(1); // max value
    const visited = new Set<number>();
    // sort the queue by the distance, doesnt need to be embedded
    const queue = new Heap<{ node: number; prob: number }>({ compare: (a, b) => a.prob - b.prob }, [
      { node: source, prob: dist[source] },
    ]);
    while (!queue.empty) {
      const curr = queue.pop()!;
      if (visited.has(curr.node)) continue;

      if (curr.node === target) {
        return dist[curr.node];
      }

      visited.add(curr.node);

      const neighbors = edgeMap.get(curr.node);
      if (!neighbors) continue;
      for (const [neighbor, prob] of neighbors.entries()) {
        if (visited.has(neighbor)) continue;

        // const alt = dist[curr] * prob;
        const alt = curr.prob + prob;
        // invert the relation, since were still decreasing probs
        if (alt > dist[neighbor]) {
          dist[neighbor] = alt;
          queue.push({ node: neighbor, prob: alt });
        }
      }
    }
  };

  return unpack(dijkstra() ?? convert(0));
}
