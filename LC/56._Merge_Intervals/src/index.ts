import { quicksort } from "@dsa/quicksort";

export default function merge(intervals: number[][]): number[][] {
  // pretty easy, just sort the intervals by start time
  // all overlaps will be one after the other

  const INTERVALS = intervals as [number, number][];
  quicksort(INTERVALS, {
    compare: (a, b) => a[0] - b[0],
  });

  const result: [number, number][] = [];

  let current = INTERVALS[0]!;
  for (let i = 1; i < INTERVALS.length; i++) {
    const interval = INTERVALS[i]!;
    if (current[1] >= interval[0]) {
      // they overlap, merge them
      current[1] = Math.max(current[1], interval[1]);
    } else {
      // no overlap, add the current one and start a new one
      result.push(current);
      current = interval;
    }
  }
  result.push(current);

  return result;
}
