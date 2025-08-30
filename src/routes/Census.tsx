import React, { useEffect, useLayoutEffect } from "react";
import surveyResults from "../data/PDX Games Census_Submissions_2025-08-02.csv";
import { Section } from "src/components/Section";
import { Csv } from "src/csv/Csv";
import { Heading } from "src/components/Heading";
import { unique } from "src/arrays/unique";
import { Columns } from "src/components/Columns";
import { ShortAnswer } from "src/components/ShortAnswer";
import {
  ChartWithTitle,
  ChartWithTitleProps,
} from "src/components/ChartWithTitle";
import { Outline } from "src/components/Outline";
import { doIt } from "src/functional/doIt";
import { List } from "src/components/List";
import { Helmet } from "react-helmet";
import { Button } from "src/components/Button";
import { useLayout } from "src/components/useLayout";

const csv = new Csv(surveyResults);

const Chart = (props: Omit<ChartWithTitleProps, "csv">) => {
  return <ChartWithTitle csv={csv} {...props} />;
};

export const Census = () => {
  const { setAppMaxWidth } = useLayout();
  useLayoutEffect(() => {
    setAppMaxWidth(900);
  }, []);

  return (
    <div
      className="census"
      style={{
        display: "grid",
        gap: 30,
      }}
    >
      <Helmet>
        <style>{`
          .census {
            grid-template-columns: max-content auto;

            @media (max-width: 750px) {
              grid-template-columns: auto;
            }
          }

          .census aside {
            position: sticky;
            
            @media (max-width: 750px) {
              position: static;
            }
          }
        `}</style>
      </Helmet>
      <aside
        style={{
          top: "1rem",
          alignSelf: "start", // We need this so the item can break out of the grid
          // transform: "translateX(calc(-100% - 24px))",
          // maxWidth: "300px",
          // minWidth: "200px",
        }}
      >
        <Outline />
      </aside>
      <div
        style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <Section>
          <Heading as="h2">Introduction</Heading>
          <p>
            This <strong>PDX Games Census</strong> was sent to various Portland
            area communities. It contains questions about the type of games work
            people do and the games-related events they're interested in.
          </p>
          <p>
            There were <strong>{csv.rowCount} responses</strong>. We know this
            is a small portion of the amount of folks actually making games in
            town. Hopefully the information can still be useful!
          </p>
          <Heading as="h3">Take the survey</Heading>
          <p>
            We'd love more submissions! We will update the data on this page
            periodically as they come in. The last update was on{" "}
            <strong>August 29th, 2025</strong>.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2rem",
              marginBottom: "1rem",
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
        </Section>
        <Section>
          <Heading as="h2" withBackToTop>
            Making games
          </Heading>
        </Section>
        <Section>
          <Heading as="h3" withBackToTop>
            Activities
          </Heading>
          <br />
          <Chart
            title="Which activities do you do related to making games?"
            columnType="multi"
            sortType={{ type: "count" }}
          />
          <Chart
            title="How many different activities per person?"
            columnType="single"
            sortType={{ type: "alpha" }}
            data={doIt(() => {
              const column = csv
                .getColumnByTitle(
                  "Which activities do you do related to making games?"
                )
                .transform((item: string) => {
                  const activities = item.split(",");
                  return activities.length.toString();
                });

              return {
                answers: column.asSingleChoiceRecord(),
                answerCount: column.answerCount,
              };
            })}
          />
          <Chart
            title="What activities are done by people doing only one activity?"
            columnType="single"
            sortType={{ type: "alpha" }}
            data={doIt(() => {
              const column = csv
                .getColumnByTitle(
                  "Which activities do you do related to making games?"
                )
                .transform((item: string) => {
                  const activities = item.split(",");
                  if (activities.length === 1) return item;
                  return "";
                })
                .filter((item: string) => {
                  return item !== "";
                });

              return {
                answers: column.asSingleChoiceRecord(),
                answerCount: column.answerCount,
              };
            })}
            label="people"
          />
        </Section>
        <Section>
          <Heading as="h3" withBackToTop>
            Support
          </Heading>
          <br />
          <Chart
            title="Do you support yourself with games-related work?"
            columnType="single"
            sortType={{ type: "manual", order: ["Fully", "Partially", "No"] }}
          />
          <Chart
            title="Do you make games outside of work?"
            columnType="single"
            sortType={{ type: "manual", order: ["Yes", "No"] }}
          />
          <Chart
            title="Do you do contract games-related work?"
            columnType="single"
            sortType={{ type: "manual", order: ["Yes", "No"] }}
          />
          <Chart
            title="Do people doing contract work support themselves with games?"
            columnType="multi"
            sortType={{ type: "count" }}
            data={doIt(() => {
              const column = csv
                .getColumnByTitle(
                  "Do you support yourself with games-related work?"
                )
                .transform((item: string, index: number) => {
                  if (
                    csv
                      .getColumnByTitle(
                        "Do you do contract games-related work?"
                      )
                      .getItem(index) === "Yes"
                  )
                    return item;

                  return "";
                })
                .filter((item: string) => {
                  return item !== "";
                });

              return {
                answers: column.asMultipleChoiceRecord(),
                answerCount: column.answerCount,
              };
            })}
            label="people"
          />
          <Chart
            title="How many of your coworkers or collaborators are located in Portland?"
            columnType="single"
            sortType={{ type: "manual", order: ["All", "Some", "None"] }}
          />
        </Section>
        <Section>
          <Heading as="h3" withBackToTop>
            Publishing
          </Heading>
          <br />
          <Chart
            title="Do you self publish games?"
            columnType="single"
            sortType={{ type: "manual", order: ["Yes", "No"] }}
          />
          <Chart
            title="Do people self publishing support themselves with games?"
            columnType="multi"
            sortType={{ type: "count" }}
            data={doIt(() => {
              const column = csv
                .getColumnByTitle(
                  "Do you support yourself with games-related work?"
                )
                .transform((item: string, index: number) => {
                  if (
                    csv
                      .getColumnByTitle("Do you self publish games?")
                      .getItem(index) === "Yes"
                  )
                    return item;

                  return "";
                })
                .filter((item: string) => {
                  return item !== "";
                });

              return {
                answers: column.asMultipleChoiceRecord(),
                answerCount: column.answerCount,
              };
            })}
            label="people"
          />
          <Chart
            title="Have you worked with a publisher?"
            columnType="single"
            sortType={{ type: "manual", order: ["Yes", "No"] }}
          />
          <Chart
            title="Do people who have worked with a publisher support themselves with games?"
            columnType="multi"
            sortType={{ type: "count" }}
            data={doIt(() => {
              const column = csv
                .getColumnByTitle(
                  "Do you support yourself with games-related work?"
                )
                .transform((item: string, index: number) => {
                  if (
                    csv
                      .getColumnByTitle("Have you worked with a publisher?")
                      .getItem(index) === "Yes"
                  )
                    return item;

                  return "";
                })
                .filter((item: string) => {
                  return item !== "";
                });

              return {
                answers: column.asMultipleChoiceRecord(),
                answerCount: column.answerCount,
              };
            })}
            label="people"
          />
        </Section>
        <Section>
          <Heading as="h3" withBackToTop>
            Mediums
          </Heading>
          <br />
          <Chart
            title="What mediums do you make games in?"
            columnType="multi"
            sortType={{ type: "count" }}
          />
          <Chart
            title="What mediums do people who have worked with a publisher work in?"
            columnType="multi"
            sortType={{ type: "count" }}
            data={doIt(() => {
              const column = csv
                .getColumnByTitle("What mediums do you make games in?")
                .transform((item: string, index: number) => {
                  if (
                    csv
                      .getColumnByTitle("Have you worked with a publisher?")
                      .getItem(index) === "Yes"
                  )
                    return item;

                  return "";
                })
                .filter((item: string) => {
                  return item !== "";
                });

              return {
                answers: column.asMultipleChoiceRecord(),
                answerCount: column.answerCount,
              };
            })}
            label="people"
          />
          <Heading as="h4">What kinds of games do you work on?</Heading>
          <span>{csv.rowCount} responses</span>
          <p>
            This was a short answer question. Here are some genres and styles
            people mentioned.
          </p>
          <Columns
            items={unique([
              "Adventure",
              "Exploration",
              "Discovery",
              "Mystery",
              "RPG",
              "Narrative",
              "Party",
              "Platformer",
              "Survival",
              "Adventure",
              "Puzzle",
              "Narrative Puzzle",
              "Narrative Driven FPS",
              "Survival Crafting",
              "Educational",
              "Educational",
              "Puzzle",
              "Cozy",
              "Action RPG",
              "Storytelling",
              "Simulation",
              "Incremental",
              "Text Adventure",
              "Music",
              "Party",
              "Push Your Luck",
              "Video Slots",
              "Visual Novels",
              "Narrative",
              "Roleplaying",
              "Action/Adventure",
              "Platformer",
              "FPS ARPG",
              "Time Trial",
              "Narrative Action",
              "Alternative Controller",
              "Character Action",
              "Strategy",
              "Roguelike",
              "Web Games",
              "Art Games",
              "Roblox",
              "Action",
              "Strategy",
              "RPG",
              "Narrative",
              "RPG Systems",
              "Platformers",
              "Arcade",
              "RPG",
              "Life Sim",
              "Story-driven",
              "Puzzle",
              "3D Platformer",
              "FPS",
              "Narrative",
              "Story generator",
              "AI based games",
              "God Simulator",
            ])}
          />
          <Heading as="h3">Tell your story</Heading>
          <p>
            Many people also shared cool career stories with us! We didn't want
            to publish these unless people opted in to that explicitly.
          </p>
          <p>
            Whether you've been doing this for years or are just starting out,
            we'd love to hear your stories!
          </p>
          <p>We will post submissions on this site.</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2rem",
              marginBottom: "1rem",
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
        <Section>
          <Heading as="h2" withBackToTop>
            Events
          </Heading>
        </Section>
        <Section>
          <Heading as="h3" withBackToTop>
            Preferences
          </Heading>
          <br />
          <Chart
            title="Have you paid to attend any games-related events?"
            columnType="single"
            sortType={{ type: "manual", order: ["Yes", "No"] }}
          />
          <Chart
            title="What is your masking preference?"
            columnType="single"
            sortType={{
              type: "manual",
              order: [
                "Masking always required",
                "Masking required indoors",
                "Masking optional indoors",
                "No preference",
              ],
            }}
          />
          <Chart
            title="Do you prefer indoor or outdoor events?"
            columnType="single"
            sortType={{ type: "count" }}
          />
        </Section>
        <Section>
          <Heading as="h3" withBackToTop>
            Topics
          </Heading>
          <br />
          <Chart
            title="What parts of game events are you interested in?"
            columnType="multi"
            sortType={{ type: "count" }}
          />
          <Heading as="h4">
            What games-related topics are you interested in?
          </Heading>
          <span>
            {
              csv.getColumnByTitle(
                "What games-related topics are you interested in?"
              ).answerCount
            }{" "}
            responses
          </span>
          <p>
            This was a short answer question. Many people are interested in
            hearing about many different disciplines. People are also interested
            in hearing specific stories from others' experiences.
          </p>
          <p>All the topics people mentioned are listed below.</p>
          <Columns
            columns={2}
            items={unique([
              "Design",
              "Marketing",
              "Technical",
              "Level design",
              "Creative programming",
              "Publishing tales",
              "Postmortems",
              "Systemic design best practices",
              "Procedural content development",
              "Cross-disciplinary work",
              "Audio",
              "Social sciences in game dev",
              "Physics controllers",
              "User interfaces",
              "Graphics programming",
              "Game design philosophies",
              "Production",
              "Game dev",
              "Funding",
              "Storytelling for point and click",
              "Shaders",
              "Narrative design",
              "Procedural generation",
              "New technology",
              "Art",
              "Concept art",
              "Illustration",
              "Narrative",
              "Public relations",
              "Community building",
              "Content creation",
              "Equity in games",
              "Uplifting marginalized devs",
              "Skill building",
              "Networking",
              "Marketing",
              "People talking about what they love",
              "Development stories",
              "Breaking into the industry",
              "Jobs in gaming",
              "Funding opportunities",
              "Fast prototyping",
              "Short term collaborations",
              "Open source game engines",
              "In depth talks on released games",
              "Writing",
              "Business",
              "Marketing",
              "Community management",
              "Innovative gameplay",
              "Game creation ethos",
              "Character design",
              "Story design",
              "Collectible card games",
              "Roguelikes",
              "Behind the scenes",
              "Union news",
              "Current trends",
              "New game releases",
              "Retro games",
              "Homebrew games",
              "3D modeling",
              "Development pipelines",
              "Hearing from industry professionals",
              "Hanging out casually",
              "Artificial intelligence",
              "Technical feats",
              "Portland game releases",
              "Getting published",
              "Publishing",
            ])}
          />
          <Heading as="h4">
            What kind of games-related events would you like to see in Portland?
          </Heading>
          <span>
            {
              csv.getColumnByTitle(
                "What kind of games-related events would you like to see in Portland?"
              ).answerCount
            }{" "}
            responses
          </span>
          <p>
            This was a short answer section. Many people expressed interest in
            local conferences dedicated to games. Many of the event types below
            are also mentioned by many people.
          </p>
          <Columns
            columns={2}
            items={unique([
              "Meetups",
              "Talks",
              "Barbecues",
              "Conferences",
              "Showcases",
              "Regular meetups",
              "Playtesting",
              "Mini conferences",
              "Showcases",
              "Social events",
              "Dedicated coworking space",
              "Dedicated event space",
              "Showcases of smaller games",
              "Casual events",
              "Summit",
              "Networking socials",
              "Talent talks",
              "Game club (like a book club)",
              "Game jams",
              "Learning opportunities",
              "Lectures",
              "Shorter talks on specific work",
              "Hands on events",
              "Structure to help folks connect",
              "Events that lead to funding",
              "Events with publishers",
              "Workshops",
              "Professional networking",
              "Annual events that stick around",
              "Judged competitions",
              "Arcades",
              "Zines",
              "All day coworking",
              "Events further east",
              "Vancouver events",
              "Outdoor events",
              "Happy hours",
              "Round-table discussions",
              "Board game convention",
              "Coffee",
            ])}
          />
        </Section>
        <Section>
          <Heading as="h3" withBackToTop>
            Game events
          </Heading>
          <br />
          <Heading as="h4">
            What games-related events have you attended?
          </Heading>
          <span>
            {
              csv.getColumnByTitle(
                "What games-related events have you attended?"
              ).answerCount
            }{" "}
            responses
          </span>
          <p>
            Many responders mentioned private or invite only communities. Only
            the events with public facing information are listed below.
          </p>
          <Columns
            columns={2}
            items={unique([
              "GDC",
              "PAX",
              "XOXO",
              "PIGSquad",
              "Portland Retro Gaming Expo",
              "PAX West",
              "PAX East",
              "E3",
              "Bit Bash",
              "ALTcade",
              "Playtest PDX",
              "OrcaCon",
              "GameStorm",
              "Gen Con",
              "PAX South",
              "Comic cons",
              "Fan Expo",
              "Wholesome Snack",
              "Wholesome Direct",
              "LudoNarraCon",
              "Playstation EXPO",
              "Pokemon Regionals",
              "Pokemon Worlds",
              "TwitchCon",
              "Seattle Indies Expo",
              "C2E2",
              "Gayming Awards",
              "A Maze",
              "IndieCade",
              "Experimental Game Workshop",
              "alt.ctrl.GDC",
              "Fantastic Arcade",
              "Future of StoryTelling",
              "Children's Media Conference",
              "digiPlaySpace",
              "Indie Arcade @ The Smithsonian",
              "ZKM",
              "Train Jam",
              "Game Connection",
              "WordPlay",
              "Pixelatl",
              "Playcrafting NYC",
              "Serious Play Conf",
              "Casual Connect",
              "Imladris",
              "PixelPop Festival",
              "Global Game Jam",
              "GameStorm",
              "Work With Indies Online Chats",
              "Seattle Indies",
              "SavePoint GDC Meetup",
              "Games Industry Gathering",
              "Oregon Game Project Challenge",
              "KublaCon",
              "PAGDIG",
              "OMSI",
              "PAX Unplugged",
              "Unpub",
            ])}
          />
        </Section>
        <Section>
          <Heading as="h2" withBackToTop>
            Communities
          </Heading>
          <br />
          <Chart
            title="How do you keep in touch with your communities?"
            columnType="multi"
            sortType={{ type: "count" }}
          />
          <Heading as="h4">
            What games-related communities are you aware of in Portland?
          </Heading>
          <p>
            Many respondents mentioned smaller private or invite-only games
            communities. Here are the public communities mentioned.
          </p>
          <p>
            Several of these communities no longer appear to be operational.
          </p>
          <Columns
            columns={2}
            items={unique([
              "PIGSquad",
              "PAGDIG",
              "AltCade",
              "UnrealPDX",
              "Playtest PDX",
              "Imladris",
              "XOXO",
              "SideQuest Expo",
              "The Paladin's League",
              "Rainy Day Games",
              "Geek Week PDX",
              "UnityPDX",
              "Stumptown Gamecrafters' Guild",
              "Playtest PDX",
              "Break My Game",
            ])}
          />
        </Section>
        <Section>
          <Heading as="h2" withBackToTop>
            Plugs
          </Heading>
          <br />
          <Heading as="h4">Anything you'd like to plug on the way out?</Heading>
          <p>
            Here are the links everyone shared during the survey. If you'd like
            to remove your links or add new ones,{" "}
            <a href="mailto:pdxmakesgames@gmail.com">please reach out</a>!
          </p>
          <List
            items={[
              <a
                href="https://www.cassandrascursestudio.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cassandra's Curse Studio
              </a>,
              <a
                href="https://www.alexanderschiff.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alex Schiff's site
              </a>,
              <a
                href="https://vagraham.com/diatribes-vr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Diatribes, a VR game
              </a>,
              <a
                href="https://psydshobob.itch.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                psydshobob's Itch page
              </a>,
              <a
                href="https://www.siliconsasquatch.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Silicon Sasquatch, games journalism site
              </a>,
              <a
                href="https://thisgameishaunted.itch.io/trash-the-planet"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trash the Planet, Itch game
              </a>,
              <a
                href="https://www.instagram.com/jra_game_design"
                target="_blank"
                rel="noopener noreferrer"
              >
                jra_game_design's Instagram
              </a>,
              <a
                href="https://www.firstbitegames.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                First Bite Games
              </a>,
              <a
                href="https://stumpt.tv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stumpt Gamers
              </a>,
              <a
                href="https://store.steampowered.com/app/910630/Arcade_Spirits/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arcade Spirits, Steam page
              </a>,
              <a
                href="https://hanchers.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Steven Hancher's site
              </a>,
              <a
                href="https://jerrytron.com/projects"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jerry Belich's site
              </a>,
              <a
                href="https://store.steampowered.com/app/1172920/Super_Dungeon_Designer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Super Dungeon Designer, Steam page
              </a>,
              <a
                href="https://redslash12.itch.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redslash12's Itch page
              </a>,
              <a
                href="https://store.steampowered.com/app/2158690/Star_Rift_Saga/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Star Rift Saga, Steam page
              </a>,
              <a
                href="https://girlfriend.games/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Paula the Possum, a 3D platformer
              </a>,
              <a
                href="https://www.noctuainteractive.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Noctua Interactive
              </a>,
              <a
                href="https://www.spencerboomhower.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spencer Boomhower's site
              </a>,
            ]}
          />
        </Section>
      </div>
    </div>
  );
};
