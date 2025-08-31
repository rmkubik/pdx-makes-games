import React, { useEffect, useLayoutEffect } from "react";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import { EmailInput } from "../components/EmailInput";
import { SubmitButton } from "../components/SubmitButton";
import { useLayout } from "src/components/useLayout";

export const Unconference = () => {
  const { setAppMaxWidth } = useLayout();
  useLayoutEffect(() => {
    setAppMaxWidth(650);
  }, []);

  return (
    <>
      <Section>
        <h2>PDX Games Unconference</h2>
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
        <h3>Professionals</h3>
        <p>
          This focus on professionals isn't intended to exclude. If you identify
          as professional, support yourself part time, or even just aspiring to
          do so you are welcome to attend.
        </p>
        <p>
          The intention with calling out professionalism is to focus on deeper
          conversations our communities don't generally allow for as well.
        </p>
        <h3>What's an unconference?</h3>
        <p>
          Traditional conferences are driven by the organizers of the event.
          They find speakers and topics beforehand and attendees show up as
          largely passive participants.
        </p>
        <p>
          An unconference is driven by the attendees of the event. The
          organizers provide a venue and help facilitate, but all the topics and
          discussions are driven by the community.
        </p>
        <p>
          At the kick off for the event, attendees will propose topics on post
          it notes around the space. Everyone then votes on which topics they're
          interested in discussing. Organizers schedule these popular topics
          throughout the day in various breakout rooms. Attendees are free to
          participate in whatever they want.
        </p>
        <h3>Interested?</h3>
        <p>
          We'll send you an email when there is more information if you sign up
          here.
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
      </Section>
    </>
  );
};
