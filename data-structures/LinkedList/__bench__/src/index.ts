import { BenchCase } from "@dsa/bench";
import { LinkedList } from "@dsa/linkedlist";
import { LinkList } from "@js-sdsl/link-list";

const x = new BenchCase("Linked List", ["init", "pushBack"]);

x.setCase("init")
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

const res = await x.run("init");
console.table(res.table());
const res2 = await x.run("init");
console.table(res.table());
