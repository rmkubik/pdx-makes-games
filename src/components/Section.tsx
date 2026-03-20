import React, { CSSProperties } from "react";
import { PropsWithChildren } from "react";
import { colors } from "../theme/palette";
import {
  outlineWithShadowLarge,
  outlineWithShadowLargeForHome,
} from "src/theme/sharedStyles";

export const Section = ({
  children,
  bg,
  forHome,
  style = {},
}: PropsWithChildren<{
  style?: CSSProperties;
  bg?: string;
  forHome?: boolean;
}>) => {
  return (
    <section
      style={{
        ...(forHome ? outlineWithShadowLargeForHome : outlineWithShadowLarge),
        padding: "2rem",
        backgroundColor: bg ?? colors.offWhite,
        ...style,
      }}
    >
      {children}
    </section>
  );
};
