type Point = {
  x: number;
  y: number;
};

// takes a point and checks if we can reach it again moving in any direction
function canFormLoop(grid: number[][], start: Point): boolean {
  const m = grid.length;
  const n = grid[0]!.length;
  const visited = new Set<string>();

  function dfs(x: number, y: number, parent: Point | null): boolean {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x]![y] === 0) {
      return false;
    }
    const key = `${x},${y}`;

    if (visited.has(key)) {
      return x === start.x && y === start.y;
    }

    visited.add(key);

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ] as const;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (parent && newX === parent.x && newY === parent.y) {
        continue;
      }

      if (dfs(newX, newY, { x, y })) {
        return true;
      }
    }

    return false;
  }

  return dfs(start.x, start.y, null);
}

// checks if the point can form a split between two vertical or horizontal islands
function potentialSplit(grid: number[][], start: Point): boolean {
  const n = grid.length;
  const m = grid[0]!.length;
  const isTopRow = start.x === 0;
  const isBottomRow = start.x === n - 1;
  const isLeftCol = start.y === 0;
  const isRightCol = start.y === m - 1;
  if (n === 1 && m === 1) return false; // nothing to check

  // vertical checks
  if (isTopRow) {
    // check if row below is 0
    if (grid[start.x + 1]![start.y] === 0) return true;
  } else if (isBottomRow) {
    // check if row above is 0
    if (grid[start.x - 1]![start.y] === 0) return true;
  } else {
    // middle row, check both
    if (grid[start.x - 1]![start.y] === 0 && grid[start.x + 1]![start.y] === 0) return true;
  }

  // horizontal checks
  if (isLeftCol) {
    // check if col to the right is 0
    if (grid[start.x]![start.y + 1] === 0) return true;
  } else if (isRightCol) {
    // check if col to the left is 0
    if (grid[start.x]![start.y - 1] === 0) return true;
  } else {
    // middle col, check both
    if (grid[start.x]![start.y - 1] === 0 && grid[start.x]![start.y + 1] === 0) return true;
  }

  // theres another possible split, diagonally
  if (isTopRow) {
    // only need to check below
    if (isLeftCol && grid[start.x + 1]![start.y + 1] === 0) {
      return true;
    } else if (isRightCol && grid[start.x + 1]![start.y - 1] === 0) {
      return true;
    } else {
      // check both
      if (grid[start.x + 1]![start.y + 1] === 0 && grid[start.x + 1]![start.y - 1] === 0)
        return true;
    }
  } else if (isBottomRow) {
    // only need to check above
    if (isLeftCol && grid[start.x - 1]![start.y + 1] === 0) {
      return true;
    } else if (isRightCol && grid[start.x - 1]![start.y - 1] === 0) {
      return true;
    } else {
      // check both
      if (grid[start.x - 1]![start.y + 1] === 0 && grid[start.x - 1]![start.y - 1] === 0)
        return true;
    }
  } else {
    // middle case, check the 2 diagonals
    if (grid[start.x + 1]![start.y + 1] === 0 && grid[start.x - 1]![start.y - 1] === 0) return true;
    if (grid[start.x + 1]![start.y - 1] === 0 && grid[start.x - 1]![start.y + 1] === 0) return true;
  }

  return false;
}

export const optBruteforce = (grid: number[][]): number => {
  // 1. check if the grid is already disconnected
  //   - if so, return 0
  // 2. iterate all island cells, and check on how many sides theyre connected
  //   - if we find a cell that is connected on 1 side only, we can break
  //   - otherwise, the answer is always 2 (youll find this cell eventually)
  // 3. edge case
  //   - ans is 1, but we only have 2 island cells => ans is 2
  const unvisited = new Set<string>();
  const n = grid.length;
  const m = grid[0]!.length;
  let islandCount = 0;
  // populate unvisited, also count island cells
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const c = grid[i]![j];
      if (c === 1) {
        islandCount++;
        unvisited.add(`${i},${j}`);
      }
    }
  }

  // make a copy for later
  const islands = new Set<string>([...unvisited]);

  // early exit for no islands
  if (islandCount === 0) return 0;

  // run a flood fill on the unvisited set
  const floodFill = (r: number, c: number): void => {
    if (r < 0 || r >= n || c < 0 || c >= m) return;
    const key = `${r},${c}`;
    if (!unvisited.has(key)) return;
    unvisited.delete(key);
    floodFill(r + 1, c);
    floodFill(r - 1, c);
    floodFill(r, c + 1);
    floodFill(r, c - 1);
  };

  const entryPoint = unvisited.values().next().value.split(",").map(Number) as [number, number];
  floodFill(...entryPoint);
  if (unvisited.size !== 0) return 0; // already disconnected

  // early exit for connected island of size 2
  if (islandCount === 2) return 2;
  // early exit for connected island of size 1
  if (islandCount === 1) return 1;

  // last step, iterate all island cells and check if theyre connected on 1 side only
  for (const key of islands) {
    const [r, c] = key.split(",").map(Number) as [number, number];
    let connected = 0;
    if (r > 0 && grid[r - 1]![c] === 1) connected++;
    if (r < n - 1 && grid[r + 1]![c] === 1) connected++;
    if (c > 0 && grid[r]![c - 1] === 1) connected++;
    if (c < m - 1 && grid[r]![c + 1] === 1) connected++;

    if (connected === 1) return 1; // we can always break this one

    // if theres 3 or more connections, its strongly connected, so it always requires 2 removals
    // or is an edge, but we'll figure that out eventually
    if (connected === 3) continue;

    // if theres 2 connections, we might be able to do a split on it
    // this case arises when 2 islands are connected by the current one vertically or horizontally
    // there can be multiple of these, so in order to check if we can split, we should perform another flood fill
    if (connected === 2 || connected === 4) {
      if (potentialSplit(grid, { x: r, y: c })) {
        console.log("potential split", r, c);
        // potential split, we run a flood fill again to see if its disconnected
        const unvisitedLocal = new Set<string>([...islands]);
        unvisitedLocal.delete(key);
        const floodFilllocal = (r: number, c: number): void => {
          if (r < 0 || r >= n || c < 0 || c >= m) return;
          const key = `${r},${c}`;
          if (!unvisitedLocal.has(key)) return;
          unvisitedLocal.delete(key);
          floodFilllocal(r + 1, c);
          floodFilllocal(r - 1, c);
          floodFilllocal(r, c + 1);
          floodFilllocal(r, c - 1);
        };
        const entryPoint = unvisitedLocal.values().next().value.split(",").map(Number) as [
          number,
          number,
        ];
        floodFilllocal(...entryPoint);
        if (unvisitedLocal.size !== 0) return 1; // we can split it
      }
    }
  }

  // couldnt find a 1 slice, return 2
  return 2;
};
