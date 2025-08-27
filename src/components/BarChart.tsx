import React from "react";
import { Chart } from "./Chart";

export const BarChart = ({
  data,
  // dataType,
  answerCount,
}: {
  data: Record<string, number>;
  // dataType: "multiple-choice" | "single-answer";
  answerCount: number;
}) => {
  const values = Object.values(data);

  return (
    <Chart
      config={{
        type: "bar",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: "# of Votes",
              data: values,
              borderWidth: 1,
              barThickness: 36,
            },
          ],
        },
        options: {
          // maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { mirror: true },
            },
            x: {
              max: answerCount,
            },
          },
          indexAxis: "y",
          plugins: {
            tooltip: {
              enabled: false,
            },
            datalabels: {
              anchor: "end",
              align: "end",
              formatter: (value) => value, // Shows the count
              font: {
                weight: "bold",
              },
            },
          },
        },
      }}
    />
  );
};
