import { factorizeU64 } from "./big";
import { factorize as factorizeNumber } from "./number";

export type u64 = bigint;
export type ExponentialForm<T extends number | u64> = Array<[T, number]>;

export function factorize(n: number): ExponentialForm<number>;
export function factorize(n: u64): ExponentialForm<u64>;

export function factorize<T extends number | u64>(n: T) {
  if (typeof n === "number") {
    return factorizeNumber(n);
  } else if (typeof n === "bigint") {
    return factorizeU64(n);
  }
  throw new Error("Invalid type");
}
