export default function findMinDifference(timePoints: string[]): number {
  // quite boring question
  // just sort and find the minimum, also check ends to account for circularity
  // theres also the option of counting sort since input size is small (hh:mm)
  const n = timePoints.length;
  // convert to mins
  const minutes = timePoints.map((time) => {
    const [hh, mm] = time.split(":").map(Number);
    return hh! * 60 + mm!;
  });
  minutes.sort((a, b) => a - b);

  let minDiff = Infinity;
  for (let i = 1; i < n; i++) {
    minDiff = Math.min(minDiff, minutes[i]! - minutes[i - 1]!);
  }

  // check ends
  minDiff = Math.min(minDiff, 24 * 60 - minutes[n - 1]! + minutes[0]!);

  return minDiff;
}
