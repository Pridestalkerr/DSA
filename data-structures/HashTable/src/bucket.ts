import { type LinkedList } from "@dsa/linkedlist";

// export type Bucket<T> = {
//   data: LinkedList<T>;
//   meta: any;
// };

export type Bucket<T> = {
  data: Array<T>;
  meta: any;
};
