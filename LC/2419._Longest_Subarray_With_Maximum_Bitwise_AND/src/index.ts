export default function longestSubarray(nums: number[]): number {
  // O(n^2) solution is trivial
  // can we do O(n)?
  // AND is a decreasing operation, usually
  // the best you can get is if you AND two of the same value, you get the same value
  // in other cases, you usually get a value as most big as the smallest of the two
  // i guess this is why the answer is asking us to return the largest subarray
  // the easiest answer would be to find the max number in the array
  // in other words
  // the problem is actually asking us to find the largest subarray of repeating MAX values

  // 1. find max value
  const max = Math.max(...nums);

  // 2. find longest subarray of max
  let longest = 0;
  let current = 0;
  for (const num of nums) {
    if (num === max) {
      current++;
    } else {
      longest = Math.max(longest, current);
      current = 0;
    }
  }

  return Math.max(longest, current);
}
