import { describe, expect, test } from "@jest/globals";
import { Stack } from "../src/index";

describe("stack", () => {
  test("ALL", () => {
    const s = new Stack([1, 2, 3, 4, 5]);
    expect(s.size).toBe(5);
    expect(s.top()).toBe(5);
    expect(s.pop()).toBe(5);
    expect(s.size).toBe(4);
    s.push(6);
    expect(s.size).toBe(5);
    expect(s.top()).toBe(6);
  });
});
