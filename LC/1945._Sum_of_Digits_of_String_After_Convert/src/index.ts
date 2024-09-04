export default function getLucky(s: string, k: number): number {
  // initial processing dominates the complexity
  // besides that, were basically adding sub 26 values, so no worry about big values
  const n = s.length;
  // k is >= 1, so we can handle the first iteration while processing the string
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const char = s.charCodeAt(i) - 96;
    sum += (char % 10) + Math.floor(char / 10);
  }

  while (k-- > 1) {
    let newSum = 0;
    while (sum > 0) {
      newSum += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = newSum;
  }

  return sum;
}
