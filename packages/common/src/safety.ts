export namespace Safety {
  export namespace Array {
    export const at = <T>(arr: T[], i: number): T => {
      if (i < -arr.length || i >= arr.length) {
        throw new Error(`Out of bounds access on array of size ${arr.length} at index ${i}`);
      }
      return arr[i]!;
    };

    export const from = <T>(init: T[] = []) => {
      return new Proxy(init, {
        get: (target, prop) => {
          if (typeof prop === "string") {
            const i = parseInt(prop);
            if (!isNaN(i)) {
              if (i < -target.length || i >= target.length) {
                throw new Error(
                  `Out of bounds access on array of size ${target.length} at index ${i}`,
                );
              }
              return target[i < 0 ? target.length + i : i];
            }
          }
          return (target as any)[prop];
        },
        set: (target, prop, value) => {
          if (typeof prop === "string") {
            const i = parseInt(prop);
            if (!isNaN(i)) {
              if (i < -target.length || i >= target.length) {
                throw new Error(
                  `Out of bounds access on array of size ${target.length} at index ${i}`,
                );
              }
              target[i < 0 ? target.length + i : i] = value;
              return true;
            }
          }
          return false;
        },
      });
    };
  }
}
