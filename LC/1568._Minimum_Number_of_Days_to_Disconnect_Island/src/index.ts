import { optBruteforce } from "./optimizedBruteforce";

export default function minDays(grid: number[][]): number {
  return optBruteforce(grid);
}
