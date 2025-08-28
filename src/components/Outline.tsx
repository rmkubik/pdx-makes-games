import React from "react";
import slugify from "slugify";
import { Section } from "./Section";
import { Heading } from "./Heading";
import { useHeadings } from "./useHeadings";

const getPaddingForElement = (element: HTMLElement) => {
  const rhythm = 12;

  switch (element.tagName) {
    case "H1":
      return 0;
    case "H2":
      return rhythm * 0;
    case "H3":
      return rhythm * 1;
    case "H4":
      return rhythm * 2;
    case "H5":
      return rhythm * 3;
    case "H6":
      return rhythm * 4;
    default:
      return 0;
  }
};

export const Outline = () => {
  const headings = useHeadings();

  return (
    <Section>
      <Heading as="h2">Outline</Heading>
      <ul style={{ padding: 0 }}>
        {headings
          ?.filter((heading) => {
            switch (heading.tagName) {
              case "H2":
              case "H3":
                return true;
              case "H1":
              default:
                return false;
            }
          })
          .filter((heading) => heading.textContent !== "Outline")
          .map((heading) => (
            <li
              style={{
                listStyle: "none",
                paddingLeft: getPaddingForElement(heading),
              }}
            >
              <a href={`#${slugify(heading.textContent).toLowerCase()}`}>
                {heading.textContent}
              </a>
            </li>
          ))}
      </ul>
    </Section>
  );
};
