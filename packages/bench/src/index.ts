import { Bench } from "tinybench";
import chalk from "chalk";

class Case {
  private _ctx: any;
  private _bench: Bench;
  private _description: string | undefined;

  get description() {
    return this._description;
  }

  set description(description: string | undefined) {
    this._description = description;
  }

  get bench() {
    return this._bench;
  }
  constructor(description?: string) {
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

export class BenchCase<CK extends string> {
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

  public setCase(CASE: CK, description?: string) {
    this._cases[CASE].description = description;
    return this._cases[CASE];
  }
  public async run(CASE: CK) {
    const c = this._cases[CASE];
    await c.bench.warmup();
    await c.bench.run();
    return c.bench;
  }

  public async runAll() {
    for (const key in this._cases) {
      await this.run(key);
    }
  }

  public log() {
    for (const key in this._cases) {
      console.log(chalk.bold.blueBright(key));
      console.log(chalk.italic.cyanBright(this._cases[key].description));
      let winnerIdx = 0;
      for (let i = 1; i < this._cases[key].bench.results.length; i++) {
        const bc = this._cases[key].bench.results[i];
        winnerIdx = bc!.mean < this._cases[key].bench.results[winnerIdx]!.mean ? i : winnerIdx;
      }
      console.log("Winner: ", chalk.greenBright(this._cases[key].bench.tasks[winnerIdx]!.name));
      console.table(this._cases[key].bench.table());
    }
  }

  get cases() {
    return this._cases!;
  }
}
