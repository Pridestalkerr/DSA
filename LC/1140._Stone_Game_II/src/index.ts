// bruteforce negamax
const bruteforce = (piles: number[]): number => {
  const n = piles.length;

  const dfs = (i: number, m: number): number => {
    if (i >= n) {
      return 0; // no more stones, i dont think we hit it though
    }

    // were faced with the i-th pile
    // we can take from 1 to 2*m stones = k
    // player chooses k
    let maxScore = -Infinity;
    let rollingScore = 0;
    // early quit to not hit the base case too many times
    for (let k = 1; k <= Math.min(2 * m, n - i); k++) {
      rollingScore += piles[k + i - 1]!;
      // other player's score
      // he starts from the next stone we didnt pick
      const outcome = dfs(k + i, Math.max(m, k));
      const score = rollingScore - outcome;
      maxScore = Math.max(maxScore, score);
    }

    return maxScore;
  };

  const maxScore = piles.reduce((acc, cur) => acc + cur, 0);

  // ALICE + BOB = maxScore
  // ALICE - BOB = DFS(ALICE)
  // sum them
  // 2ALICE = maxScore + DFS(ALICE)
  // ALICE = (maxScore + DFS(ALICE)) / 2
  return (maxScore + dfs(0, 1)) >> 1;
};

const topDown = (piles: number[]): number => {
  const n = piles.length;
  // 2d memoization array for i and j in dfs of bruteforce fn
  const memo = Array.from({ length: n }, () => Array.from({ length: n }, () => -1));
  // base case where only alice can play, takes care of [1] edge case and other
  memo[n - 1]![1] = piles[n - 1]!;

  const dfs = (i: number, m: number): number => {
    if (i >= n || m > n) {
      // m will never be greater than n, but left it here for completeness
      return 0;
    }

    if (memo[i]![m] !== -1) {
      return memo[i]![m]!;
    }

    let maxScore = -Infinity;
    let rollingScore = 0;

    for (let k = 1; k <= Math.min(2 * m, n - i); k++) {
      rollingScore += piles[k + i - 1]!;
      const outcome = dfs(k + i, Math.max(m, k));
      const score = rollingScore - outcome;
      maxScore = Math.max(maxScore, score);
    }

    memo[i]![m]! = maxScore;
    return maxScore;
  };

  const maxScore = piles.reduce((acc, cur) => acc + cur, 0);
  return (maxScore + dfs(0, 1)) >> 1;
};

export default function stoneGameII(piles: number[]): number {
  // well, game theory
  // the goal of this problem is to solve the game
  // a game is solved when we know the optimal strategy for each player
  // the optimal strategy means exploring the entirety of the game tree
  // and pruning the branches that are not optimal
  // we could also use something like negamax with alpha-beta pruning
  // but the goal is not to simulate play, is to explore the tree all the way to the end
  // short term score maximization is not the goal

  // we start with bruteforce, we will be able to memoize it afterwards (TLE)
  //   return bruteforce(piles);

  // negamax bruteforce with memoization
  return topDown(piles);
}
