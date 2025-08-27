import React, { useState } from "react";
import { constructArray } from "src/arrays/constructArray";
import { colors } from "src/theme/palette";

export const ShortAnswer = ({
  items,
  pageSize,
}: {
  items: string[];
  pageSize: number;
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div
      style={{
        borderColor: colors.offBlack,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "aliceblue",
        marginTop: 16,
        marginBottom: 16,
      }}
    >
      <ul
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        {items
          .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
          .map((item) => (
            <li
              style={{
                padding: 8,
                listStyle: "none",
                borderBottomColor: colors.offBlack,
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                backgroundColor: "aliceblue",
              }}
            >
              {item}
            </li>
          ))}
      </ul>
      <ul
        style={{
          margin: 0,
          padding: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <li
          style={{
            listStyle: "none",
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 8,
            paddingRight: 8,
            cursor: "pointer",
          }}
          onClick={() => {
            const prevPage = currentPage - 1;
            if (prevPage < 0) return;
            setCurrentPage(prevPage);
          }}
        >
          ←
        </li>
        {constructArray((x) => x, Math.ceil(items.length / pageSize)).map(
          (pageNumber) => (
            <li
              style={{
                listStyle: "none",
                backgroundColor:
                  pageNumber === currentPage
                    ? colors.lightestGreen
                    : "transparent",
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 8,
                paddingRight: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentPage(pageNumber);
              }}
            >
              {pageNumber + 1}
            </li>
          )
        )}
        <li
          style={{
            listStyle: "none",
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 8,
            paddingRight: 8,
            cursor: "pointer",
          }}
          onClick={() => {
            const nextPage = currentPage + 1;
            if (nextPage > pageSize) return;
            setCurrentPage(nextPage);
          }}
        >
          →
        </li>
      </ul>
    </div>
  );
};
