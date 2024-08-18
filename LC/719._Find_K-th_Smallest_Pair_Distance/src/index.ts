export default function smallestDistancePair(nums: number[], k: number): number {
  // only one solution for today as i need to head out
  // find k-th absolute pair
  // sort the array, call it S => S[i] <= S[j], for any i < j
  // let Dist(i, j) = |S[i] - S[j]| , (distance of pair)
  // for any S, Max(Dist) = Dist(S.length - 1, 0)
  // => for any S'[x, ..., y] => Max is Dist(y, x)
  // in other words, for any index i, the max dist is the pair with j as small as possible
  // let D = {Dist(i, j), i < j} = MULTISET of all possible values stemming from S
  // for any i < j, Dist(i, j) <= Dist(i + 1, j), in other words, Dist for any 2 bounds decreases monotonously
  // GUESS G, a random choice, between 0 and MAX, it could or not belong to D
  // number of Dist(x, y) <= G is Sum{i->n}(j - i - 1) where Dist(j, i) <= G
  // basically the length of the subarray whose edges subtraction is less than it (because it just keeps decreasing as the left side grows)
  // Goal now becomes finding G such that Dist(x, y) <= G is k

  // steps to follow
  // 1. sort the array
  // 2. binary search from 0 to MAX
  // 3. mid is G
  //   - for any i
  //      - find j such that Dist(i, j) <= k
  //      - count for G increases by j - i - 1 (len of subarray)
  // 4. repeat until G === k

  nums.sort((a, b) => a - b);
  const S = nums;

  const Dist = (i: number, j: number) => Math.abs(S[i]! - S[j]!);
  const amountOfPairsSmallerThanG = (g: number) => {
    let ans = 0;
    let j = 1;
    for (let i = 0; i < n; ++i) {
      while (j < n && Dist(i, j) <= g) {
        j++; // slide it up until the distance becomes greater than g
      }
      // we surpassed g, decrement pos of j and calculate length of subarray
      ans += j - 1 - i;
    }
    return ans;
  };

  const n = nums.length;
  let left = 0;
  let right = Dist(n - 1, 0);

  while (left < right) {
    const mid = (left + right) >> 1; // mid is our GUESS
    if (amountOfPairsSmallerThanG(mid) < k) {
      left = mid + 1;
    } else {
      // this needs to converge to the answer
      right = mid;
    }
  }

  return left;
}
