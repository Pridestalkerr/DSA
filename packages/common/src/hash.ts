import { murmur3 } from "./murmur3";

// 2^64 * (phi - 1) = 11400714819323198485
// closest_prime64 = 11400714819323198393 = 0x9E3779B97F4A7BB9
// 2^32 * (phi - 1) = 2654435769
// closest_prime32 = 2654435761 = 9E3779B1
// 2^53 = 9007199254740992
// 5.56675528287265551071855985723721042473459594512162645648994... × 10^15
// 2^53 * (phi - 1) = 556675528287265
// closest_prime53 = 556675528287259 = 1FA4B1F1E641B

export namespace Hash {
  export const stringHash: Fn<string> = (str: string, cap: number) => {
    return murmur3(str) % cap;
  };

  export const int32Hash: Fn<number> = (num: number, cap: number) => {
    return ((num * 0x9e3779b1) >>> 0) >> (32 - Math.floor(Math.log2(cap)));
  };

  export const bigHash: Fn<number | bigint> = (num: number | bigint, cap: number) => {
    return murmur3(num.toString(16)) % cap;
  };

  export type Fn<T> = (key: T, cap: number) => number;
}
