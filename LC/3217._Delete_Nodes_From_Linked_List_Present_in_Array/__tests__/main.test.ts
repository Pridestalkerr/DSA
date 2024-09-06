import { describe, expect, test } from "@jest/globals";
import fn from "../src/index";
import LN from "../src/node";

function buildList(nums: number[]) {
  const head = new LN(nums[0]);
  let c = head;
  for (let i = 1; i < nums.length; i++) {
    c.next = new LN(nums[i]);
    c = c.next;
  }
  return head;
}

describe("LC/3217._Delete_Nodes_From_Linked_List_Present_in_Array", () => {
  test("T1", () => {
    const nums = [1, 2, 3];
    const head = buildList([1, 2, 3, 4, 5]);
    const output = buildList([4, 5]);
    expect(fn(nums, head)).toEqual(output);
  });
  test("T2", () => {
    const nums = [1];
    const head = buildList([1, 2, 1, 2, 1, 2]);
    const output = buildList([2, 2, 2]);
    expect(fn(nums, head)).toEqual(output);
  });
  test("T3", () => {
    const nums = [5];
    const head = buildList([1, 2, 3, 4]);
    const output = buildList([1, 2, 3, 4]);
    expect(fn(nums, head)).toEqual(output);
  });
});
