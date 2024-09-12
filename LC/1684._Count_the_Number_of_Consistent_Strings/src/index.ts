export default function countConsistentStrings(allowed: string, words: string[]): number {
  // could use a hashmap and a quadratic time solution
  // we can do something a bit more clever
  // we have 26 letters
  // this means the state can be encoded withing 26 bits
  // thats basically a 32 bit integer
  let allowedState = 0;
  for (let i = 0; i < allowed.length; i++) {
    allowedState |= 1 << (allowed.charCodeAt(i) - 97);
  }

  let ans = 0;
  for (const word of words) {
    let state = 0;
    for (let i = 0; i < word.length; i++) {
      state |= 1 << (word.charCodeAt(i) - 97);
    }

    // check if subset
    if ((state & allowedState) === state) {
      ans++;
    }
  }

  return ans;
}
