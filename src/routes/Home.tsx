import React, { useEffect, useLayoutEffect } from "react";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { EmailInput } from "../components/EmailInput";
import { SubmitButton } from "../components/SubmitButton";
import { useLayout } from "src/components/useLayout";

export const Home = () => {
  const { setAppMaxWidth } = useLayout();
  useLayoutEffect(() => {
    setAppMaxWidth(650);
  }, []);

  return (
    <>
      <Section>
        <h2>Hello!</h2>
        <p>
          We are a small group of local dev friends looking to learn more about
          the Portland game dev community.
        </p>
        <p>
          We know there are a lot of people doing all kinds of game dev here,
          but not a lot of data around it. Let's change that together!
        </p>
      </Section>
      <Section>
        <h2>Unconference</h2>
        <p>
          The Portland games community can use more events centered around
          discussion with professionals. There are a lot of people in town, but
          the options for game events are largely centered around hobbyist
          activities.
        </p>
        <p>
          The PDX Games Unconference is intended to facilitate conversations
          between professional game creators.
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
          <Button as="a" href="/unconference">
            Learn more
          </Button>
        </div>
      </Section>
      <Section>
        <h2>Census</h2>
        <p>
          This survey was sent to various Portland area communities. It contains
          questions about the type of games work people do and the games-related
          events they're interested in.
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
          <Button as="a" href="/census">
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
      <Section>
        <h2>Career Stories</h2>
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
      </Section>
    </>
  );
};
