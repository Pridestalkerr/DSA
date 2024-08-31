import { LinkedList } from "@dsa/linkedlist";
import { ListNodeIterator } from "@dsa/linkedlist/src/iterator";
import { Bucket } from "./bucket";

export class ForwardIterator<T> {
  protected __bucketIterator: ListNodeIterator<Bucket<T>>;
  protected __current: ListNodeIterator<T>;

  // TODO: copy constructor
  constructor(bucketIt: ListNodeIterator<Bucket<T>>, start: ListNodeIterator<T>, reverse = false) {
    this.__bucketIterator = bucketIt;
    this.__current = start;
  }

  //   public static from<T>(it: ForwardIterator<T>) {
  //     return new ForwardIterator(it.__bucketIterator, it.__current);
  //   }

  public get done() {
    return this.__bucketIterator.done;
  }

  public get value() {
    return this.__current.value;
  }

  public next() {
    if (this.__current.done) {
      this.__bucketIterator.next();
      if (!this.__bucketIterator.done) {
        this.__current = this.__bucketIterator.value.data.begin();
      }
    } else {
      this.__current.next();
    }
    return this;
  }
}

export class BidirectionalIterator<T> {}
