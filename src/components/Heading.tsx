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
}: PropsWithChildren<{
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  style?: CSSProperties;
}>) => {
  // track headings in a context so we can build a toc
  return (
    <Tag style={style} id={slugify(children?.toString().toLowerCase() ?? "")}>
      {children}
    </Tag>
  );
};

// TODO:
// Add a hashtag anchor to link to the header on hover, like on my personal site
