import React from "react";
import { Helmet } from "react-helmet";
import pfogIcon from "images/pfog_icon.png";
import greyzzImage from "images/greyzz.png";
import realPortlandFog from "images/real-portland-fog.jpg";

export const Pfog = () => {
  return (
    <>
      <Helmet>
        <style>{`
        @font-face {
          font-family: Honeyblot;
          src: url("/fonts/honeyblot_caps.ttf");
          font-weight: bold;
        }

        a.link-button,h1,h2,h3,h4,h5,h6 {
          font-family: Honeyblot, sans-serif;
        }

        /**
         * In the past, I have usually just applied a background
         * texture directly to the body element and let that be.
         * 
         * This has always made it so that when you scroll to the 
         * top of the page, you can scroll past the application of
         * the background texture.
         * 
         * This dynamic scroll _feels_ better, but it can be jarring
         * if the untextured color is much different than the textured
         * color, as is the case with this site.
         * 
         * Instead, I've done a bit of a hack. This breaks that
         * dynamic scroll but prevents the "overscroll" where you can
         * see the untextured background color.
         * 
         * In this case we:
         * - Add overflow: hidden and the background styling to html
         * - Add overflow: scroll and height: 100% to the body, remove default margin
         * - Move any margins or paddings from body to main
         * 
         * Now we no longer overscroll and see the unstyled background.
         */ 

        html {
          background: url(${greyzzImage});
          background-color: #939cb8;
          overflow: hidden;
        }

        body {
          font-family: sans-serif;
          
          margin: 0;
          overflow: scroll;
          height: 100%;
        }

        main {
          background: white;
          border: 1px solid black;
          border-radius: 16px;
          margin: 1rem auto;
        }

        a.link-button {
          background: white;
          border: 1px solid black;
          padding: 1rem 0.5rem;
          border-radius: 6px;
          text-decoration: none;
          color: inherit;
          text-align: center;

          &:hover {
            cursor: pointer;
          }
        }

        p {
          margin: 1rem 0;
        }

        figure {
          max-width: 100%;

          img {
            box-shadow: 8px 8px black;
            border: 4px solid black;
            width: 100%;
          }  

          figcaption {
            margin-top: 2rem;
            padding-left: 2rem;
          }
        }

        table {
          width: 100%;
          border-collapse: collapse;

          margin-top: 2rem;
          margin-bottom: 2rem;

          thead {
            border-bottom: 1px solid black;
          }

          th, td {
            padding: 0.5rem;
          }

          th > div {
            display: flex;
            flex-direction: column;
            align-items: center;

            span:last-child {
              font-weight: normal;
            }
          }

          td > div {
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
              text-align: center;
            }

            span:first-child {
              font-weight: bold;
            }
          }
        }
      `}</style>
      </Helmet>
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img src={pfogIcon} style={{ width: "80px" }} />
          <h1>Portland Festival of Gaming</h1>
        </div>
        <p>
          Not heading to San Francisco for GDC? Hang out and chat with Portland
          developers that week instead! <strong>March 9 - 13.</strong>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            rowGap: "0.5rem",
            columnGap: "1rem",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <a
            className="link-button"
            href="https://www.eventbrite.com/e/pfog-kick-off-tickets-1983051788281"
            target="_blank"
            rel="noopener noreferrer"
          >
            RSVP for PFOG Kickoff
          </a>
          <span>Monday, March 9th @ 7PM</span>
          <a
            className="link-button"
            href="https://discord.gg/mJpRchvMP4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join us on Discord
          </a>
          <span>Propose event ideas, meet people, keep up to date</span>
        </div>
      </section>
      <section>
        <h2>Tentative schedule</h2>
        <p>
          PFOG is a community organized week of events. The locations, dates,
          and times listed here will be in flux until closer to the event week.
          Please join the Discord to get specifics. We'll try to keep this list
          updated.
        </p>
        <table>
          <thead>
            <tr>
              <th>
                <div>
                  <span>Monday</span>
                  <span>Mar 9th</span>
                </div>
              </th>
              <th>
                <div>
                  <span>Tuesday</span>
                  <span>Mar 10th</span>
                </div>
              </th>
              <th>
                <div>
                  <span>Wednesday</span>
                  <span>Mar 11th</span>
                </div>
              </th>
              <th>
                <div>
                  <span>Thursday</span>
                  <span>Mar 12th</span>
                </div>
              </th>
              <th>
                <div>
                  <span>Friday</span>
                  <span>Mar 13th</span>
                </div>
              </th>
              <th>
                <div>
                  <span>Saturday</span>
                  <span>Mar 14th</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <div>
                  <span>N Coffee Chat</span>
                  <span>9am @ The Stacks Coffeehouse</span>
                </div>
              </td>
              <td></td>
              <td>
                <div>
                  <span>Casual Coworking</span>
                  <span>1-4pm @ Steeplejack / Harder Day on Hawthorne</span>
                </div>
              </td>
              <td>
                <div>
                  <span>NE Coffee Chat</span>
                  <span>9-11am @ Extracto Coffee Roasters</span>
                </div>
              </td>
              <td>
                <div>
                  <span>Park Day + Bike Ride</span>
                  <span>1pm @ Mt. Tabor</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>PFOG Kickoff</span>
                  <span>7pm @ Migration Brewing</span>
                  <span>
                    <a href="https://www.eventbrite.com/e/pfog-kick-off-tickets-1983051788281">
                      RSVP
                    </a>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <span>Custom Hardware Meetup</span>
                  <span>7pm @ TBD</span>
                </div>
              </td>
              <td>
                <div>
                  <span>Board Game Night</span>
                  <span>6pm @ Baerlic Brewery & Taproom</span>
                </div>
              </td>
              <td>
                <div>
                  <span>1000 Blank Cards</span>
                  <span>7pm @ TBD</span>
                </div>
              </td>
              <td>
                <div>
                  <span>PFOG Closing + Showcase</span>
                  <span>7pm @ TBD</span>
                  <span>
                    <a href="https://www.eventbrite.com/e/pfog-closing-showcase-tickets-1983166958759">
                      RSVP
                    </a>
                  </span>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>What is this?</h2>
        <p>
          PFOG is a week of community organized events around Portland, March
          9-13. We’re putting together a kick off and a closing event. You’re
          bringing the rest!
        </p>
        <p>We’re inspired by other community led events like:</p>
        <ul>
          <li>The XOXO community day meetups</li>
          <li>Boston FIG’s GameLoop Unconference</li>
          <li>Informal meetups in Yerba Buena Gardens outside GDC</li>
        </ul>
        <p>
          We want to meet new people. We want to see cool stuff you’re working
          on. We want you to meet each other too.
        </p>
      </section>
      <section>
        <h2>What isn't this?</h2>
        <p>
          This isn’t a conference. We have no speakers or passes or expensive
          expo halls. There isn’t a pre-determined schedule of events made by a
          board of organizers.
        </p>
        <p>
          PFOG is here to connect devs up and facilitate YOUR events. A
          community organized week of dev hangs. It isn’t stuffy or rigid. It
          might be nothing. We’ll see who comes!
        </p>
      </section>
      <section>
        <h2>Who are we?</h2>
        <p>
          We are a small group of local dev friends looking to hang out with the
          Portland game dev community.
        </p>
        <p>
          We aren't going to GDC this year but still want to meet up with other
          devs, share stories, talk games, maybe learn a thing or two.
        </p>
        <p>
          We’re not here to build out event content or set up talks, but if you
          want ideas for meetup spots or need help booking, let us know.
          Otherwise, you might not even know we exist... 👀
        </p>
      </section>
      <figure>
        <img src={realPortlandFog} />
        <figcaption>
          Authentic Portland Fog
          <br />
          Captured Feb. 21, 2026 @ 12:01 PM
          <br />
          Upper Macleay Trail, Forest Park
        </figcaption>
      </figure>
      <footer>
        ⬅ <a href="/">pdxmakes.games</a>
      </footer>
    </>
  );
};
