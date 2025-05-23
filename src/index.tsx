import { createRoot } from "react-dom/client";
import React from "react";
import { App } from "./components/App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container missing in index.html");
}
const root = createRoot(container);
root.render(<App />);
