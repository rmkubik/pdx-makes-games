import React, { CSSProperties } from "react";
import { PropsWithChildren } from "react";
import { colors } from "../theme/palette";
import { outlineWithShadowLarge } from "src/theme/sharedStyles";

export const Section = ({
  children,
  style = {},
}: PropsWithChildren<{ style?: CSSProperties }>) => {
  return (
    <section
      style={{
        ...outlineWithShadowLarge,
        padding: "2rem",
        backgroundColor: colors.offWhite,
        ...style,
      }}
    >
      {children}
    </section>
  );
};
