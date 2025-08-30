import React, { PropsWithChildren } from "react";
import { Header } from "../components/Header";
import { Helmet } from "react-helmet";
import { colors } from "src/theme/palette";
import trees1 from "../../images/trees-tile-1.png";
import trees2 from "../../images/trees-tile-2.png";
import trees3 from "../../images/trees-tile-3.png";
import rain from "../../images/rain.png";
import { useLayout } from "./useLayout";

const tiledImageWidth = 351;
const tiledImageHeight = 163;

export const Layout = ({ children }: PropsWithChildren) => {
  const { appMaxWidth } = useLayout();

  return (
    <>
      <Helmet>
        <style>
          {`
            body {
              margin: 0;
              background-color: ${colors.green1};
              font-family: "Helvetica";
              line-height: 1.5;
              background-image: url(${rain});
              background-repeat: repeat;
            }
            
            h1, h2, h3, h4, h5, h6 {
              padding: 0;
              margin: 0;
            }

            .button:hover,
            button:hover,
            input[type="submit"]:hover {
              transform: scale(1.05) rotate(2deg);
              transition: transform 0.1s ease-in-out;
            }

            main {
              max-width: ${appMaxWidth}px;
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
          marginTop: "2rem",
          margin: "0 auto",
        }}
      >
        <Header />
        {children}
      </main>
      <div
        style={{
          backgroundImage: `url(${trees3})`,
          backgroundPosition: `bottom left -12px`,
          backgroundRepeat: `repeat-x`,
          width: "100vw",
          height: "100vh",
          position: "fixed",
          bottom: 130,
          left: 0,
          backgroundSize: `${tiledImageWidth * 1}px ${tiledImageHeight * 1}px`,
          zIndex: -1,
        }}
      />
      <div
        style={{
          backgroundImage: `url(${trees2})`,
          backgroundPosition: `bottom left -28px`,
          backgroundRepeat: `repeat-x`,
          width: "100vw",
          height: "100vh",
          position: "fixed",
          bottom: 75,
          left: 0,
          backgroundSize: `${tiledImageWidth * 1.15}px ${
            tiledImageHeight * 1.15
          }px`,
          zIndex: -1,
        }}
      />
      <div
        style={{
          backgroundImage: `url(${trees1})`,
          backgroundPosition: `bottom left`,
          backgroundRepeat: `repeat-x`,
          width: "100vw",
          height: "100vh",
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundSize: `${tiledImageWidth * 1.35}px ${
            tiledImageHeight * 1.35
          }px`,
          zIndex: -1,
        }}
      />
    </>
  );
};
