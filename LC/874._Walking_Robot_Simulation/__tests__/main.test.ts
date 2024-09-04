import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";

describe("LC/874._Walking_Robot_Simulation", () => {
  test("T1", () => {
    const commands = [4, -1, 3];
    const obstacles = [];
    expect(fn(commands, obstacles)).toBe(25);
  });
  test("T2", () => {
    const commands = [4, -1, 4, -2, 4];
    const obstacles = [[2, 4]];
    expect(fn(commands, obstacles)).toBe(65);
  });
  test("T3", () => {
    const commands = [6, -1, -1, 6];
    const obstacles = [];
    expect(fn(commands, obstacles)).toBe(36);
  });
});
