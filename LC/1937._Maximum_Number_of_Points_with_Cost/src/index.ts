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

const bottomUpOptimized = (points: number[][]) => {
  // baseline bottom up still gives TLE
  // its to be expected, the runtime is O(n * m^2)
  // goal would be to reduce the runtime to O(n * m)
  // how can we get rid of the k loop? can we perform some clever memo on it?
  // maybe a rolling sum?
  // for any currentRow[j], we can choose from all prevRow[k] - abs(j - k)
  // the goal is to maximize that value
  // picture the following prevRow: [1, 3, 5, 8]
  // for j = 0, the scores would be [1 - 0, 3 - 1, 5 - 2, 8 - 3] = [1, 2, 3, 5]
  // for j = 1, the scores would be [1 - 1, 3 - 0, 5 - 1, 8 - 2] = [0, 3, 4, 6]
  // lets abstract this problem below
  const n = points.length;
  const m = points[0]!.length;
  // pre initialize the first iteration
  let prevRow = Array.from(points[0]!);
  // initialize left and right arrays, iteration step is done within loop
  let LEFT = new Array(m);
  let RIGHT = new Array(m);

  for (let i = 1; i < n; ++i) {
    lrUtil(prevRow, LEFT, RIGHT);
    for (let j = 0; j < m; ++j) {
      prevRow[j] = points[i]![j]! + Math.max(LEFT[j], RIGHT[j]);
    }
  }

  // maximize at the end
  return Math.max(...prevRow);
};

const lrUtil = (arr: number[], left: number[], right: number[]) => {
  // populate left
  left[0] = arr[0]!;
  for (let i = 1; i < arr.length; ++i) {
    left[i] = Math.max(left[i - 1]! - 1, arr[i]!);
  }
  // populate right
  right[arr.length - 1] = arr[arr.length - 1]!;
  for (let i = arr.length - 2; i >= 0; --i) {
    right[i] = Math.max(right[i + 1]! - 1, arr[i]!);
  }
};

const abstract = (arr1: number[], arr2: number[]) => {
  // given arr1, and arr2, same size = N
  // compute arr3, where arr3[i] = arr2[i] + arr1[j] - abs(i - j), where arr3[i] is maximized
  // naive approach is O(N^2)
  // lets try and do it in linear time
  // for any arr2[i], the choices of arr1 decrease both on the left and right, linearly
  // we can keep a rolling sum starting from i = 0 all the way to N, decreasing by 1 on each step
  // at any point, if we encounter a new max, we can use that one and keep decreasing
  // we call this array LEFT
  // we do the same in reverse, call it RIGHT
  // example:
  // arr1: [1, 6, 2, 8]
  // arr2: [1, 2, 3, 4]
  // LEFT: [1, 6, 6-1, 8] = [1, 6, 5, 8]
  // RIGHT (in rev order): [8, 8-1, 8-2 = 6, 8 - 3 | 6 - 1 = 5] = [8, 7, 6, 5] = [5, 6, 7, 8]
  // arr3: [1 + 5, 2 + 6, 3 + 7, 4 + 8] = [6, 8, 10, 12]

  // implementation
  const N = arr1.length;
  const LEFT = new Array(N);
  const RIGHT = new Array(N);
  // populate ends
  LEFT[0] = arr1[0];
  RIGHT[N - 1] = arr1[N - 1];

  // populate LEFT
  for (let i = 1; i < N; ++i) {
    LEFT[i] = Math.max(LEFT[i - 1] - 1, arr1[i]!);
  }

  // populate RIGHT
  for (let i = N - 2; i >= 0; --i) {
    RIGHT[i] = Math.max(RIGHT[i + 1] - 1, arr1[i]!);
  }

  // compute arr3
  const arr3 = new Array(N);
  for (let i = 0; i < N; ++i) {
    arr3[i] = arr2[i]! + Math.max(LEFT[i], RIGHT[i]);
  }

  return arr3;
};

export default function maxPoints(points: number[][]): number {
  // fun little problem
  // theres clearly no "greedy" solution, or so youd think
  // lets start with a brute force solution (TLE)
  //   return bruteforce(points);

  // moving on to a top down approach with memoization (TLE)
  //   return topDown(points);

  // bottom up approach (TLE)
  //   return bottomUp(points);

  // optimized bottom up with left right rolling sum
  return bottomUpOptimized(points);
}
