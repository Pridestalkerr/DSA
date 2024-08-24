const bigAbs = (a: bigint) => (a < 0n ? -a : a);

export default function nearestPalindromic(n: string): string {
  // dont even think about generating palindromes in a range
  // the constraints are too large
  // lets think about it
  // 1. powers of 10: 10, 100, 1000, 10000 etc
  //      - we can either increment or decrement: 11 or 9, 101 or 99
  //      - theyre equally distant
  // 1.Conclusion
  //      - theres numbers where we would like to decrement by 1
  // =============================================
  // 2. paylindromes
  //      - 121, 1221, 12321, 123321, 99999
  //      - we decrement or increment the middle digit
  //      - 121 -> 111, 131 | 1221 -> 1111, 1331 | 99999 -> 99899, 100099 (FAIL)
  // 2.Conclusion
  //      - theres numbers where we would like to increment or decrement the middle digits
  // =============================================
  // 3. paylyndromes whose middle digits are 0, 1, or 9
  //      - 11111, 9999, 100001
  //      - 11111 -> 11211 (increment)
  //      - 11111 -> 11011 (decrement)
  //      - 9999 -> incrementing here wont work, we would get 10109
  //          - we can still decrement though, 9889 (FAIL)
  //          - but thats not the closest, 10001 is, we get it by adding 2
  //      - 100001 -> should turn into 99999 (-2)
  //          - if we increment its bad
  //          - if we decrement we would get 100001 - 1000 - 100, which is not even a palyndrome
  // 3.Conclusion
  //      - theres numbers where we would like to just decrement or increment by 2
  // =============================================
  // 4. almost palyndrome, such as 9998, 9992, 1234311
  //      - 9998 -> +1 = 9999
  //      - 9992 -> +7 = 9999
  //      - 1234311 -> 12343|2|1 (+10)
  // 4.Conclusion
  //      - we always take the first half of the number, and see how we can change the latter part
  //      - EVERY number is an almost palyndrome, it can differ by at most 10^(len/2)
  // =============================================
  // Conclusion
  //      - assume N, and S = len(S)
  //      - CLOSEST palyndrome of size S+1 is 10^len(S) + 1
  //      - CLOSEST palyndrome of size S-1 is 10^len(S - 1) - 1
  //      - CLOSEST palyndrom of size S
  //            - assume N = [c1, c2, c3, ... cS]
  //            - Nleft = [c1, c2, ... cfloor(S/2)]
  //            - Nright = [cceil(S/2), ... CS]
  //            - we can construct a palyndrome by setting Nright to reverse(Nleft), call it NN
  //            - is NN closest to N? i think so, any other changes will make it not a palyndrome
  //      - finally, we have 3 choices, either we take S+1, S-1, or NN, pick closest
  //      - we pick the smallest if they tie
  //      - if Nleft === Nright, this means all digits are the same so prev construction wont work
  //      - it also means N is a palyndrome, we decrement middle digits
  //      - 88 -> 77
  //      - 666 -> 656
  //      - 6776 -> 6666
  //      - 5005 -> 5115 or 5005 - 100 - 10 = 4894 (we would like 5115, but why?)
  //      - actually, 4994 is closer, we get it by 5005 - 10 = 4995, and then we decr by 1
  //      - does this mean we should start by checking if middle is 0?, and then building Nright?
  //      - what about 8998 -> 8888 or 9009, we clearly want to increment here
  //      - i think easiest way is to just consider both Nleft - 1 and Nleft + 1
  const N = BigInt(n);
  const S = n.length;

  if (N <= 10n) return (N - 1n).toString(); // for one digit numbers
  if (N === 11n) return "9"; // for 11, 12 will be solved by NN down to 11

  const upperBound = {
    value: 10n ** BigInt(S) + 1n,
    diff: 10n ** BigInt(S) + 1n - N,
  };
  const lowerBound = {
    value: 10n ** BigInt(S - 1) - 1n,
    diff: N - (10n ** BigInt(S - 1) - 1n),
  };

  const NleftUpper = BigInt(n.slice(0, Math.ceil(S / 2))) + 1n; // includes middle
  const NleftLower = BigInt(n.slice(0, Math.ceil(S / 2))) - 1n; // includes middle
  const Nleft = BigInt(n.slice(0, Math.ceil(S / 2))); // this one is for non palyndromes

  const extendPalyndrome = (left: bigint) => {
    let ret = left;
    const odd = S % 2 === 1;
    if (odd) left /= 10n; // remove the middle digit, its useless
    while (left > 0n) {
      // extend
      ret = ret * 10n + (left % 10n);
      left /= 10n;
    }
    return ret;
  };

  const decrementMiddle = extendPalyndrome(NleftLower);
  const incrementMiddle = extendPalyndrome(NleftUpper);
  const notPalyndrome = extendPalyndrome(Nleft);

  const possible = [
    upperBound,
    lowerBound,
    { value: decrementMiddle, diff: bigAbs(N - decrementMiddle) },
    { value: incrementMiddle, diff: bigAbs(incrementMiddle - N) },
    { value: notPalyndrome, diff: bigAbs(N - notPalyndrome) },
  ];

  let ans = 0n;
  let minDiff = BigInt(Number.MAX_SAFE_INTEGER);
  for (const curr of possible) {
    if (curr.value === N) continue; // this happens with notPalyndrome
    if (curr.diff < minDiff || (curr.diff === minDiff && curr.value < ans)) {
      ans = curr.value;
      minDiff = curr.diff;
    }
  }

  console.log(possible);
  return ans.toString();
}
