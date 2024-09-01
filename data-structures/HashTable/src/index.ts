import { CMP, Hash } from "@dsa/common";
import { LinkedList } from "@dsa/linkedlist";
import { Bucket } from "./bucket";

// NOTE:
// a linked list for collisions might work nice in theory
// but that is solely dependent on how many collisions we allow
// should bench array shift vs linked list erase for small sizes (2-10)
export class HashTable<T> {
  // LENGTH OF THIS SHOULD BE A FIXED SIZE, NOT INCREASE RANDOMLY, RESIZE INSTEAD
  protected __buckets: Array<Bucket<T> | undefined>;
  protected __filled: LinkedList<Bucket<T>>; // TODO: this might be worthless
  protected __size: number;
  protected static __INITIAL_SIZE = 32;
  protected static __LOAD_FACTOR = 0.75; // size / capacity
  protected static __LOAD_FACTOR_FILLED = 0.5; // filled / capacity
  protected static __LOAD_FACTOR_AVERAGE = 2; // size / filled (when 2 collisions on average, resize)
  // TODO: maybe should be a prime
  protected static __GROWTH_FACTOR = 2;
  protected __equals: CMP.EQ<T>;
  protected __hash: (key: T, cap: number) => number;

  constructor(hashFn: Hash.Fn<T>, equalsFn: CMP.EQ<T>, from?: Iterable<T>) {
    this.__buckets = new Array(HashTable.__INITIAL_SIZE);
    this.__filled = new LinkedList();
    this.__size = 0;
    this.__equals = equalsFn;
    this.__hash = hashFn;
    // TODO: quickly populate with values from iterable
    // we need to quickly find the best __INITIAL_SIZE that fits the data
    // and then insert all the values
  }

  // ======================================
  // ==============ITERATORS===============
  // ======================================
  //   public begin() {
  //     const x = this.__filled.begin();
  //     const y = x.value.data.begin();
  //     return new ForwardIterator(x, y);
  //   }

  // ======================================
  // ==============CAPACITY================
  // ======================================
  public get empty() {
    return this.__size === 0;
  }

  public get size() {
    return this.__size;
  }

  public get length() {
    return this.size;
  }

  // ======================================
  // ===============LOOKUP=================
  // ======================================
  public findFirst(key: T) {
    const bucket = this.__buckets[this.__getBucketIndex(key)];
    if (!bucket || bucket.data.length === 0) {
      return undefined;
    }
    return this.__findFirstInBucket(bucket, key);
  }

  public findAll(key: T) {
    const bucket = this.__buckets[this.__getBucketIndex(key)];
    if (!bucket || bucket.data.length === 0) {
      return [];
    }
    return this.__findAllInBucket(bucket, key);
  }

  public contains(key: T) {
    return this.findFirst(key) !== undefined;
  }

  // ======================================
  // ==============MODIFIERS===============
  // ======================================
  public clear() {
    this.__size = 0;
    this.__buckets = new Array(HashTable.__INITIAL_SIZE);
    this.__filled = new LinkedList();
    // TODO: figure out if more must be done
    // namely, iterators will hold a reference to the old buckets
    // if an iterator is left alive, this memory will leak forever, is that a problem?
  }

  // TODO: lots of if statements here, see if we can do better
  public insertUnique(key: T): boolean {
    // TODO: make sure this resizes exactly when needed, capacity should never increase manually
    if (this.__shouldResize()) {
      this.__resize();
    }

    const bucketIdx = this.__getBucketIndex(key);
    const bucket = this.__buckets[bucketIdx];

    if (!bucket) {
      // not yet initialized, free to insert
      this.__createBucket(bucketIdx).data.push(key);
    } else if (this.__bucketHasKey(bucket, key)) {
      return false;
    } else {
      bucket.data.push(key);
    }

    this.__size++;
    return true;
  }

  public insert(key: T): true {
    if (this.__shouldResize()) {
      this.__resize();
    }

    const bucketIdx = this.__getBucketIndex(key);
    const bucket = this.__buckets[bucketIdx];

    if (!bucket) {
      // not yet initialized, free to insert
      this.__createBucket(bucketIdx).data.push(key);
    } else {
      bucket.data.push(key);
    }

    this.__size++;
    return true;
  }

