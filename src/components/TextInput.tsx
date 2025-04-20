import React, { CSSProperties } from "react";
import { borderSmall } from "src/theme/sharedStyles";

export const TextInput = ({
  placeholder,
  style = {},
}: {
  placeholder: string;
  style: CSSProperties;
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      style={{
        padding: "0.5rem",
        ...borderSmall,
        ...style,
      }}
    />
  );
};
