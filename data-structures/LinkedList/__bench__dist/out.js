// ../../node_modules/.pnpm/tinybench@2.9.0/node_modules/tinybench/dist/index.js
var $ = Object.defineProperty;
var C = (s) => {
  throw TypeError(s);
};
var D = (s, n, t) => n in s ? $(s, n, { enumerable: true, configurable: true, writable: true, value: t }) : s[n] = t;
var O = (s, n, t) => D(s, typeof n != "symbol" ? n + "" : n, t);
var q = (s, n, t) => n.has(s) || C("Cannot " + t);
var d = (s, n, t) => (q(s, n, "read from private field"), t ? t.call(s) : n.get(s));
var k = (s, n, t) => n.has(s) ? C("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(s) : n.set(s, t);
var f = (s, n, t, e) => (q(s, n, "write to private field"), e ? e.call(s, t) : n.set(s, t), t);
var F = (s, n, t, e) => ({
  set _(r) {
    f(s, n, r, t);
  },
  get _() {
    return d(s, n, e);
  }
});
var M = class {
  constructor(n) {
    O(this, "value");
    O(this, "next");
    this.value = n;
  }
};
var m;
var w;
var E;
var g = class {
  constructor() {
    k(this, m);
    k(this, w);
    k(this, E);
    this.clear();
  }
  enqueue(n) {
    let t = new M(n);
    d(this, m) ? (d(this, w).next = t, f(this, w, t)) : (f(this, m, t), f(this, w, t)), F(this, E)._++;
  }
  dequeue() {
    let n = d(this, m);
    if (n)
      return f(this, m, d(this, m).next), F(this, E)._--, n.value;
  }
  clear() {
    f(this, m, void 0), f(this, w, void 0), f(this, E, 0);
  }
  get size() {
    return d(this, E);
  }
  *[Symbol.iterator]() {
    let n = d(this, m);
    for (; n; )
      yield n.value, n = n.next;
  }
};
m = /* @__PURE__ */ new WeakMap(), w = /* @__PURE__ */ new WeakMap(), E = /* @__PURE__ */ new WeakMap();
function y(s) {
  if (!((Number.isInteger(s) || s === Number.POSITIVE_INFINITY) && s > 0))
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  let n = new g(), t = 0, e = () => {
    t--, n.size > 0 && n.dequeue()();
  }, r = async (h, p, a) => {
    t++;
    let l = (async () => h(...a))();
    p(l);
    try {
      await l;
    } catch (T) {
    }
    e();
  }, i = (h, p, a) => {
    n.enqueue(r.bind(void 0, h, p, a)), (async () => (await Promise.resolve(), t < s && n.size > 0 && n.dequeue()()))();
  }, c = (h, ...p) => new Promise((a) => {
    i(h, a, p);
  });
  return Object.defineProperties(c, {
    activeCount: {
      get: () => t
    },
    pendingCount: {
      get: () => n.size
    },
    clearQueue: {
      value: () => {
        n.clear();
      }
    }
  }), c;
}
function o(s, n = null) {
  let t = new Event(s);
  return n && Object.defineProperty(t, "task", {
    value: n,
    enumerable: true,
    writable: false,
    configurable: false
  }), t;
}
var G = {
  1: 12.71,
  2: 4.303,
  3: 3.182,
  4: 2.776,
  5: 2.571,
  6: 2.447,
  7: 2.365,
  8: 2.306,
  9: 2.262,
  10: 2.228,
  11: 2.201,
  12: 2.179,
  13: 2.16,
  14: 2.145,
  15: 2.131,
  16: 2.12,
  17: 2.11,
  18: 2.101,
  19: 2.093,
  20: 2.086,
  21: 2.08,
  22: 2.074,
  23: 2.069,
  24: 2.064,
  25: 2.06,
  26: 2.056,
  27: 2.052,
  28: 2.048,
  29: 2.045,
  30: 2.042,
  31: 2.0399,
  32: 2.0378,
  33: 2.0357,
  34: 2.0336,
  35: 2.0315,
  36: 2.0294,
  37: 2.0273,
  38: 2.0252,
  39: 2.0231,
  40: 2.021,
  41: 2.0198,
  42: 2.0186,
  43: 2.0174,
  44: 2.0162,
  45: 2.015,
  46: 2.0138,
  47: 2.0126,
  48: 2.0114,
  49: 2.0102,
  50: 2.009,
  51: 2.0081,
  52: 2.0072,
  53: 2.0063,
  54: 2.0054,
  55: 2.0045,
  56: 2.0036,
  57: 2.0027,
  58: 2.0018,
  59: 2.0009,
  60: 2,
  61: 1.9995,
  62: 1.999,
  63: 1.9985,
  64: 1.998,
  65: 1.9975,
  66: 1.997,
  67: 1.9965,
  68: 1.996,
  69: 1.9955,
  70: 1.995,
  71: 1.9945,
  72: 1.994,
  73: 1.9935,
  74: 1.993,
  75: 1.9925,
  76: 1.992,
  77: 1.9915,
  78: 1.991,
  79: 1.9905,
  80: 1.99,
  81: 1.9897,
  82: 1.9894,
  83: 1.9891,
  84: 1.9888,
  85: 1.9885,
  86: 1.9882,
  87: 1.9879,
  88: 1.9876,
  89: 1.9873,
  90: 1.987,
  91: 1.9867,
  92: 1.9864,
  93: 1.9861,
  94: 1.9858,
  95: 1.9855,
  96: 1.9852,
  97: 1.9849,
  98: 1.9846,
  99: 1.9843,
  100: 1.984,
  101: 1.9838,
  102: 1.9836,
  103: 1.9834,
  104: 1.9832,
  105: 1.983,
  106: 1.9828,
  107: 1.9826,
  108: 1.9824,
  109: 1.9822,
  110: 1.982,
  111: 1.9818,
  112: 1.9816,
  113: 1.9814,
  114: 1.9812,
  115: 1.9819,
  116: 1.9808,
  117: 1.9806,
  118: 1.9804,
  119: 1.9802,
  120: 1.98,
  infinity: 1.96
};
var N = G;
var B = () => performance.now();
function W(s) {
  return s !== null && typeof s == "object" && typeof s.then == "function";
}
var S = (s, n) => s.reduce((e, r) => e + (r - n) ** 2, 0) / (s.length - 1) || 0;
var X = (async () => {
}).constructor;
var Z = (s) => s.constructor === X;
var z = async (s) => {
  if (Z(s.fn))
    return true;
  try {
    if (s.opts.beforeEach != null)
      try {
        await s.opts.beforeEach.call(s);
      } catch (e) {
      }
    let n = s.fn(), t = W(n);
    if (t)
      try {
        await n;
      } catch (e) {
      }
    if (s.opts.afterEach != null)
      try {
        await s.opts.afterEach.call(s);
      } catch (e) {
      }
    return t;
  } catch (n) {
    return false;
  }
};
var b = class extends EventTarget {
  constructor(t, e, r, i = {}) {
    super();
    this.runs = 0;
    this.bench = t, this.name = e, this.fn = r, this.opts = i;
  }
  async loop(t, e) {
    var T;
    let r = this.bench.concurrency === "task", { threshold: i } = this.bench, c = 0, h = [];
    if (this.opts.beforeAll != null)
      try {
        await this.opts.beforeAll.call(this);
      } catch (u) {
        return { error: u };
      }
    let p = await z(this), a = async () => {
      this.opts.beforeEach != null && await this.opts.beforeEach.call(this);
      let u = 0;
      if (p) {
        let v = this.bench.now();
        await this.fn.call(this), u = this.bench.now() - v;
      } else {
        let v = this.bench.now();
        this.fn.call(this), u = this.bench.now() - v;
      }
      h.push(u), c += u, this.opts.afterEach != null && await this.opts.afterEach.call(this);
    }, l = y(i);
    try {
      let u = [];
      for (; (c < t || h.length + l.activeCount + l.pendingCount < e) && !((T = this.bench.signal) != null && T.aborted); )
        r ? u.push(l(a)) : await a();
      u.length && await Promise.all(u);
    } catch (u) {
      return { error: u };
    }
    if (this.opts.afterAll != null)
      try {
        await this.opts.afterAll.call(this);
      } catch (u) {
        return { error: u };
      }
    return { samples: h };
  }
  /**
   * run the current task and write the results in `Task.result` object
   */
  async run() {
    var r, i;
    if ((r = this.result) != null && r.error)
      return this;
    this.dispatchEvent(o("start", this)), await this.bench.setup(this, "run");
    let { samples: t, error: e } = await this.loop(this.bench.time, this.bench.iterations);
    if (this.bench.teardown(this, "run"), t) {
      let c = t.reduce((L, A) => L + A, 0);
      this.runs = t.length, t.sort((L, A) => L - A);
      let h = c / this.runs, p = 1e3 / h, a = t.length, l = a - 1, T = t[0], u = t[l], v = c / t.length || 0, P = S(t, v), R = Math.sqrt(P), I = R / Math.sqrt(a), _ = N[String(Math.round(l) || 1)] || N.infinity, K = I * _, j = K / v * 100, H = t[Math.ceil(a * 0.75) - 1], V = t[Math.ceil(a * 0.99) - 1], Q = t[Math.ceil(a * 0.995) - 1], Y = t[Math.ceil(a * 0.999) - 1];
      if ((i = this.bench.signal) != null && i.aborted)
        return this;
      this.setResult({
        totalTime: c,
        min: T,
        max: u,
        hz: p,
        period: h,
        samples: t,
        mean: v,
        variance: P,
        sd: R,
        sem: I,
        df: l,
        critical: _,
        moe: K,
        rme: j,
        p75: H,
        p99: V,
        p995: Q,
        p999: Y
      });
    }
    if (e) {
      if (this.setResult({ error: e }), this.bench.throws)
        throw e;
      this.dispatchEvent(o("error", this)), this.bench.dispatchEvent(o("error", this));
    }
    return this.dispatchEvent(o("cycle", this)), this.bench.dispatchEvent(o("cycle", this)), this.dispatchEvent(o("complete", this)), this;
  }
  /**
   * warmup the current task
   */
  async warmup() {
    var e;
    if ((e = this.result) != null && e.error)
      return;
    this.dispatchEvent(o("warmup", this)), await this.bench.setup(this, "warmup");
    let { error: t } = await this.loop(this.bench.warmupTime, this.bench.warmupIterations);
    if (this.bench.teardown(this, "warmup"), t && (this.setResult({ error: t }), this.bench.throws))
      throw t;
  }
  addEventListener(t, e, r) {
    super.addEventListener(t, e, r);
  }
  removeEventListener(t, e, r) {
    super.removeEventListener(t, e, r);
  }
  /**
   * change the result object values
   */
  setResult(t) {
    this.result = { ...this.result, ...t }, Object.freeze(this.result);
  }
  /**
   * reset the task to make the `Task.runs` a zero-value and remove the `Task.result`
   * object
   */
  reset() {
    this.dispatchEvent(o("reset", this)), this.runs = 0, this.result = void 0;
  }
};
var x = class extends EventTarget {
  constructor(t = {}) {
    var e, r, i, c, h, p, a, l;
    super();
    this._tasks = /* @__PURE__ */ new Map();
    this._todos = /* @__PURE__ */ new Map();
    this.concurrency = null;
    this.threshold = 1 / 0;
    this.warmupTime = 100;
    this.warmupIterations = 5;
    this.time = 500;
    this.iterations = 10;
    this.now = B;
    this.now = (e = t.now) != null ? e : this.now, this.warmupTime = (r = t.warmupTime) != null ? r : this.warmupTime, this.warmupIterations = (i = t.warmupIterations) != null ? i : this.warmupIterations, this.time = (c = t.time) != null ? c : this.time, this.iterations = (h = t.iterations) != null ? h : this.iterations, this.signal = t.signal, this.throws = (p = t.throws) != null ? p : false, this.setup = (a = t.setup) != null ? a : () => {
    }, this.teardown = (l = t.teardown) != null ? l : () => {
    }, this.signal && this.signal.addEventListener(
      "abort",
      () => {
        this.dispatchEvent(o("abort"));
      },
      { once: true }
    );
  }
  runTask(t) {
    var e;
    return (e = this.signal) != null && e.aborted ? t : t.run();
  }
  /**
   * run the added tasks that were registered using the
   * {@link add} method.
   * Note: This method does not do any warmup. Call {@link warmup} for that.
   */
  async run() {
    if (this.concurrency === "bench")
      return this.runConcurrently(this.threshold, this.concurrency);
    this.dispatchEvent(o("start"));
    let t = [];
    for (let e of [...this._tasks.values()])
      t.push(await this.runTask(e));
    return this.dispatchEvent(o("complete")), t;
  }
  /**
   * See Bench.{@link concurrency}
   */
  async runConcurrently(t = 1 / 0, e = "bench") {
    if (this.threshold = t, this.concurrency = e, e === "task")
      return this.run();
    this.dispatchEvent(o("start"));
    let r = y(t), i = [];
    for (let h of [...this._tasks.values()])
      i.push(r(() => this.runTask(h)));
    let c = await Promise.all(i);
    return this.dispatchEvent(o("complete")), c;
  }
  /**
   * warmup the benchmark tasks.
   * This is not run by default by the {@link run} method.
   */
  async warmup() {
    if (this.concurrency === "bench") {
      await this.warmupConcurrently(this.threshold, this.concurrency);
      return;
    }
    this.dispatchEvent(o("warmup"));
    for (let [, t] of this._tasks)
      await t.warmup();
  }
  /**
   * warmup the benchmark tasks concurrently.
   * This is not run by default by the {@link runConcurrently} method.
   */
  async warmupConcurrently(t = 1 / 0, e = "bench") {
    if (this.threshold = t, this.concurrency = e, e === "task") {
      await this.warmup();
      return;
    }
    this.dispatchEvent(o("warmup"));
    let r = y(t), i = [];
    for (let [, c] of this._tasks)
      i.push(r(() => c.warmup()));
    await Promise.all(i);
  }
  /**
   * reset each task and remove its result
   */
  reset() {
    this.dispatchEvent(o("reset")), this._tasks.forEach((t) => {
      t.reset();
    });
  }
  /**
   * add a benchmark task to the task map
   */
  add(t, e, r = {}) {
    let i = new b(this, t, e, r);
    return this._tasks.set(t, i), this.dispatchEvent(o("add", i)), this;
  }
  /**
   * add a benchmark todo to the todo map
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  todo(t, e = () => {
  }, r = {}) {
    let i = new b(this, t, e, r);
    return this._todos.set(t, i), this.dispatchEvent(o("todo", i)), this;
  }
  /**
   * remove a benchmark task from the task map
   */
  remove(t) {
    let e = this.getTask(t);
    return e && (this.dispatchEvent(o("remove", e)), this._tasks.delete(t)), this;
  }
  addEventListener(t, e, r) {
    super.addEventListener(t, e, r);
  }
  removeEventListener(t, e, r) {
    super.removeEventListener(t, e, r);
  }
  /**
   * table of the tasks results
   */
  table(t) {
    return this.tasks.map((e) => {
      if (e.result) {
        if (e.result.error)
          throw e.result.error;
        return (t == null ? void 0 : t(e)) || {
          "Task Name": e.name,
          "ops/sec": e.result.error ? "NaN" : parseInt(e.result.hz.toString(), 10).toLocaleString(),
          "Average Time (ns)": e.result.error ? "NaN" : e.result.mean * 1e3 * 1e3,
          Margin: e.result.error ? "NaN" : `\xB1${e.result.rme.toFixed(2)}%`,
          Samples: e.result.error ? "NaN" : e.result.samples.length
        };
      }
      return null;
    });
  }
  /**
   * (getter) tasks results as an array
   */
  get results() {
    return [...this._tasks.values()].map((t) => t.result);
  }
  /**
   * (getter) tasks as an array
   */
  get tasks() {
    return [...this._tasks.values()];
  }
  get todos() {
    return [...this._todos.values()];
  }
  /**
   * get a task based on the task name
   */
  getTask(t) {
    return this._tasks.get(t);
  }
};

// src/iterator.ts
var ListNodeIterator = class {
  constructor(header, node, reverse = false) {
    this.initialised = false;
    this._canNext = true;
    this._canPrev = true;
    this._header = header;
    this._current = node;
    this.reverse = reverse;
    this._next = reverse ? this._prevImpl : this._nextImpl;
    this._prev = reverse ? this._nextImpl : this._prevImpl;
  }
  get canNext() {
    return this._canNext;
  }
  get canPrev() {
    return this._canPrev;
  }
  get done() {
    return this._current === this._header;
  }
  get value() {
    return this._current;
  }
  next() {
    return this._next();
  }
  prev() {
    return this._prev();
  }
  _nextImpl() {
    if (!this.initialised) {
      this.initialised = true;
      return this;
    }
    if (this.done && !this._canNext) {
      throw new Error("ListNodeIterator: cannot move past end");
    }
    this._canPrev = true;
    this._current = this._current.next;
    this._canNext = this._current !== this._header;
    return this;
  }
  _prevImpl() {
    if (!this.initialised) {
      this.initialised = true;
      return this;
    }
    if (this.done && !this._canPrev) {
      throw new Error("ListNodeIterator: cannot move past end");
    }
    this._canNext = true;
    this._current = this._current.prev;
    this._canPrev = this._current !== this._header;
    return this;
  }
  [Symbol.iterator]() {
    return this;
  }
};

// src/node.ts
var ListNode = class {
  constructor(data) {
    this.prev = void 0;
    this.next = void 0;
    this.data = data;
  }
  insertBefore(node) {
    node.prev = this.prev;
    node.next = this;
    this.prev.next = node;
    this.prev = node;
  }
  insertAfter(node) {
    node.prev = this;
    node.next = this.next;
    this.next.prev = node;
    this.next = node;
  }
  erase() {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
  }
};

// src/index.ts
var LinkedList = class {
  constructor(iterable, mapFn) {
    // _header.prev is the first element
    // _header.next is the last element
    this._header = new ListNode(void 0);
    this._size = 0;
    this._head = this._header;
    this._tail = this._header;
    if (iterable) {
      for (const elm of iterable) {
        this.pushBack(mapFn ? mapFn(elm) : elm);
      }
    }
  }
  // ======================================
  // ===========ELEMENT ACCESS=============
  // ======================================
  front() {
    return this._header.next;
  }
  back() {
    return this._header.prev;
  }
  // ======================================
  // ==============ITERATORS===============
  // ======================================
  begin() {
    return new ListNodeIterator(this._header, this._head);
  }
  rbegin() {
    return new ListNodeIterator(this._header, this._tail, true);
  }
  // ======================================
  // ==============CAPACITY================
  // ======================================
  empty() {
    return this.size === 0;
  }
  get size() {
    return this._size;
  }
  get length() {
    return this.size;
  }
  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  clear() {
    this._head = this._header;
    this._tail = this._header;
    this._size = 0;
  }
  pushBack(data) {
    const node = new ListNode(data);
    this._header.insertBefore(node);
    this._size++;
  }
  pushFront(data) {
    const node = new ListNode(data);
    this._header.insertAfter(node);
    this._size++;
  }
  insertBefore(it, data) {
    const node = new ListNode(data);
    it.value.insertBefore(node);
    this._size++;
  }
  insertAfter(it, data) {
    const node = new ListNode(data);
    it.value.insertAfter(node);
    this._size++;
  }
  // TODO: make these return
  popBack() {
    if (this.empty()) {
      return;
    }
    this._tail.erase();
    this._size--;
  }
  popFront() {
    if (this.empty()) {
      return;
    }
    this._head.erase();
    this._size--;
  }
  erase(it) {
    if (it.done || !it.initialised) {
      return;
    }
    it.value.erase();
    this._size--;
  }
  [Symbol.iterator]() {
    return new ListNodeIterator(this._header, this._head);
  }
  get _head() {
    return this._header.next;
  }
  set _head(node) {
    this._header.next = node;
  }
  get _tail() {
    return this._header.prev;
  }
  set _tail(node) {
    this._header.prev = node;
  }
};

// ../../node_modules/.pnpm/@js-sdsl+link-list@4.4.2/node_modules/@js-sdsl/link-list/dist/esm/index.js
var extendStatics = function(t, i) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(t2, i2) {
    t2.__proto__ = i2;
  } || function(t2, i2) {
    for (var n in i2) if (Object.prototype.hasOwnProperty.call(i2, n)) t2[n] = i2[n];
  };
  return extendStatics(t, i);
};
function __extends(t, i) {
  if (typeof i !== "function" && i !== null) throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
  extendStatics(t, i);
  function __() {
    this.constructor = t;
  }
  t.prototype = i === null ? Object.create(i) : (__.prototype = i.prototype, new __());
}
function __generator(t, i) {
  var n = {
    label: 0,
    sent: function() {
      if (s[0] & 1) throw s[1];
      return s[1];
    },
    trys: [],
    ops: []
  }, r, e, s, h;
  return h = {
    next: verb(0),
    throw: verb(1),
    return: verb(2)
  }, typeof Symbol === "function" && (h[Symbol.iterator] = function() {
    return this;
  }), h;
  function verb(t2) {
    return function(i2) {
      return step([t2, i2]);
    };
  }
  function step(o2) {
    if (r) throw new TypeError("Generator is already executing.");
    while (h && (h = 0, o2[0] && (n = 0)), n) try {
      if (r = 1, e && (s = o2[0] & 2 ? e["return"] : o2[0] ? e["throw"] || ((s = e["return"]) && s.call(e), 0) : e.next) && !(s = s.call(e, o2[1])).done) return s;
      if (e = 0, s) o2 = [o2[0] & 2, s.value];
      switch (o2[0]) {
        case 0:
        case 1:
          s = o2;
          break;
        case 4:
          n.label++;
          return {
            value: o2[1],
            done: false
          };
        case 5:
          n.label++;
          e = o2[1];
          o2 = [0];
          continue;
        case 7:
          o2 = n.ops.pop();
          n.trys.pop();
          continue;
        default:
          if (!(s = n.trys, s = s.length > 0 && s[s.length - 1]) && (o2[0] === 6 || o2[0] === 2)) {
            n = 0;
            continue;
          }
          if (o2[0] === 3 && (!s || o2[1] > s[0] && o2[1] < s[3])) {
            n.label = o2[1];
            break;
          }
          if (o2[0] === 6 && n.label < s[1]) {
            n.label = s[1];
            s = o2;
            break;
          }
          if (s && n.label < s[2]) {
            n.label = s[2];
            n.ops.push(o2);
            break;
          }
          if (s[2]) n.ops.pop();
          n.trys.pop();
          continue;
      }
      o2 = i.call(t, n);
    } catch (t2) {
      o2 = [6, t2];
      e = 0;
    } finally {
      r = s = 0;
    }
    if (o2[0] & 5) throw o2[1];
    return {
      value: o2[0] ? o2[1] : void 0,
      done: true
    };
  }
}
var ContainerIterator = function() {
  function ContainerIterator2(t) {
    if (t === void 0) {
      t = 0;
    }
    this.iteratorType = t;
  }
  ContainerIterator2.prototype.equals = function(t) {
    return this.t === t.t;
  };
  return ContainerIterator2;
}();
var Base = function() {
  function Base2() {
    this.i = 0;
  }
  Object.defineProperty(Base2.prototype, "length", {
    get: function() {
      return this.i;
    },
    enumerable: false,
    configurable: true
  });
  Base2.prototype.size = function() {
    return this.i;
  };
  Base2.prototype.empty = function() {
    return this.i === 0;
  };
  return Base2;
}();
var Container = function(t) {
  __extends(Container2, t);
  function Container2() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return Container2;
}(Base);
var SequentialContainer = function(t) {
  __extends(SequentialContainer2, t);
  function SequentialContainer2() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return SequentialContainer2;
}(Container);
function throwIteratorAccessError() {
  throw new RangeError("Iterator access denied!");
}
var LinkListIterator = function(t) {
  __extends(LinkListIterator2, t);
  function LinkListIterator2(i, n, r, e) {
    var s = t.call(this, e) || this;
    s.t = i;
    s.h = n;
    s.container = r;
    if (s.iteratorType === 0) {
      s.pre = function() {
        if (this.t.o === this.h) {
          throwIteratorAccessError();
        }
        this.t = this.t.o;
        return this;
      };
      s.next = function() {
        if (this.t === this.h) {
          throwIteratorAccessError();
        }
        this.t = this.t.u;
        return this;
      };
    } else {
      s.pre = function() {
        if (this.t.u === this.h) {
          throwIteratorAccessError();
        }
        this.t = this.t.u;
        return this;
      };
      s.next = function() {
        if (this.t === this.h) {
          throwIteratorAccessError();
        }
        this.t = this.t.o;
        return this;
      };
    }
    return s;
  }
  Object.defineProperty(LinkListIterator2.prototype, "pointer", {
    get: function() {
      if (this.t === this.h) {
        throwIteratorAccessError();
      }
      return this.t.L;
    },
    set: function(t2) {
      if (this.t === this.h) {
        throwIteratorAccessError();
      }
      this.t.L = t2;
    },
    enumerable: false,
    configurable: true
  });
  LinkListIterator2.prototype.copy = function() {
    return new LinkListIterator2(this.t, this.h, this.container, this.iteratorType);
  };
  LinkListIterator2.prototype.isAccessible = function() {
    return this.t !== this.h;
  };
  return LinkListIterator2;
}(ContainerIterator);
var LinkList = function(t) {
  __extends(LinkList2, t);
  function LinkList2(i) {
    if (i === void 0) {
      i = [];
    }
    var n = t.call(this) || this;
    n.h = {};
    n.l = n.v = n.h.o = n.h.u = n.h;
    var r = n;
    i.forEach(function(t2) {
      r.pushBack(t2);
    });
    return n;
  }
  LinkList2.prototype.k = function(t2) {
    var i = t2.o, n = t2.u;
    i.u = n;
    n.o = i;
    if (t2 === this.l) {
      this.l = n;
    }
    if (t2 === this.v) {
      this.v = i;
    }
    this.i -= 1;
  };
  LinkList2.prototype._ = function(t2, i) {
    var n = i.u;
    var r = {
      L: t2,
      o: i,
      u: n
    };
    i.u = r;
    n.o = r;
    if (i === this.h) {
      this.l = r;
    }
    if (n === this.h) {
      this.v = r;
    }
    this.i += 1;
  };
  LinkList2.prototype.clear = function() {
    this.i = 0;
    this.l = this.v = this.h.o = this.h.u = this.h;
  };
  LinkList2.prototype.begin = function() {
    return new LinkListIterator(this.l, this.h, this);
  };
  LinkList2.prototype.end = function() {
    return new LinkListIterator(this.h, this.h, this);
  };
  LinkList2.prototype.rBegin = function() {
    return new LinkListIterator(this.v, this.h, this, 1);
  };
  LinkList2.prototype.rEnd = function() {
    return new LinkListIterator(this.h, this.h, this, 1);
  };
  LinkList2.prototype.front = function() {
    return this.l.L;
  };
  LinkList2.prototype.back = function() {
    return this.v.L;
  };
  LinkList2.prototype.getElementByPos = function(t2) {
    if (t2 < 0 || t2 > this.i - 1) {
      throw new RangeError();
    }
    var i = this.l;
    while (t2--) {
      i = i.u;
    }
    return i.L;
  };
  LinkList2.prototype.eraseElementByPos = function(t2) {
    if (t2 < 0 || t2 > this.i - 1) {
      throw new RangeError();
    }
    var i = this.l;
    while (t2--) {
      i = i.u;
    }
    this.k(i);
    return this.i;
  };
  LinkList2.prototype.eraseElementByValue = function(t2) {
    var i = this.l;
    while (i !== this.h) {
      if (i.L === t2) {
        this.k(i);
      }
      i = i.u;
    }
    return this.i;
  };
  LinkList2.prototype.eraseElementByIterator = function(t2) {
    var i = t2.t;
    if (i === this.h) {
      throwIteratorAccessError();
    }
    t2 = t2.next();
    this.k(i);
    return t2;
  };
  LinkList2.prototype.pushBack = function(t2) {
    this._(t2, this.v);
    return this.i;
  };
  LinkList2.prototype.popBack = function() {
    if (this.i === 0) return;
    var t2 = this.v.L;
    this.k(this.v);
    return t2;
  };
  LinkList2.prototype.pushFront = function(t2) {
    this._(t2, this.h);
    return this.i;
  };
  LinkList2.prototype.popFront = function() {
    if (this.i === 0) return;
    var t2 = this.l.L;
    this.k(this.l);
    return t2;
  };
  LinkList2.prototype.setElementByPos = function(t2, i) {
    if (t2 < 0 || t2 > this.i - 1) {
      throw new RangeError();
    }
    var n = this.l;
    while (t2--) {
      n = n.u;
    }
    n.L = i;
  };
  LinkList2.prototype.insert = function(t2, i, n) {
    if (n === void 0) {
      n = 1;
    }
    if (t2 < 0 || t2 > this.i) {
      throw new RangeError();
    }
    if (n <= 0) return this.i;
    if (t2 === 0) {
      while (n--) this.pushFront(i);
    } else if (t2 === this.i) {
      while (n--) this.pushBack(i);
    } else {
      var r = this.l;
      for (var e = 1; e < t2; ++e) {
        r = r.u;
      }
      var s = r.u;
      this.i += n;
      while (n--) {
        r.u = {
          L: i,
          o: r
        };
        r.u.o = r;
        r = r.u;
      }
      r.u = s;
      s.o = r;
    }
    return this.i;
  };
  LinkList2.prototype.find = function(t2) {
    var i = this.l;
    while (i !== this.h) {
      if (i.L === t2) {
        return new LinkListIterator(i, this.h, this);
      }
      i = i.u;
    }
    return this.end();
  };
  LinkList2.prototype.reverse = function() {
    if (this.i <= 1) {
      return this;
    }
    var t2 = this.l;
    var i = this.v;
    var n = 0;
    while (n << 1 < this.i) {
      var r = t2.L;
      t2.L = i.L;
      i.L = r;
      t2 = t2.u;
      i = i.o;
      n += 1;
    }
    return this;
  };
  LinkList2.prototype.unique = function() {
    if (this.i <= 1) {
      return this.i;
    }
    var t2 = this.l;
    while (t2 !== this.h) {
      var i = t2;
      while (i.u !== this.h && i.L === i.u.L) {
        i = i.u;
        this.i -= 1;
      }
      t2.u = i.u;
      t2.u.o = t2;
      t2 = t2.u;
    }
    return this.i;
  };
  LinkList2.prototype.sort = function(t2) {
    if (this.i <= 1) {
      return this;
    }
    var i = [];
    this.forEach(function(t3) {
      i.push(t3);
    });
    i.sort(t2);
    var n = this.l;
    i.forEach(function(t3) {
      n.L = t3;
      n = n.u;
    });
    return this;
  };
  LinkList2.prototype.merge = function(t2) {
    var i = this;
    if (this.i === 0) {
      t2.forEach(function(t3) {
        i.pushBack(t3);
      });
    } else {
      var n = this.l;
      t2.forEach(function(t3) {
        while (n !== i.h && n.L <= t3) {
          n = n.u;
        }
        i._(t3, n.o);
      });
    }
    return this.i;
  };
  LinkList2.prototype.forEach = function(t2) {
    var i = this.l;
    var n = 0;
    while (i !== this.h) {
      t2(i.L, n++, this);
      i = i.u;
    }
  };
  LinkList2.prototype[Symbol.iterator] = function() {
    var t2;
    return __generator(this, function(i) {
      switch (i.label) {
        case 0:
          if (this.i === 0) return [2];
          t2 = this.l;
          i.label = 1;
        case 1:
          if (!(t2 !== this.h)) return [3, 3];
          return [4, t2.L];
        case 2:
          i.sent();
          t2 = t2.u;
          return [3, 1];
        case 3:
          return [2];
      }
    });
  };
  return LinkList2;
}(SequentialContainer);

// __bench__/main.bench.ts
var bench = new x({ iterations: 1e3 });
bench.add("@dsa/linkedlist", () => {
  const list = new LinkedList();
  for (let i = 0; i < 5e3; i++) {
    list.pushBack(i);
  }
  for (let i = 0; i < 5e3; i++) {
    list.pushFront(i);
  }
  const arr = [...list];
  const l2 = new LinkedList(arr, (x2) => x2.data);
}).add("@js-sdsl/link-list", () => {
  const list = new LinkList();
  for (let i = 0; i < 5e3; i++) {
    list.pushBack(i);
  }
  for (let i = 0; i < 5e3; i++) {
    list.pushFront(i);
  }
  const arr = [...list];
  const l2 = new LinkList(arr);
}).add("Array", () => {
  const list = new Array();
  for (let i = 0; i < 5e3; i++) {
    list.push(i);
  }
  for (let i = 0; i < 5e3; i++) {
    list.unshift(i);
  }
});
await bench.warmup();
await bench.run();
console.table(bench.table());
