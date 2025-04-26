import React from "react";
import { Header } from "./Header";
import { Section } from "./Section";
import { Helmet } from "react-helmet";
import { colors } from "src/theme/palette";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import treesLayer1 from "../../images/trees-layer-1.png";
import treesLayer2 from "../../images/trees-layer-2.png";
import treesLayer3 from "../../images/trees-layer-3.png";
import treesLayer4 from "../../images/trees-layer-4.png";
import treesTileable1 from "../../images/trees-tileable-1.png";
import treesTileable2 from "../../images/trees-tileable-2.png";
import treesTileable3 from "../../images/trees-tileable-3.png";
import trees1 from "../../images/trees-tile-1.png";
import trees2 from "../../images/trees-tile-2.png";
import trees3 from "../../images/trees-tile-3.png";
import rain from "../../images/rain.png";

const tiledImageWidth = 351;
const tiledImageHeight = 163;

export const App = () => {
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
          `}
        </style>
      </Helmet>
      <main
        style={{
          maxWidth: "650px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "2rem",
          marginTop: "2rem",
          margin: "0 auto",
        }}
      >
        <Header />
        <Section>
          <h2>Hello!</h2>
          <p>
            This is some information about who we are or what this website is. I
            need to think about what belongs here still.
          </p>
        </Section>
        <Section>
          <h2>PDX Games Census</h2>
          <p>
            We're running a survey to get to know the Portland area games
            community better.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2rem",
              marginBottom: "3rem",
            }}
          >
            <Button onClick={console.log}>Take the survey!</Button>
          </div>
          <p>
            We intend to share the results of the survey on this site, publicly,
            so that anyone can use the information to hold great games related
            events in Portland.
          </p>
          <p>
            If you want to be notified when the survey results are published,
            sign up for our mailing list.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "3rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{ display: "flex", gap: "0.5rem", flexDirection: "row" }}
            >
              <TextInput placeholder="your@email.com" style={{ flex: "1" }} />
              <Button onClick={console.log}>Sign up</Button>
            </div>
          </div>
        </Section>
      </main>
      <div
        style={{
          backgroundImage: `url(${trees3})`,
          backgroundPosition: `bottom left -12px`,
          backgroundRepeat: `repeat-x`,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          bottom: 130,
          left: 0,
          backgroundSize: `${tiledImageWidth * 1}px ${tiledImageHeight * 1}px`,
          // backgroundSize: "cover",
          // filter: "blur(5px)",
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
          position: "absolute",
          bottom: 75,
          left: 0,
          backgroundSize: `${tiledImageWidth * 1.15}px ${
            tiledImageHeight * 1.15
          }px`,
          // backgroundSize: "cover",
          // filter: "blur(5px)",
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
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundSize: `${tiledImageWidth * 1.35}px ${
            tiledImageHeight * 1.35
          }px`,
          // backgroundSize: "cover",
          // filter: "blur(5px)",
          zIndex: -1,
        }}
      />
      {/* <div
        style={{
          backgroundImage: `url(${treesLayer4})`,
          backgroundPosition: `bottom center`,
          backgroundRepeat: `repeat-x`,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          bottom: 150,
          left: 0,
          // backgroundSize: "cover",
          // filter: "blur(5px)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          backgroundImage: `url(${treesLayer3})`,
          backgroundPosition: `bottom center`,
          backgroundRepeat: `repeat-x`,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          bottom: 100,
          left: 0,
          // backgroundSize: "cover",
          // filter: "blur(5px)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          backgroundImage: `url(${treesLayer2})`,
          backgroundPosition: `bottom center`,
          backgroundRepeat: `repeat-x`,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          bottom: 0,
          left: 0,
          // backgroundSize: "cover",
          // filter: "blur(5px)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          backgroundImage: `url(${treesLayer1})`,
          backgroundPosition: `bottom center`,
          backgroundRepeat: `repeat-x`,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          bottom: 0,
          left: 0,
          // backgroundSize: "cover",
          // filter: "blur(5px)",
          zIndex: -1,
        }}
      /> */}
    </>
  );
};
