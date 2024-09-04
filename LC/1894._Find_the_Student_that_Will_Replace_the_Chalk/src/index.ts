export default function chalkReplacer(chalk: number[], k: number): number {
  // hmmm, the interesting part is the fact that k can be very large
  // compared to the chalk each student uses
  // lets reduce it to us having to iterate at max twice
  let n = chalk.length;
  let sum = 0;
  // sum up the chalk values
  for (let i = 0; i < n; i++) {
    sum += chalk[i]!;
    if (sum > k) {
      // we can stop here, i dont think tests will have this case though
      return i;
    }
  }

  let remainder = k % sum;
  // once more, this time it will exit for sure
  for (let i = 0; i < n; i++) {
    remainder -= chalk[i]!;
    if (remainder < 0) {
      return i;
    }
  }

  // shouldnt happen but just in case
  return 0;
}
