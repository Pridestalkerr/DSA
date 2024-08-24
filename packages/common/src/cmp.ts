export namespace CMP {
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

  export type EQ<T> = (a: T, b: T) => boolean;
  export const defaultEquals = <T>(a: T, b: T) => a === b;

  export type FromStatic<T> = {
    from: [T, ...T[]];
  } & OptionalCMP<T>;

  export type FromIterable<T> = {
    from?: Iterable<T>;
    compare: CMP<T>;
  };

  export type From<T> = (FromStatic<T> | FromIterable<T>) & { descending?: boolean };
}
