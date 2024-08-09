// fairly uninteresting problem
// could use a sliding window because only an entire column or row can change at a time
// diagonal sum will have to always be recomputed
// its also not a big gain since the grid is only 3x3, so its still constant time
// wouldve been a more interesting problem if the grid was nxn with different sum conditions
// theres a limited amount of 3x3 combinations that can be magic squares
// can put them in a hashmap and just quickly check instead of summing

const hashmap = (grid: number[][]): number => {
  const n = grid.length;
  const m = grid[0]!.length;
  if (n < 3 || m < 3) return 0; // we dont even have a large enough grid
  let ans = 0;

  // theres only 8 possible magic squares
  // an additional optimization, notice how the middle of the magic square is always 5
  // can use this fact to skip many checks
  const magicSquares = [
    [2, 7, 6, 9, 5, 1, 4, 3, 8],
    [2, 9, 4, 7, 5, 3, 6, 1, 8],
    [4, 3, 8, 9, 5, 1, 2, 7, 6],
    [4, 9, 2, 3, 5, 7, 8, 1, 6],
    [6, 1, 8, 7, 5, 3, 2, 9, 4],
    [6, 7, 2, 1, 5, 9, 8, 3, 4],
    [8, 1, 6, 3, 5, 7, 4, 9, 2],
    [8, 3, 4, 1, 5, 9, 6, 7, 2],
  ];

  // we can build a trie to store the magic squares, it will be the same amount of memory
  // it allows us to check the current grid iteratively, instead of building a key
  type Trie = {
    [key: number]: Trie;
    ok?: boolean;
  };
  const trie: Trie = {};

  // build the trie
  for (const square of magicSquares) {
    let node = trie;
    for (let i = 0; i < square.length; i++) {
      const num = square[i]!;
      if (!node[num]) {
        node[num] = {};
      }
      node = node[num];
    }
    node.ok = true;
  }

  // check the entire grid now
  for (let i = 0; i < n - 2; i++) {
    for (let j = 0; j < m - 2; j++) {
      // early middle check
      if (grid[i + 1]![j + 1] !== 5) {
        continue;
      }
      // check the trie for our current grid, will do it iteratively
      let t = trie;
      for (let x = i; x < i + 3; x++) {
        for (let y = j; y < j + 3; y++) {
          if (!t[grid[x]![y]!]) {
            // cant go down the trie
            break;
          }
          t = t[grid[x]![y]!]!;
        }
      }
      if (t.ok) {
        ans++;
      }
    }
  }

  return ans;
};

export default function numMagicSquaresInside(grid: number[][]): number {
  return hashmap(grid);
}

const generateMagicSquares = () => {
  const sq = [] as number[][];
  // lets just use backtracking and generate all possible 3x3 magic squares
  const bt = (row: number, col: number, grid: number[]) => {
    if (row === 3) {
      // check if its a magic square
      const sum = grid[0]! + grid[1]! + grid[2]!;
      if (
        grid[3]! + grid[4]! + grid[5]! === sum &&
        grid[6]! + grid[7]! + grid[8]! === sum &&
        grid[0]! + grid[3]! + grid[6]! === sum &&
        grid[1]! + grid[4]! + grid[7]! === sum &&
        grid[2]! + grid[5]! + grid[8]! === sum &&
        grid[0]! + grid[4]! + grid[8]! === sum &&
        grid[2]! + grid[4]! + grid[6]! === sum
      ) {
        sq.push([...grid]);
      }
      return;
    }

    if (col === 3) {
      bt(row + 1, 0, grid);
      return;
    }

    for (let i = 1; i <= 9; i++) {
      if (grid.includes(i)) continue;
      grid[row * 3 + col] = i;
      bt(row, col + 1, grid);
      grid[row * 3 + col] = 0;
    }
  };

  bt(0, 0, new Array(9).fill(0));
  console.log(sq);
};
