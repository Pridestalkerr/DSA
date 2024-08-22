export default function findComplement(num: number): number {
  // index of the most significant set bit
  // for 5 (101) that would be 2
  const clz = Math.clz32(num);
  // for 5, mask would be 100, decrease it by 1 to get 011
  const mask = (1 << (32 - clz)) - 1;
  // for 5, flipped would be 11111111111111111111111111111010
  const flipped = ~num;

  // for 5, flipped & mask would be 10
  return flipped & mask;
}
