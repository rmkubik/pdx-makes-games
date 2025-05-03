import React, { CSSProperties } from "react";
import { borderSmall } from "src/theme/sharedStyles";

export const EmailInput = ({
  placeholder,
  style = {},
  name,
  id,
}: {
  placeholder: string;
  style: CSSProperties;
  name: string;
  id: string;
}) => {
  return (
    <input
      type="email"
      placeholder={placeholder}
      name={name}
      id={id}
      style={{
        padding: "0.5rem",
        ...borderSmall,
        ...style,
      }}
    />
  );
};
