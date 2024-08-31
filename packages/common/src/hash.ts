import { murmur3 } from "./murmur3";

export namespace Hash {
  export const stringHash = (str: string, cap: number) => {
    return murmur3(str) % cap;
  };

  export const numberHash = (num: number, cap: number) => {
    return ((num * 2654435761) >>> 0) >>> (32 - Math.floor(Math.log2(cap)));
  };
}
