export default function minBitFlips(start: number, goal: number): number {
  let changes = start ^ goal; // xor it, all 1s need to be flipped
  // count those bits
  let count = 0;
  while (changes > 0) {
    if (changes & 1) {
      count++;
    }
    changes >>= 1;
  }
  return count;
}
