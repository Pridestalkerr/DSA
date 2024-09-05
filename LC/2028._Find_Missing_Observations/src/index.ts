export default function missingRolls(rolls: number[], mean: number, n: number): number[] {
  const m = rolls.length;
  const sum = rolls.reduce((acc, val) => acc + val, 0);
  const total = mean * (m + n);
  const missing = total - sum;
  if (missing < n || missing > 6 * n) {
    return [];
  }
  const res = Array(n).fill(1);
  let remaining = missing - n;
  for (let i = 0; i < n; i++) {
    const add = Math.min(5, remaining);
    res[i] += add;
    remaining -= add;
  }
  return res;
}
