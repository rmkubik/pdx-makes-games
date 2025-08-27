import { expect, test, describe } from "vitest";
import { remove } from "./remove";

describe("remove", () => {
  test("should remove item at index", () => {
    const result = remove(["a", "b", "c"], 1);
    expect(result[1]).toBe("c");
    expect(result.length).toBe(2);
  });

  test("should handle empty array", () => {
    const result = remove([], 1);
    expect(result[1]).toBe(undefined);
    expect(result.length).toBe(0);
  });
});
