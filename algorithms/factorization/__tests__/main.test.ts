import { describe, expect, test } from "@jest/globals";
import { factorize } from "../src";

describe("factorize", () => {
  test("NUMBER:small", () => {
    expect(factorize(12)).toStrictEqual([
      [2, 2],
      [3, 1],
    ]);
    expect(factorize(16)).toStrictEqual([[2, 4]]);
    expect(factorize(27)).toStrictEqual([[3, 3]]);
    expect(factorize(100)).toStrictEqual([
      [2, 2],
      [5, 2],
    ]);
    expect(factorize(439)).toStrictEqual([[439, 1]]);
  });
  test("NUMBER:large", () => {
    expect(factorize(1_000_000)).toStrictEqual([
      [2, 6],
      [5, 6],
    ]);
    expect(factorize(1_000_000_000)).toStrictEqual([
      [2, 9],
      [5, 9],
    ]);
    expect(factorize(1_000_000_000_000)).toStrictEqual([
      [2, 12],
      [5, 12],
    ]);
    expect(factorize(4324324233)).toStrictEqual([
      [3, 1],
      [2711, 1],
      [531701, 1],
    ]);
    expect(factorize(87178291199)).toStrictEqual([[87178291199, 1]]);
  });
  test("BIGINT:small", () => {
    expect(factorize(BigInt(12))).toStrictEqual([
      [BigInt(2), 2],
      [BigInt(3), 1],
    ]);
    expect(factorize(BigInt(16))).toStrictEqual([[BigInt(2), 4]]);
    expect(factorize(BigInt(27))).toStrictEqual([[BigInt(3), 3]]);
    expect(factorize(BigInt(100))).toStrictEqual([
      [BigInt(2), 2],
      [BigInt(5), 2],
    ]);
    expect(factorize(BigInt(439))).toStrictEqual([[BigInt(439), 1]]);
  });
  test("BIGINT:large", () => {
    expect(factorize(BigInt(1_000_000))).toStrictEqual([
      [BigInt(2), 6],
      [BigInt(5), 6],
    ]);
    expect(factorize(BigInt(1_000_000_000))).toStrictEqual([
      [BigInt(2), 9],
      [BigInt(5), 9],
    ]);
    expect(factorize(BigInt(1_000_000_000_000))).toStrictEqual([
      [BigInt(2), 12],
      [BigInt(5), 12],
    ]);
    expect(factorize(BigInt(4324324233))).toStrictEqual([
      [BigInt(3), 1],
      [BigInt(2711), 1],
      [BigInt(531701), 1],
    ]);
    expect(factorize(BigInt(87178291199))).toStrictEqual([[BigInt(87178291199), 1]]);
  });
  test("BIGINT:larger", () => {
    expect(factorize(10888869450418352160768000001n)).toStrictEqual([
      [10888869450418352160768000001n, 1],
    ]);
    expect(factorize(10888869450418352160768000002n)).toStrictEqual([
      [2n, 1],
      [3323n, 1],
      [262139n, 1],
      [5698939n, 1],
      [1096722635947n, 1],
    ]);
  });
});
