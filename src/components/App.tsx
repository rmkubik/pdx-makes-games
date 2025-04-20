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

export const App = () => {
  return (
    <>
      <Helmet>
        <style>
          {`
            body {
              margin: 0;
              background-color: ${colors.lightestGreen};
              font-family: "Helvetica";
              line-height: 1.5;
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
      />
    </>
  );
};
