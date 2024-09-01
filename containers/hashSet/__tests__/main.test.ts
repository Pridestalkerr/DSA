import { describe, expect, test } from "@jest/globals";
import { HashSet } from "../src/index";

describe("HashSet", () => {
  test("early", () => {
    const l = new HashSet("int32");
    l.insert(1);
    l.insert(2);
    l.insert(3);
    l.insert(4);
    expect(l.size).toBe(4);
    expect(l.find(1)).toBe(1);
    expect(l.find(4)).toBe(4);
    expect(l.erase(4)).toBe(4);
    expect(l.size).toBe(3);
    expect(l.find(4)).toBe(undefined);
    l.clear();
    expect(l.size).toBe(0);
  });
});
