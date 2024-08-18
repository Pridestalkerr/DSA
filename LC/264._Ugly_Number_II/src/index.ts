const bottomUp = (n: number) => {
  // following our analysis in the topDown fn
  const dp = new Array(n).fill(0);
  dp[0] = 1; // base case
  let p2 = 0; // 2^0
  let p3 = 0; // 3^0
  let p5 = 0; // 5^0

  for (let i = 1; i < n; ++i) {
    const fr2 = dp[p2];
    const fr3 = dp[p3];
    const fr5 = dp[p5];
    const next = Math.min(fr2 * 2, fr3 * 3, fr5 * 5);
    dp[i] = next;
    if (next === fr2 * 2) {
      // we incremented the frontier of 2
      ++p2;
    }
    if (next === fr3 * 3) {
      // we incremented the frontier of 3
      ++p3;
    }
    if (next === fr5 * 5) {
      // we incremented the frontier of 5
      ++p5;
    }
  }

  return dp[n - 1];
};

const topDown = (n: number) => {
  // what do we want this to achieve?
  // we enter a call with the triplet of powers i, j, k
  // we want to find the next ugly number in the sequence
  // its always i+1, so thats not enough information
  // look at the pattern below, we can split it into 3 cases, where each of the
  // denominators are in the lead
  // for 2:
  // 100 = 2
  // 200 = 4
  // 110 = 6 (DUPE ON 3)
  // 300 = 8
  // 101 = 10 (DUPE ON 5)
  // 210 = 12
  // 400 = 16
  // for 3:
  // 010 = 3
  // 110 = 6 (DUPE ON 2)
  // 020 = 9
  // 011 = 15 (DUPE ON 5)
  // for 5:
  // 001 = 5
  // 101 = 10 (DUPE ON 2)
  // 011 = 15 (DUPE ON 3)
  // 020 = 25
  // ==========
  // notice how for each denominator, the listed numbers is their tree frontier
  // we also have some dupes along the way as well, so we should tackle them
  // how do you increment this frontier?
  // first of all, assume we have P2, P3, P5, the respective pointers to the smallest frontiers
  // multiply all of those pointers by their respective denominators
  // you obtain a new set of frontiers, which havent been generated yet
  // take the smallest of those, its a new smallest value
  // the pointer chosen must now be incremented
  // basically you take the next smallest value after P2, we will multiply it again by 2 in the future
  // we do the same for all pointers
};

export default function nthUglyNumber(n: number): number {
  // goal is to efficiently compute sorted values of the
  // 2^i * 3^j * 5^k sequence
  // 2 > 3 > 2*2 > 5 > 2*3 > 2*2*2 > 3*3 > 5*2 > 2*2*3 > 3*5 > 2*2*2*2 > 2*2*5
  // 100
  // 010
  // 200
  // 001
  // 110
  // 300
  // 020
  // 101
  // 210
  // 210
  // 011
  // 400
  // i cant spot a trivial pattern here, beside a tree like structure
  // the power of 2 will have to grow post quadratically in order to keep up with the powers of 5
  // 5^10 = 9'765'625
  // 2^23 = 8'388'608
  // 5^x ~= 2^2x
  // ==================
  // lets discuss some other ideas
  // 1. brute force, nope TLE
  // 2. min heap, pop and push, we have dupes, as well as a lot of potential overhead
  // 3. recursion with heavy pruning or memoization, could work
  // 4. bottom up dp, explanation is in the topDown function
  return bottomUp(n);
}
