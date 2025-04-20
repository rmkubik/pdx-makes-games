import React from "react";
import { colors } from "src/theme/palette";
import {
  outlineWithShadowLarge,
  textShadowSmall,
} from "src/theme/sharedStyles";

export const Header = () => {
  return (
    <header
      style={{
        ...outlineWithShadowLarge,
        padding: "1rem 2rem",
        backgroundColor: colors.offWhite,
      }}
    >
      <h1>
        <span style={{ ...textShadowSmall }}>🌲</span> Portland makes games
      </h1>
    </header>
  );
};
