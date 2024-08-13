import { describe, expect, test } from "@jest/globals";
import { murmur3 } from "../src/murmur3";

describe("RBTree", () => {
  test("Murmur3", () => {
    expect(murmur3("")).toBe(0);
    expect(murmur3("a", 0)).toBe(1009084850);
    expect(murmur3("Hello World!", 0)).toBe(3691591037);
    expect(murmur3("r98742f3og rfd fi8ry3uewftger987 fuirewhg", 0)).toBe(2488675724);

    expect(murmur3("", 3278632)).toBe(3223306758);
    expect(murmur3("a", 3278632)).toBe(2908936867);
    expect(murmur3("Hello World!", 3278632)).toBe(2413376657);
    expect(murmur3("r98742f3og rfd fi8ry3uewftger987 fuirewhg", 3278632)).toBe(3692151740);
  });
});
