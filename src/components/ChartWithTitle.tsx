import React, { useMemo } from "react";
import { Heading } from "./Heading";
import { ReactChart } from "./ReactChart";
import { Csv } from "src/csv/Csv";

export type ChartWithTitleProps = {
  title: string;
  columnType: "single" | "multi";
  sortType:
    | { type: "alpha" }
    | { type: "count" }
    | { type: "manual"; order: string[] };
  csv: Csv;
  data?: { answers: Record<string, number>; answerCount: number };
  label?: string;
  description?: string;
};

export const ChartWithTitle = ({
  title,
  columnType,
  sortType,
  csv,
  data,
  label = "responses",
  description,
}: ChartWithTitleProps) => {
  const [chartData, answerCount] = useMemo(() => {
    if (data) {
      return [data.answers, data.answerCount];
    }

    const column = csv.getColumnByTitle(title);

    switch (columnType) {
      case "single":
        return [column.asSingleChoiceRecord(), column.answerCount];
      case "multi":
        return [column.asMultipleChoiceRecord(), column.answerCount];
      default:
        throw new Error("Unimplemented chart type");
    }
  }, [csv, columnType]);

  const sort = useMemo(() => {
    switch (sortType.type) {
      case "alpha":
        return ([keyA]: [string, number], [keyB]: [string, number]) =>
          keyA.localeCompare(keyB);
      case "count":
        return ([, valueA]: [string, number], [, valueB]: [string, number]) =>
          valueB - valueA;
      case "manual":
        return ([keyA]: [string, number], [keyB]: [string, number]) => {
          const priorityA = sortType.order.indexOf(keyA);
          const priorityB = sortType.order.indexOf(keyB);
          return priorityA - priorityB;
        };
      default:
        return undefined;
    }
  }, [sortType]);

  return (
    <>
      {/* <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Heading as="h4" style={{ flex: 1 }}>
          {title}
        </Heading>
        <span
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 4,
            paddingRight: 4,
            borderColor: colors.offBlack,
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "aliceblue",
            marginRight: -5,
          }}
        >
          {answerCount} responses
        </span>
      </div> */}
      <div
      // style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Heading as="h4" style={{ flex: 1 }}>
          {title}
        </Heading>
        <span
        // style={
        //   {
        //     paddingTop: 0,
        //     paddingBottom: 0,
        //     paddingLeft: 4,
        //     paddingRight: 4,
        //     borderColor: colors.offBlack,
        //     borderWidth: 1,
        //     borderStyle: "solid",
        //     backgroundColor: "aliceblue",
        //     marginRight: -5,
        //   }
        // }
        >
          {answerCount} {label}
        </span>
      </div>
      {description ? <p>{description}</p> : null}
      <ReactChart
        data={chartData}
        answerCount={answerCount}
        sort={sort}
        label={label}
      />
    </>
  );
};
