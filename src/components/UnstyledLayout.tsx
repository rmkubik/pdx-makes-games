import React, { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import { useLayout } from "./useLayout";
import { Outlet } from "react-router";

export const UnstyledLayout = ({ children }: PropsWithChildren) => {
  const { appMaxWidth } = useLayout();

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          {`
            h1, h2, h3, h4, h5, h6 {
              padding: 0;
              margin: 0;
            }

            a.link-button:hover,
            .button:hover,
            button:hover,
            input[type="submit"]:hover {
              transform: scale(1.05) rotate(2deg);
              transition: transform 0.1s ease-in-out;
            }

            main {
              max-width: ${appMaxWidth}px;
              margin: 0 auto,
            }

            main {
              padding: 2rem;

              @media (max-width: 750px) {
                padding: 1rem;
              }
            }
          `}
        </style>
        <script
          data-goatcounter="https://pdxmakesgames.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
      </Helmet>
      <main
        style={{
          // maxWidth: "650px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};
