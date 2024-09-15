export default function xorQueries(arr: number[], queries: number[][]): number[] {
  // 1. compute prefix xor
  // arr_0, arr_1, arr_2, arr_3, ..., arr_n
  // arr_0, arr_0 ^ arr_1, ..., arr_0 ^ ... ^ arr_n
  // xor_0, xor_1, xor_2, xor_3, ..., xor_n
  // 2. query math
  // xor_x = arr_0 ^ ... ^ arr_x
  // xor_y = arr_0 ^ ... ^ arr_y
  // x < y
  // xor_x ^ xor_y = arr_x ^ ... ^ arr_y
  // = (arr_0 ^ ... ^ arr_y) ^ (arr_0 ^ ... ^ arr_x)
  // = arr_x ^ ... ^ arr_y
  // a ^ a = 0
  const n = arr.length;
  if (n === 0) return [];
  const xorPrefix = new Array<number>(n + 1);
  xorPrefix[0] = 0; // helps with the xor query below, removes an if check
  for (let i = 0; i < n; i++) {
    xorPrefix[i + 1] = xorPrefix[i]! ^ arr[i]!;
  }

  const m = queries.length;
  const res = new Array<number>(m);
  for (let i = 0; i < m; i++) {
    const [x, y] = queries[i]!;
    res[i] = xorPrefix[x!]! ^ xorPrefix[y! + 1]!;
  }

  return res;
}
