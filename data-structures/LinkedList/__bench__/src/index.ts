import { BenchCase } from "@dsa/bench";
import { LinkedList } from "@dsa/linkedlist";
import { LinkList } from "@js-sdsl/link-list";

const x = new BenchCase("Linked List", ["init", "pushBack"]);

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
      });
  });

x.setCase("pushBack", "Push 10000 elements on an empty list.")
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
      });
  });

await x.runAll();
x.log();
