import { factorizeU64, isPrimeU64, gcdU64 } from "./big";
import { factorize as factorizeNumber, isPrime as isPrimeNumber, gcd as gcdNumber } from "./number";

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

export function isPrime(n: number): boolean;
export function isPrime(n: u64): boolean;

export function isPrime<T extends number | u64>(n: T) {
  if (typeof n === "number") {
    return isPrimeNumber(n);
  } else if (typeof n === "bigint") {
    return isPrimeU64(n);
  }
}

export function gcd(a: number, b: number): number;
export function gcd(a: u64, b: u64): u64;

export function gcd<T extends number | u64>(a: T, b: T) {
  if (typeof a === "number") {
    return gcdNumber(a, b as number);
  } else if (typeof a === "bigint") {
    return gcdU64(a, b as u64);
  }
}
