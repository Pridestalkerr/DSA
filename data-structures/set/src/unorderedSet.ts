import { Bucket } from "./bucket";

export class UnorderedSet<T> {
  // should map the key to a 64-bit or 32-bit integer
  // the distribution of the hash should be as uniform as possible
  // the hash function should be fast
  // we will perform an additional normalization step to bring the hash into the range of the array
  private hash: (key: T) => number;
  private _INITIAL_SIZE = 16;
  private _LOAD_FACTOR = 0.75; // when to resize
  private _GROWTH_FACTOR = 2; // how much to resize, should be a power of 2 for fast modulo
  // size is the number of elements in the set
  private _size = 0;
  // capacity is the number of buckets, should just use length of _buckets
  private _capacity = this._INITIAL_SIZE;
  private _buckets = Array.from({ length: this._capacity }, () => new Bucket<T>());

  // collision resolution strategy
  // up to 8: array for better cache locality
  // up to 32: linked list to speed up removals
  // above 32: RB tree for logarithmic time complexity
  // these numbers are entirely arbitrary, and should be determined empirically (ideally)
  // its hard to make a general purpose hash table, instead we should provide an interface
  // to allow users to do whatever they choose and consider best for their use case
  // we will abstract the entirety of this behavior

  constructor() {}

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public empty() {
    return this.size === 0;
  }

  public get size() {
    return this._size;
  }

  public get length() {
    return this.size;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public clear() {
    this._size = 0;
    this._capacity = this._INITIAL_SIZE;
    // TODO: clear all references
  }

  public insert(key: T) {
    const index = this._getBucketIndex(key);
    const bucket = this._buckets[index]!;
    bucket.insert(key);
    this._size++;
  }

  // ======================================
  // ===============PRIVATE================
  // ======================================
  private _getBucketIndex(key: T) {
    const hash = this.hash(key);
    const index = hash % this._capacity;
    return index;
  }
}
