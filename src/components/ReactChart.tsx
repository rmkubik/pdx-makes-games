import React from "react";
import { colors } from "src/theme/palette";

export type Comparator<T> = (a: T, b: T) => number;

export const ReactChart = ({
  data,
  answerCount,
  sort,
  label,
}: {
  data: Record<string, number>;
  answerCount: number;
  sort?: Comparator<[string, number]>;
  label: string;
}) => {
  const entries = Object.entries(data);

  if (sort) {
    entries.sort(sort);
  }

  return (
    <ul
      style={{ padding: 0, display: "flex", flexDirection: "column", gap: 8 }}
    >
      {entries.map(([key, value]) => (
        <li
          style={{
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: "auto 13ch",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              borderColor: colors.offBlack,
              borderWidth: "1px",
              borderStyle: "solid",
              backgroundColor: "aliceblue",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 8,
                paddingRight: 8,
                boxSizing: "border-box",
                position: "relative",
                zIndex: 1,
                display: "flex",
              }}
            >
              <span style={{ flex: 1 }}>{key}</span>
              <span>{`${Math.round((value / answerCount) * 100)}%`}</span>
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${(value / answerCount) * 100}%`,
                backgroundColor: colors.lightestGreen,
                height: "100%",
                // borderRightColor: colors.darkestGreen,
                // borderRightWidth: "1px",
                // borderRightStyle: "solid",
              }}
            />
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            {`${value} ${label}`}
          </span>
        </li>
      ))}
    </ul>
  );
};