  public eraseOne(key: T) {
    const bucketIdx = this.__getBucketIndex(key);
    const bucket = this.__buckets[bucketIdx];
    if (bucket === undefined) {
      return undefined; // nothing to erase
    }

    for (let i = 0; i < bucket.data.length; i++) {
      const curr = bucket.data[i]!;
      if (this.__equals(curr, key)) {
        bucket.data.splice(i, 1);
        this.__size--;
        return curr;
      }
    }
    return undefined;
  }

  // ======================================
  // ===============PRIVATE================
  // ======================================
  protected __getBucketIndex(key: T) {
    return this.__hash(key, this.__buckets.length);
  }

  protected __bucketHasKey(bucket: Bucket<T>, key: T): boolean {
    for (const keyitr of bucket.data) {
      if (this.__equals(keyitr, key)) {
        return true;
      }
    }
    return false;
  }

  protected __loadFactorFilled() {
    // factor based on filled buckets
    return this.__filled.size / this.__buckets.length;
  }

  protected __loadFactor() {
    // factor based on total elements
    return this.__size / this.__buckets.length;
  }

  protected __loadFactorAverage() {
    // factor based on average bucket size
    // i.e 4 elements, 2 filled buckets => 2 avg elements per bucket
    // => thus collision ratio is 2
    const avg = this.__size / this.__filled.size;
    return avg / this.__buckets.length;
  }

  protected __findFirstInBucket(bucket: Bucket<T>, key: T) {
    // TODO: this will be slow i think
    // perhaps its better to expose the linkedlist internals
    // and do it inline
    for (const keyitr of bucket.data) {
      if (this.__equals(keyitr, key)) {
        return keyitr;
      }
    }
    return undefined;
  }

  protected __findAllInBucket(bucket: Bucket<T>, key: T) {
    const result = [];
    for (const keyitr of bucket.data) {
      if (this.__equals(keyitr, key)) {
        result.push(keyitr);
      }
    }
    return result;
  }

  protected __shouldResize() {
    // change this to whichever load factor you want, or make a better interface for it
    return this.__loadFactor() > HashTable.__LOAD_FACTOR;
  }

  // given a total size, how many buckets would be needed
  protected __expectedCapacity(total: number) {
    // const minBuckets = Math.ceil(total / HashTable.__LOAD_FACTOR);
    // const iterations =
    //   Math.ceil(Math.log2(minBuckets / HashTable.__INITIAL_SIZE)) /
    //   Math.log2(HashTable.__GROWTH_FACTOR);
    // const cap = Math.pow(HashTable.__GROWTH_FACTOR, iterations) * HashTable.__INITIAL_SIZE;
    // return Math.max(HashTable.__INITIAL_SIZE, minBuckets);
    // TODO: could bench the above
    let cap = HashTable.__INITIAL_SIZE;
    while (cap * HashTable.__LOAD_FACTOR < total) {
      cap >>= 1;
    }
    return cap;
  }

  protected __resize(cap: number = this.__buckets.length * HashTable.__GROWTH_FACTOR) {
    if (this.__size === 0) return;

    const newBuckets = new Array<Bucket<T>>(cap);
    const newFilled = new LinkedList<Bucket<T>>();

    for (const node of this.__filled) {
      const bucket = node.data;
      for (const key of bucket.data) {
        const index = this.__hash(key, newBuckets.length);
        const newBucket = newBuckets[index];

        if (!newBucket) {
          this.__createBucket(index, newBuckets, newFilled);
        }
        newBuckets[index]!.data.push(key);
      }
    }

    this.__buckets = newBuckets;
    this.__filled = newFilled;
  }

  protected __createBucket(index: number, buckets = this.__buckets, filled = this.__filled) {
    const newBucket: Bucket<T> = {
      data: new Array(),
      meta: undefined,
    };
    filled.pushBack(newBucket);
    newBucket.meta = filled.back()!.data;
    buckets[index] = newBucket;
    return newBucket;
  }
}
