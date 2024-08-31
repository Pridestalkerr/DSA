import { murmur3 } from "./murmur3";

export namespace Hash {
  export const stringHash: Fn<string> = (str: string, cap: number) => {
    return murmur3(str) % cap;
  };

  export const numberHash: Fn<number> = (num: number, cap: number) => {
    return ((num * 2654435761) >>> 0) >>> (32 - Math.floor(Math.log2(cap)));
  };

  export type Fn<T> = (key: T, cap: number) => number;
}
