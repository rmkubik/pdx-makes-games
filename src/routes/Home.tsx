import React, { useLayoutEffect } from "react";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { EmailInput } from "../components/EmailInput";
import { SubmitButton } from "../components/SubmitButton";
import { useLayout } from "src/components/useLayout";
import { Helmet } from "react-helmet";
import realPortlandFog from "images/real-portland-fog.jpg";
import { outlineWithShadowLargeForHome } from "src/theme/sharedStyles";

export const Home = () => {
  const { setAppMaxWidth } = useLayout();
  useLayoutEffect(() => {
    setAppMaxWidth(800);
  }, []);

  return (
    <>
      <Helmet>
        <style>
          {`
            * {
              font-family: Helvetica, sans-serif;
              line-height: 1.5;
            }

            main {
              margin: 1rem auto;
            }

            html {
              font-size: 1.075rem;
            }

            h1, h2 {
              text-shadow: 2px 2px 2px lightgray;
            }

            body::before {
              content: "";
              position: fixed;
              inset: 0;
              background: url(${realPortlandFog}) center/cover no-repeat;
              // filter: blur(22px) brightness(1.2);
              background-color: rgba(0, 0, 0, 0.3);
              transform: scale(1.05); /* prevents edge cutoff */
              z-index: -1;
            }
          `}
        </style>
      </Helmet>
      <header
        style={{
          ...outlineWithShadowLargeForHome,
          padding: "1rem 2rem",
          backgroundColor: "#ecf0e9",
        }}
      >
        {/* <marquee> */}
        <h1>🌲 Portland Makes Games</h1>
        {/* </marquee> */}
      </header>
      <Section bg="#ecf0e9" forHome>
        <h2>👋 Hello!</h2>
        <p>
          PDX Makes Games is a collective of game makers living in Portland,
          Oregon. We organize and attend events in town.
        </p>
        <h3>Newsletter</h3>
        <p>
          If you're interested in learning more about games-related events in
          Portland, sign up for our newsletter.
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
              <SubmitButton color="#ecf0e9" bg="#43472e">
                Sign up
              </SubmitButton>
            </div>
          </div>
        </form>
        <h3>Discord</h3>
        <p>
          If you want to chat with other game makers or see what we're up to
          more often, you can{" "}
          <a href="https://discord.gg/mNyyE9Fptf">
            join us in the PFOG Discord
          </a>
          .
        </p>
      </Section>
      <Section bg="#ecf0e9" forHome>
        <h2>📆 Community Calendar</h2>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=cGR4bWFrZXNnYW1lc0BnbWFpbC5jb20"
          style={{
            border: "2px solid black",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
          width="100%"
          height="600"
        ></iframe>
        <h3>What's on here?</h3>
        <p>
          Events are put on this calendar when PDX Makes Games community members
          voice interest in them. They're here so other Portland game makers can
          discover cool happenings in town.
        </p>
        <p>
          We also include events organized in{" "}
          <a href="https://discord.gg/mNyyE9Fptf">the PFOG Discord</a>.
        </p>
      </Section>
      <Section bg="#ecf0e9" forHome>
        <h2>☁️ Portland Festival of Games 2026</h2>
        <p>
          Not heading to San Francisco for GDC? Hang out and chat with Portland
          developers that week instead! March 9 - 14.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Button as="a" href="/pfog" color="white" bg="#43472e">
            Check out PFOG
          </Button>
        </div>
      </Section>
      <Section bg="#ecf0e9" forHome>
        <h2>🗳️ PDX Games Census</h2>
        <p>
          This survey was sent to various Portland area communities in 2025. It
          contains questions about the type of games work people do and the
          games-related events they're interested in.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Button as="a" href="/census" color="white" bg="#43472e">
            See the results
          </Button>
        </div>
        {/* <p>
          We're running a survey to get to know the Portland area games
          community better.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Button
            onClick={() => {
              window.open("https://tally.so/r/mVDA5a", "_blank")?.focus();
            }}
          >
            Take the survey!
          </Button>
        </div> */}
        {/* <p>
          We will share the results of the survey on this site, publicly, so
          that anyone can use the information to hold great games-related events
          in Portland.
        </p> */}
        {/* <p>
          If you want to be notified when the survey results are published, sign
          up for our mailing list.
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
        </p> */}
      </Section>
      {/* <Section>
        <h2>PDX Games Career Stories</h2>
        <p>Share your career history with other Portland game developers!</p>
        <p>
          Any definition of career is welcome here whether you make games full
          time, part time, or as a hobbyist. We want to hear your stories!
        </p>
        <p>We will post submissions on the site!</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Button
            onClick={() => {
              window.open("https://tally.so/r/wdOZaz", "_blank")?.focus();
            }}
          >
            Tell your story!
          </Button>
        </div>
      </Section> */}
    </>
  );
};
