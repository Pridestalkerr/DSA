export default function largestNumber(nums: number[]): string {
  // tldr, just alpha sort the numbers
  // "9" is bigger than "89999999"
  // theres some edge cases, like "30" and "3"
  // in this case we can just add the two numbers and we sort based on which order is bigger
  const sorted = nums.sort((a, b) => {
    const strA = String(a);
    const strB = String(b);
    return Number(strB + strA) - Number(strA + strB);
  });
  // gotta trim leading zeros
  return sorted.join("").replace(/^0+/, "") || "0";
}
