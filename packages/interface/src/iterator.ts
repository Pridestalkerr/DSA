export type BidirectionalIterator<T> = {
  value: T;
  reverse: boolean;
  initialized: boolean;
  canNext: boolean;
  canPrev: boolean;
  done: boolean;
  next(): BidirectionalIterator<T>;
  prev(): BidirectionalIterator<T>;
  [Symbol.iterator](): BidirectionalIterator<T>;
} & Iterator<T>;
