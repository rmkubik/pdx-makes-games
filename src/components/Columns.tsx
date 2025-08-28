import React from "react";
import { unique } from "src/arrays/unique";
import { colors } from "src/theme/palette";

export const Columns = ({
  items,
  columns = 3,
}: {
  items: string[];
  columns?: number;
}) => {
  return (
    <ul
      style={{
        padding: 8,
        columnCount: columns,
        borderColor: colors.offBlack,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "aliceblue",
      }}
    >
      {items
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map((item) => (
          <li style={{ listStyle: "none" }}>{item}</li>
        ))}
    </ul>
  );
};
