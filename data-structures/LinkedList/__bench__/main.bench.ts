import { Bench } from "tinybench";
import { LinkedList } from "../src/index.js";
import { LinkList } from "@js-sdsl/link-list";

const bench = new Bench({ iterations: 1000 });

bench
  .add("@dsa/linkedlist", () => {
    const list = new LinkedList<number>();
    for (let i = 0; i < 5000; i++) {
      list.pushBack(i);
    }
    for (let i = 0; i < 5000; i++) {
      list.pushFront(i);
    }
    const arr = [...list]; // efficiency of iterator
    // @ts-ignore
    const l2 = new LinkedList(arr, (x) => x.data);
  })
  .add("@js-sdsl/link-list", () => {
    const list = new LinkList<number>();
    for (let i = 0; i < 5000; i++) {
      list.pushBack(i);
    }
    for (let i = 0; i < 5000; i++) {
      list.pushFront(i);
    }
    const arr = [...list]; // efficiency of iterator
    const l2 = new LinkList(arr);
  })
  .add("Array", () => {
    const list = new Array<number>();
    for (let i = 0; i < 5000; i++) {
      list.push(i);
    }
    for (let i = 0; i < 5000; i++) {
      list.unshift(i);
    }
  });

await bench.warmup();
await bench.run();

console.table(bench.table());
