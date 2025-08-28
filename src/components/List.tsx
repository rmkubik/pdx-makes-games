import React, { ReactNode } from "react";
import { colors } from "src/theme/palette";

export const List = ({ items }: { items: ReactNode[] }) => {
  return (
    <ul
      style={{
        padding: 8,
        borderColor: colors.offBlack,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "aliceblue",
      }}
    >
      {items.map((item) => (
        <li style={{ listStyle: "none" }}>{item}</li>
      ))}
    </ul>
  );
};
