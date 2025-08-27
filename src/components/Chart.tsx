import { ChartConfiguration, Chart as ChartJS, registerables } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

/**
 * This is registering the entirety of the chart.js library.
 * This is an inefficient use of space and bloating the bundle.
 * It would be better to ONLY import the specific charts
 * and other things that we're using on the site.
 */
ChartJS.register(...registerables);
ChartJS.register(ChartDataLabels);

export const Chart = ({ config }: { config: ChartConfiguration }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new ChartJS(canvasRef.current, config);

    setChart(chart);
  }, [config, canvasRef]);

  return (
    <div style={{ position: "relative" }}>
      {!chart ? (
        <p style={{ position: "absolute", top: 12, left: 12 }}>LOADING</p>
      ) : null}
      <canvas ref={canvasRef} />
    </div>
  );
};
