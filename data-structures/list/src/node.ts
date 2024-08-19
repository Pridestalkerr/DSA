export class ListNode<T> {
  data: T;
  prev: ListNode<T> | undefined = undefined;
  next: ListNode<T> | undefined = undefined;
  constructor(data: T) {
    this.data = data;
  }

  public insertBefore(node: ListNode<T>) {
    node.prev = this.prev;
    node.next = this;
    if (this.prev) {
      // can be removed if circular
      this.prev.next = node;
    }
    this.prev = node;
  }

  public insertAfter(node: ListNode<T>) {
    node.prev = this;
    node.next = this.next;
    if (this.next) {
      // can be removed if circular
      this.next.prev = node;
    }
    this.next = node;
  }
}
