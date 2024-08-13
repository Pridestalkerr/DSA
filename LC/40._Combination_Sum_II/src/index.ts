const bruteforce = (candidates: number[], target: number): number[][] => {
  // lets start with bruteforce approach and see if we can spot some memoization
  const result: number[][] = [];
  const n = candidates.length;
  candidates.sort((a, b) => a - b);

  const bt = (i: number, arr: number[], currSum: number) => {
    if (currSum === target) {
      // Case 1. sum completed, no need to proceed forward since we have positive integers
      result.push(Array.from(arr));
      return;
    }

    if (currSum > target || i >= n) {
      // Case 2. sum exceeded, or out of bounds, terminate
      return;
    }

    // Case 3. currSum < target
    // 2 options, we either pick include the element, or we dont

    // Case 3.a. include the element, duplicate elements are allowed
    const newSum = currSum + candidates[i]!;
    arr.push(candidates[i]!);
    bt(i + 1, arr, newSum);
    arr.pop(); // this will backtrack, reducing the array to what was initially given

    // Case 3.b. exclude the element
    // we must also exclude all consecutive duplicates
    while (i < n - 1 && candidates[i] === candidates[i + 1]) {
      i++;
    }
    bt(i + 1, arr, currSum);
  };

  bt(0, [], 0);

  return result;
};

export default function combinationSum2(candidates: number[], target: number): number[][] {
  return bruteforce(candidates, target);
}
