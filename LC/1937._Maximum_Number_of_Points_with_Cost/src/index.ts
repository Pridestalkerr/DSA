const bruteforce = (points: number[][]) => {
  const n = points.length;
  const m = points[0]!.length;
  // wwe want this function to take in a specific position in the matrix
  // we consider that position as our choice
  // we then recurse to the next rows, with the score, and subtract from it
  const dfs = (i: number, j: number, score: number): number => {
    if (i >= n || j >= m) return score; // no points there bud

    score += points[i]![j]!; // add current score
    // go to the next row
    let max = 0;
    for (let k = 0; k < m; k++) {
      let decr = Math.abs(j - k);
      max = Math.max(max, dfs(i + 1, k, score - decr));
    }
    return max;
  };
  let max = 0; // points in matrix are non-negative
  for (let i = 0; i < m; i++) {
    max = Math.max(max, dfs(0, i, 0));
  }
  return max;
};

export default function maxPoints(points: number[][]): number {
  // fun little problem
  // theres clearly no "greedy" solution, or so youd think
  // lets start with a brute force solution (TLE)
  return bruteforce(points);
}
