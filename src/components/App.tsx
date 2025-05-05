import React from "react";
import { Header } from "./Header";
import { Section } from "./Section";
import { Helmet } from "react-helmet";
import { colors } from "src/theme/palette";
import { Button } from "./Button";
import { EmailInput } from "./EmailInput";
import trees1 from "../../images/trees-tile-1.png";
import trees2 from "../../images/trees-tile-2.png";
import trees3 from "../../images/trees-tile-3.png";
import rain from "../../images/rain.png";
import { SubmitButton } from "./SubmitButton";

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

            button:hover,
            input[type="submit"]:hover {
              transform: scale(1.05) rotate(2deg);
              transition: transform 0.1s ease-in-out;
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
            We are a small group of local dev friends looking to learn more
            about the Portland game dev community.
          </p>
          <p>
            We know there are a lot of people doing all kinds of game dev here,
            but not a lot of data around it. Let's change that together!
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
            <Button
              onClick={() => {
                window.open("https://tally.so/r/mVDA5a", "_blank")?.focus();
              }}
            >
              Take the survey!
            </Button>
          </div>
          <p>
            We will share the results of the survey on this site, publicly, so
            that anyone can use the information to hold great games-related
            events in Portland.
          </p>
          <p>
            If you want to be notified when the survey results are published,
            sign up for our mailing list.
          </p>
          <form
            action="https://buttondown.com/api/emails/embed-subscribe/pdxmakesgames"
            method="post"
            target="popupwindow"
            onSubmit={() =>
              window.open("https://buttondown.com/pdxmakesgames", "popupwindow")
            }
            className="embeddable-buttondown-form"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "3rem",
                marginBottom: "3rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexDirection: "row",
                  flex: "1",
                  maxWidth: "400px",
                }}
              >
                <EmailInput
                  id="bd-email"
                  name="email"
                  placeholder="your@email.com"
                  style={{ flex: "1" }}
                />
                <SubmitButton>Sign up</SubmitButton>
              </div>
            </div>
          </form>
          <p>
            We're excited to share data to facilitate organizing in Portland. We
            hope you find it useful!
          </p>
        </Section>
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
