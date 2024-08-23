export type BidirectionalIterator<T> = {
  value: T;
  initialized: boolean;
  done: boolean;
  canNext: boolean;
  canPrev: boolean;
  next(): BidirectionalIterator<T>;
  prev(): BidirectionalIterator<T>;
  [Symbol.iterator](): BidirectionalIterator<T>;
} & Iterator<T>;
