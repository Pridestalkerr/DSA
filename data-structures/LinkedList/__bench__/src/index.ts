import { BenchCase } from "@dsa/bench";
import { LinkedList } from "@dsa/linkedlist";
import { LinkList } from "@js-sdsl/link-list";

const x = new BenchCase("Linked List", [
  "ARRAY_VS_LIST_CACHE",
  "init",
  "begin",
  "pushBack",
  "pushFront",
]);

x.setCase("ARRAY_VS_LIST_CACHE", "Test case.")
  .setCtx(() => {
    const arr = Array.from({ length: 10000 }, () => {
      // const size = Math.floor(Math.random() * 9) + 2;
      const size = 500;
      return {
        arr: Array.from({ length: size }, () => Math.random()),
        lookFor: Math.floor(Math.random() * size),
      };
    });

    return {
      arr: arr,
      l1: Array.from(arr).map((x) => new LinkedList(x.arr)),
      l2: Array.from(arr, (x) => Array.from(x.arr)),
    };
  })
  .setBench((bench, ctx) => {
    bench
      .add(
        "linkedlist",
        () => {
          let idx = 0;
          for (const list of ctx.l1) {
            const itr = ctx.arr[idx]!;
            const look_for = itr.arr[itr.lookFor]!;
            for (const node of list) {
              if (node.data === look_for) {
                list.eraseNode(node);
                break;
              }
            }
          }
        },
        {
          afterEach: () => {
            ctx.l1 = Array.from(ctx.arr).map((x) => new LinkedList(x.arr));
          },
        },
      )
      .add(
        "array",
        () => {
          let idx = 0;
          for (const arr of ctx.l2) {
            const itr = ctx.arr[idx]!;
            const look_for = itr.arr[itr.lookFor]!;
            for (const elm of arr) {
              if (elm === look_for) {
                arr.splice(itr.lookFor, 1);
                break;
              }
            }
          }
        },
        {
          afterEach: () => {
            ctx.l2 = Array.from(ctx.arr, (x) => Array.from(x.arr));
          },
        },
      );
  });

x.setCase("init", "Initialize from array.")
  .setCtx(() => {
    return {
      arr: Array.from({ length: 10000 }, () => Math.random()),
      l1: new LinkedList<number>(),
      l2: new LinkList<number>(),
    };
  })
  .setBench((bench, ctx) => {
    bench
      .add("@js-sdsl/link-list", () => {
        ctx.l2 = new LinkList(ctx.arr);
      })
      .add("@dsa/linkedlist", () => {
        ctx.l1 = new LinkedList(ctx.arr);
      })
      .add("Array", () => {
        const tmp = Array.from(ctx.arr);
      });
  });

x.setCase("begin", "Traverse 10000 elements in forward direction.")
  .setCtx(() => {
    const arr = Array.from({ length: 10000 }, () => Math.random());
    return {
      arr: arr,
      l1: new LinkedList<number>(arr),
      l2: new LinkList<number>(arr),
    };
  })
  .setBench((bench, ctx) => {
    bench
      .add("@js-sdsl/link-list", () => {
        for (const it of ctx.l2) {
          it;
        }
      })
      .add("@dsa/linkedlist", () => {
        for (const it of ctx.l1) {
          it;
        }
      })
      .add("Array", () => {
        for (const it of ctx.arr) {
          it;
        }
      });
  });

x.setCase("pushBack", "Push 10000 elements to the BACK of an empty list.")
  .setCtx(() => {})
  .setBench((bench, _) => {
    bench
      .add("@js-sdsl/link-list", () => {
        const l = new LinkList<number>();
        for (let i = 0; i < 10000; i++) {
          l.pushBack(Math.random());
        }
      })
      .add("@dsa/linkedlist", () => {
        const l = new LinkedList<number>();
        for (let i = 0; i < 10000; i++) {
          l.pushBack(Math.random());
        }
      })
      .add("Array", () => {
        const l: number[] = [];
        for (let i = 0; i < 10000; i++) {
          l.push(Math.random());
        }
      });
  });

x.setCase("pushFront", "Push 10000 elements to the FRONT of an empty list")
  .setCtx(() => {})
  .setBench((bench, _) => {
    bench
      .add("@js-sdsl/link-list", () => {
        const l = new LinkList<number>();
        for (let i = 0; i < 10000; i++) {
          l.pushFront(Math.random());
        }
      })
      .add("@dsa/linkedlist", () => {
        const l = new LinkedList<number>();
        for (let i = 0; i < 10000; i++) {
          l.pushFront(Math.random());
        }
      })
      .add("Array", () => {
        const l: number[] = [];
        for (let i = 0; i < 10000; i++) {
          l.unshift(Math.random());
        }
      });
  });

await x.runAll();
x.log();
