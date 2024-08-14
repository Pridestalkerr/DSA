export default function smallestDistancePair(nums: number[], k: number): number {
  // only one solution for today as i need to head out
  // find k-th absolute pair
  // sort the array, call it S
  // let d(i, j) = ABS(S[j] - S[i]), i < j, distance between S[i] and S[j]
  // let MAX = d(n - 1, 0), largest pair in S
  // let PV = [0, MAX] - the range of possible values for all the pairs
  // for any x in PV, let D[x] =
  // let D = [int], where D
  // for any i, the number of pairs in [0, i] with distance <= S[i] is the number of pairs in [j, i]
  //   such that S[i] - S[j] <= S[i]
}
