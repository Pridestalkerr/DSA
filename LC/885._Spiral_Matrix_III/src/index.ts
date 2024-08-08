export default function spiralMatrixIII(
  rows: number,
  cols: number,
  rStart: number,
  cStart: number,
): number[][] {
  return naive(rows, cols, rStart, cStart);
}

// we dont even need to care about the virtual moves
// the spiral will always be sequential
// const optimized = (rows: number, cols: number, rStart: number, cStart: number): number[][] => {};

// naive solution, it simulates the virtual moves
const naive = (rows: number, cols: number, rStart: number, cStart: number): number[][] => {
  // the problem is tricky because the spiral doesnt start in the center of the matrix
  // we could extend the matrix so that rStart and cStart are in the center
  // but that should be easily virtualized
  // question: can we perform the virtualization without looping over virtual values?
  // i.e. once we exit the matrix, can we return to the matrix without looping over the virtual values?

  // order of moves is RIGHT, DOWN, LEFT, UP
  // (i, j) => (i, j+1), (i+1, j), (i, j-1), (i-1, j)
  // the counter is incremented after 2 moves
  // so consider +1 and -1 times COUNTER, starting from 1

  // i < rows, j < cols
  // i >= 0, j >= 0
  // i and j can exceed these bounds
  // if i or j are outside bounds, perform the full move without iterating over every element

  // when do we exit?
  // when we perform 4 full virtual moves and i or j stay outside bounds
  const ans = new Array(rows * cols);
  let orderIdx = 0;
  let i = rStart;
  let j = cStart;
  let bp = 0; // when this reaches 3, we exit

  function* move(): Generator<[number, number]> {
    while (true) {
      yield [0, 1];
      yield [1, 0];
      yield [0, -1];
      yield [-1, 0];
    }
  }

  const getMove = move();
  let fullMoveSize = 0; // increment this after 2 moves
  let totalMoves = 0; // increment this after every move

  // this processes a FULL move in batch
  while (orderIdx < rows * cols) {
    // increment the counter
    // if we've performed 2 moves, increment the full move size
    if (totalMoves % 2 === 0) {
      fullMoveSize++;
    }
    totalMoves++;

    // get the current move, initially it will be RIGHT
    const [di, dj] = getMove.next().value;
    let currentMoveSize = fullMoveSize;

    // we can start a move while outside the matrix
    // move until we're inside the matrix (if possible)
    while (currentMoveSize > 0 && (i < 0 || i >= rows || j < 0 || j >= cols)) {
      i += di;
      j += dj;
      currentMoveSize--;
    }

    // while we're inside the matrix, move one by one
    while (i >= 0 && i < rows && j >= 0 && j < cols && currentMoveSize > 0) {
      ans[orderIdx++] = [i, j];

      // move one step
      i += di;
      j += dj;
      // decrement the current move size
      currentMoveSize--;
    }

    // were either outside the matrix or we've reached the end of the current move
    // if we have remaining moves, it means were outside the matrix, complete the move
    if (currentMoveSize > 0) {
      i += di * currentMoveSize;
      j += dj * currentMoveSize;
    }
  }

  return ans;
};
