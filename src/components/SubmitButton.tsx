import React, { CSSProperties, PropsWithChildren } from "react";
import { colors } from "src/theme/palette";
import { outlineWithShadowSmall } from "src/theme/sharedStyles";

export const SubmitButton = ({
  children,
  style = {},
}: PropsWithChildren<{ style?: CSSProperties }>) => {
  return (
    <input
      type="submit"
      style={{
        ...outlineWithShadowSmall,
        backgroundColor: colors.darkGreen,
        color: colors.offWhite,
        fontWeight: "bold",
        fontSize: "1.15rem",
        padding: "0.5rem",
        cursor: "pointer",
        ...style,
      }}
      value={children}
    />
  );
};
