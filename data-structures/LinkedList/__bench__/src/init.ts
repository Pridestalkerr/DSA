import { Bench } from "tinybench";
import { LinkedList } from "@dsa/linkedlist";
import { LinkList } from "@js-sdsl/link-list";

class Case {
  private _ctx: any;
  private _bench: Bench;
  get bench() {
    return this._bench;
  }
  constructor() {
    this._ctx = {};
    this._bench = new Bench({ iterations: BenchCase.ITERATIONS });
  }
  public setCtx<CTX>(fn: () => CTX) {
    this._ctx = fn();
    return this as {
      setBench(fn: (bench: Bench, ctx: CTX) => void): void;
    };
  }
  public setBench<CTX>(fn: (bench: Bench, ctx: CTX) => void) {
    fn(this._bench, this._ctx);
    return this as {};
  }
}

class BenchCase<CK extends string> {
  public static ITERATIONS = 100;
  private _name: string;
  private readonly _cases: Record<CK, Case>;
  get name() {
    return this._name;
  }

  constructor(name: string, cases: CK[]) {
    this._name = name;
    this._cases = cases.reduce(
      (acc, key) => {
        acc[key] = new Case();
        return acc;
      },
      {} as Record<CK, Case>,
    );
  }

  public setCase(CASE: CK) {
    return this._cases[CASE];
  }
  public async run(CASE: CK) {
    const c = this._cases[CASE];
    await c.bench.warmup();
    await c.bench.run();
  }

  get cases() {
    return this._cases!;
  }
}

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
