export default function construct2DArray(original: number[], m: number, n: number): number[][] {
  // boring one
  // its not clearly specified, but if the dimenstions wont match, then we just return []
  if (m * n !== original.length) return [];

  const res = Array.from({ length: m }, () => Array(n));

  let row = 0;
  let col = 0;
  for (const item of original) {
    res[row]![col] = item;
    col++;
    if (col === n) {
      row++;
      col = 0;
    }
  }

  return res;
}
