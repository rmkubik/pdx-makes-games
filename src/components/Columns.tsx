import React from "react";
import { unique } from "src/arrays/unique";
import { colors } from "src/theme/palette";

export const Columns = ({ items }: { items: string[] }) => {
  return (
    <ul
      style={{
        padding: 8,
        columnCount: 3,
        borderColor: colors.offBlack,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "aliceblue",
      }}
    >
      {items.sort().map((item) => (
        <li style={{ listStyle: "none" }}>{item}</li>
      ))}
    </ul>
  );
};
