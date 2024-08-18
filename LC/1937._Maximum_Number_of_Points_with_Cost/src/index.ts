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

const topDown = (points: number[][]) => {
  // replicate the bruteforce, except we memoize the results
  // we wont be passing a score variable, we will use the memo to maximize the score for each i, j
  // something becomes clear immediately, we only care about the previous (or next) row only
  // keep this in mind, we will also use it later to further optimize
  const n = points.length;
  const m = points[0]!.length;
  const memo = Array.from({ length: n }, () => Array(m).fill(-1));

  // every step of this function computes an entire row, which wont need readjusting later
  const dfs = (currRow: number, prevCol: number) => {
    // base
    if (currRow >= n) return 0; // nothing here

    // memo check
    if (prevCol !== -1 && memo[currRow]![prevCol]! !== -1) return memo[currRow]![prevCol]!;

    // maximize current row
    let max = 0;
    for (let k = 0; k < m; k++) {
      let decr = Math.abs(prevCol - k);
      let currScore = points[currRow]![k]!;
      if (prevCol === -1) {
        // this is the initial row, which gets computed at the end
        // maximization is current score (no need to adjust for step) + best of next row
        max = Math.max(max, currScore + dfs(currRow + 1, k));
      } else {
        // rest of the rows
        let adjustedScore = currScore - decr;
        max = Math.max(max, adjustedScore + dfs(currRow + 1, k));
      }
    }

    return max;
  };

  // start on row 0, and negative column
  return dfs(0, -1);
};

const bottomUp = (points: number[][]) => {
  // fun begins here
  // look at the top down approach, we only care about the previous row
  // this means we can make do with way less memory and call stacks
  const n = points.length;
  const m = points[0]!.length;
  // pre initialize the first iteration
  let prevRow = Array.from(points[0]!);

  for (let i = 1; i < n; ++i) {
    // we go row by row
    // we have previous values to work with, and we know their column
    // generating the next row involves finding the best adjusted previous row score
    // i dont think its doable in place, since theres cases where all the next iteration
    // would like the same previous column

    let currentRow = new Array(m);
    for (let j = 0; j < currentRow.length; ++j) {
      let max = 0;
      // go over previous scores, choose the best adjusted for current column
      for (let k = 0; k < m; ++k) {
        let decr = Math.abs(j - k);
        let adjustedScore = prevRow[k]! - decr;
        max = Math.max(max, adjustedScore);
      }
      // after max is computed, we add the current score
      currentRow[j] = points[i]![j]! + max;
    }
    // update prevRow
    prevRow = currentRow;
  }

  // maximize at the end
  return Math.max(...prevRow);
};

export default function maxPoints(points: number[][]): number {
  // fun little problem
  // theres clearly no "greedy" solution, or so youd think
  // lets start with a brute force solution (TLE)
  //   return bruteforce(points);

  // moving on to a top down approach with memoization
  //   return topDown(points);

  // bottom up approach
  return bottomUp(points);
}
