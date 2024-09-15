export default function findTheLongestSubstring(s: string): number {
  // as always, quadratic solution is trivial
  // can we do linear? or at least nlogn?
  // what about xor? a ^ a = 0 | a ^ a ^ a = a => even number of a means xor is 0
  // we only need 5 bits to represent 5 vowels
  const n = s.length;
  const prev = new Array<number>(32).fill(-2); // 2^5 = 32
  prev[0] = -1;

  let mask = 0;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === "a") mask ^= 1 << 0;
    else if (s[i] === "e") mask ^= 1 << 1;
    else if (s[i] === "i") mask ^= 1 << 2;
    else if (s[i] === "o") mask ^= 1 << 3;
    else if (s[i] === "u") mask ^= 1 << 4;

    if (prev[mask] !== -2) {
      ans = Math.max(ans, i - prev[mask]!);
    } else {
      prev[mask] = i;
    }
  }

  return ans;
}
