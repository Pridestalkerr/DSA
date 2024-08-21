const bruteforce = (s: string): number => {
  // lets first remove all consecutive dupes as theyre irrelevant
  let trimmed = s[0]!;
  for (const c of s) {
    if (c !== trimmed![trimmed.length - 1]) {
      trimmed += c;
    }
  }
  const n = trimmed.length;

  // problem now becomes
  // consider bcb
  // we could print b, then c, then b
  // but we could also print bbb, and then c in the middle
  // what do we wnat this to do?
  // given a substring s[left:right] we want to know the minimum number of operations to print it
  // this means dfs(0, n - 1) is our answer
  const dfs = (left: number, right: number) => {
    if (left >= right) {
      return 0; // base case, nothing to print
    }

    // now, we take character at left, and choose to print it all the way up to right
    // we recurse everytime and take the best result
    // i.e. lets say the curr character is 'b', and the remainder is 'cabab'
    // we could print 'b' and then recurse on 'caba'
    // we could print 'bbbb' and recurse on 'a'
    // we could print 'bbbbb' and recurse on 'nothing'
    // to note, its pointless to print 'bb' because we dont achieve anything, so we can trim those
    let best = Infinity; // we minimize this
    // curr character is trimmed[left]
    // next character is at trimmed[i] = trimmed[left + k], k >= 1
    for (let i = left + 1; i <= right; ++i) {
      const leftRes = dfs(left, i - 1);
      const rightRes = dfs(i, right);
      let currRes = leftRes + rightRes;
      if (trimmed[i] !== trimmed[left]) {
        // we also need to print the current character
        currRes++;
      }
      best = Math.min(best, currRes);
    }

    return best;
  };

  // add one, we need to consider the starting character (the inner loop starts at left + 1 = 1)
  return dfs(0, n - 1) + 1;
};

export default function strangePrinter(s: string): number {
  // damn, this is a tough one
  // lets just straight into bruteforce to get an idea of what were dealing with
  return bruteforce(s); // (TLE)
}
