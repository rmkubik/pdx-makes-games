import React, {
  CSSProperties,
  PropsWithChildren,
  StyleHTMLAttributes,
} from "react";
import slugify from "slugify";

export const Heading = ({
  as: Tag,
  children,
  style,
  withBackToTop = false,
}: PropsWithChildren<{
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  style?: CSSProperties;
  withBackToTop?: boolean;
}>) => {
  // track headings in a context so we can build a toc
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Tag
        style={{ ...style, flex: 1 }}
        id={slugify(children?.toString().toLowerCase() ?? "")}
      >
        {children}
      </Tag>
      {withBackToTop ? <a href="#">Back to top</a> : null}
    </div>
  );
};

// TODO:
// Add a hashtag anchor to link to the header on hover, like on my personal site
