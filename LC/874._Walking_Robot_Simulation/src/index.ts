export default function robotSim(commands: number[], obstacles: number[][]): number {
  // pretty easy
  // just simulate the movement
  // the obstancles are sparse, so use a map or a set, anything with quick lookup
  // then we simulate all moves, if during a move we hit an obstancle, we just move to
  // the next command
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  let x = 0;
  let y = 0;
  let di = 0;
  let ans = 0;
  const obstacleSet = new Set<string>();
  for (const [ox, oy] of obstacles) {
    obstacleSet.add(`${ox},${oy}`);
  }
  for (const cmd of commands) {
    if (cmd === -2) {
      di = (di + 3) % 4;
    } else if (cmd === -1) {
      di = (di + 1) % 4;
    } else {
      for (let k = 0; k < cmd; k++) {
        const nx = x + dx[di]!;
        const ny = y + dy[di]!;
        if (!obstacleSet.has(`${nx},${ny}`)) {
          x = nx;
          y = ny;
          ans = Math.max(ans, x * x + y * y);
        } else {
          break;
        }
      }
    }
  }
  return ans;
}
