import { factorize } from "@dsa/factorization";

export default function minSteps(n: number): number {
  // for some reason this problem is categorized as DP
  // my intuition had more to do with prime factorization
  // say you have n = 2^3 * 3^4
  // we can build the first term by:
  // 1. copy (A)
  // 2. paste (AA)
  // 3. copy (AA)
  // 4. paste (AAAA)
  // 5. paste (AAAAAA)
  // 6. paste (AAAAAAAA) // 8 = 2^3
  // repeat paste 3-1 times (1st power of 3)
  // 7. copy (8A) (cp:8A)
  // 8. paste (8A+8A=16A) (cp:8A)
  // 9. paste (24A) (cp:8A) = 2^3 * 3
  // now we copy again, and paste 3-1 times (2st power of 3)
  // 10. copy (24A) (cp:24A)
  // 11. paste (24A+24A=48A) (cp:24A)
  // 12. paste (72A) (cp:24A) = 2^3 * 3^2
  // again (3rd power of 3)
  // 13. copy (72A) (cp:72A)
  // 14. paste (72A+72A=144A) (cp:72A)
  // 15. paste (216A) (cp:72A) = 2^3 * 3^3
  // again (4th power of 3)
  // 16. copy (216A) (cp:216A)
  // 17. paste (216A+216A=432A) (cp:216A)
  // 18. paste (648A) (cp:216A) = 2^3 * 3^4 = done

  // i think formula is
  // 2*3 + 3*4 = 18

  // get prime factorization of n
  const factors = factorize(n);
  if (factors.length === 1) {
    // possible prime
    if (factors[0]![0] === n) {
      return n; // defo a prime
    }
  }
  // sum the prime factors
  let ans = 0;
  for (const [factor, power] of factors) {
    ans += factor * power;
  }
  return ans;
}
