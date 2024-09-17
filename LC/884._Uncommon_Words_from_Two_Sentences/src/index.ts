export default function uncommonFromSentences(s1: string, s2: string): string[] {
  // could use some set operations
  // but easiest answer should be just a hashmap with some indicator
  // linear time complexity
  const w1 = s1.split(" ");
  const w2 = s2.split(" ");
  const map = new Map<string, number>();
  for (const word of w1) {
    map.set(word, (map.get(word) || 0) + 1);
  }
  for (const word of w2) {
    map.set(word, (map.get(word) || 0) + 1);
  }
  const res: string[] = [];
  for (const [word, count] of map) {
    if (count === 1) res.push(word);
  }
  return res;
}
