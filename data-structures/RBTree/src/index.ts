export * from "./RBTreeNode";
export * from "./RBTreeBase";
export * from "./RBTree";

export type CMP<T> = (a: T, b: T) => number;
export type OptionalCMP<T> = [T] extends [string]
  ? { compare?: CMP<T> }
  : [T] extends [number]
    ? { compare?: CMP<T> }
    : { compare: CMP<T> };

export type HasDefaultCompare<T> = [T] extends [string]
  ? true
  : [T] extends [number]
    ? true
    : false;

export const stringCompare: CMP<string> = (a, b): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const numberCompare: CMP<number> = (a, b): number => a - b;

export const getDefaultCompare = <T>(val: T) => {
  if (typeof val === "number") {
    return numberCompare as CMP<T>;
  } else if (typeof val === "string") {
    return stringCompare as CMP<T>;
  }
  throw new Error(`No default compare function for type ${typeof val}`);
};
