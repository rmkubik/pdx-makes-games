import { describe, expect, it } from "vitest";
import { Csv } from "./Csv";

describe("Csv", () => {
  it("should get column by title", () => {
    const csv = new Csv([
      ["header1", "header2"],
      ["row1.column1", "row1.column2"],
      ["row2.column1", "row2.column2"],
    ]);

    expect(csv.getColumnByTitle("header1").asArray()).toEqual([
      "row1.column1",
      "row2.column1",
    ]);
  });
});
