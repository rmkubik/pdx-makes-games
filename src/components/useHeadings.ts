import { useEffect, useState } from "react";

export const useHeadings = () => {
  const [headings, setHeadings] = useState<HTMLElement[]>();

  // Just run on mount for now,
  // maybe should wait for headings
  // to actually mount first though?
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) throw new Error("Missing main");

    let nodes: HTMLElement[] = [];
    const addAllNodes = (selector: string) => {
      main
        .querySelectorAll(selector)
        .forEach((node) => nodes.push(node as HTMLElement));
    };
    addAllNodes("h1");
    addAllNodes("h2");
    addAllNodes("h3");
    addAllNodes("h4");
    addAllNodes("h5");
    addAllNodes("h6");

    nodes.sort((a, b) => {
      switch (a.compareDocumentPosition(b)) {
        case Node.DOCUMENT_POSITION_PRECEDING:
          return 1;
        case Node.DOCUMENT_POSITION_FOLLOWING:
          return -1;
        default:
          console.warn(
            "Heading document position not linear: ",
            a.compareDocumentPosition(b)
          );
          return 0;
      }
    });

    setHeadings(nodes);
  }, []);

  return headings;
};
