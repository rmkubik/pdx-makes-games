import React, { CSSProperties, PropsWithChildren } from "react";
import { colors } from "src/theme/palette";
import { outlineWithShadowSmall } from "src/theme/sharedStyles";

export const Button = ({
  children,
  onClick,
  style = {},
  as: Tag = "button",
  href,
}: PropsWithChildren<{
  onClick?: () => void;
  style?: CSSProperties;
  as?: "button" | "a";
  href?: string;
}>) => {
  return (
    <Tag
      className="button"
      style={{
        ...outlineWithShadowSmall,
        backgroundColor: colors.darkGreen,
        color: colors.offWhite,
        fontWeight: "bold",
        fontSize: "1.15rem",
        padding: "0.5rem",
        cursor: "pointer",
        textDecoration: "none",
        ...style,
      }}
      onClick={onClick}
      href={href}
    >
      {children}
    </Tag>
  );
};
