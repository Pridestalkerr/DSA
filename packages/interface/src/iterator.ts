export type ForwardIterator<T> = {
  value: T;
  done: boolean;
  next(): ForwardIterator<T>;
  [Symbol.iterator](): ForwardIterator<T>;
};

export type BidirectionalIterator<T> = {
  value: T;
  done: boolean;
  canNext: boolean;
  canPrev: boolean;
  next(): BidirectionalIterator<T>;
  prev(): BidirectionalIterator<T>;
  [Symbol.iterator](): BidirectionalIterator<T>;
};
