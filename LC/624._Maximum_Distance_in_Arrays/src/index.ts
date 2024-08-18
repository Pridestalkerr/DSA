export default function maxDistance(arrays: number[][]): number {
  // this problem is only tricky because we cant choose from the same array
  // we can solve this by keeping track of the leftmost and rightmost values
  // as well as the best distance we have so far
  // this distance wont reflect the previous ends
  // we use those ends to figure out which side we should expand with our single choice from every array

  // not sure about these, the distance is technically Infinity, need to make sure dist is calculated after we repopulate min and max
  // alternatively, set them to the ends of the first array, dist remains 0 since we cant form a distance with a single array
  let min = arrays[0]![0]!;
  let max = arrays[0]![arrays[0]!.length - 1]!;
  let dist = 0;

  for (const arr of arrays.splice(1)) {
    const currMin = arr[0]!;
    const currMax = arr[arr.length - 1]!;
    // new distances choosing to expand either front or back
    const expandFront = max - currMin;
    const expandBack = currMax - min;
    // choose the best
    dist = Math.max(dist, expandFront, expandBack);

    // propagate ends
    min = Math.min(min, currMin);
    max = Math.max(max, currMax);
  }

  return dist;
}
