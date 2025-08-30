import React from "react";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <style>
          {`
            header:hover .title {
              text-decoration: underline;
            }
          `}
        </style>
      </Helmet>
      <a href="/" style={{ textDecoration: "none", color: colors.offBlack }}>
        <h1>
          <span style={{ ...textShadowSmall }}>🌲</span>{" "}
          <span className="title">Portland makes games</span>
        </h1>
      </a>
    </header>
  );
};
