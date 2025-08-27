import React, { useMemo } from "react";
import surveyResults from "../data/PDX Games Census_Submissions_2025-08-02.csv";
import { Section } from "src/components/Section";
import { Csv } from "src/csv/Csv";
import { ReactChart } from "src/components/ReactChart";
import { useHeadings } from "src/components/useHeadings";
import slugify from "slugify";
import { Heading } from "src/components/Heading";
import { unique } from "src/arrays/unique";
import { Columns } from "src/components/Columns";
import { ShortAnswer } from "src/components/ShortAnswer";
import { colors } from "src/theme/palette";

console.log({ surveyResults });

const csv = new Csv(surveyResults);

const Chart = ({
  title,
  columnType,
  sortType,
  data,
}: {
  title: string;
  columnType: "single" | "multi";
  sortType:
    | { type: "alpha" }
    | { type: "count" }
    | { type: "manual"; order: string[] };
  data?: { answers: Record<string, number>; answerCount: number };
}) => {
  const [chartData, answerCount] = useMemo(() => {
    if (data) {
      return [data.answers, data.answerCount];
    }

    const column = csv.getColumnByTitle(title);

    switch (columnType) {
      case "single":
        return [column.asSingleChoiceRecord(), column.answerCount];
      case "multi":
        return [column.asMultipleChoiceRecord(), column.answerCount];
      default:
        throw new Error("Unimplemented chart type");
    }
  }, [csv, columnType]);

  const sort = useMemo(() => {
    switch (sortType.type) {
      case "alpha":
        return ([keyA]: [string, number], [keyB]: [string, number]) =>
          keyA.localeCompare(keyB);
      case "count":
        return ([, valueA]: [string, number], [, valueB]: [string, number]) =>
          valueB - valueA;
      case "manual":
        return ([keyA]: [string, number], [keyB]: [string, number]) => {
          const priorityA = sortType.order.indexOf(keyA);
          const priorityB = sortType.order.indexOf(keyB);
          return priorityA - priorityB;
        };
      default:
        return undefined;
    }
  }, [sortType]);

  return (
    <>
      {/* <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Heading as="h4" style={{ flex: 1 }}>
          {title}
        </Heading>
        <span
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 4,
            paddingRight: 4,
            borderColor: colors.offBlack,
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "aliceblue",
            marginRight: -5,
          }}
        >
          {answerCount} responses
        </span>
      </div> */}
      <div
      // style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Heading as="h4" style={{ flex: 1 }}>
          {title}
        </Heading>
        <span
        // style={
        //   {
        //     paddingTop: 0,
        //     paddingBottom: 0,
        //     paddingLeft: 4,
        //     paddingRight: 4,
        //     borderColor: colors.offBlack,
        //     borderWidth: 1,
        //     borderStyle: "solid",
        //     backgroundColor: "aliceblue",
        //     marginRight: -5,
        //   }
        // }
        >
          {answerCount} responses
        </span>
      </div>
      <ReactChart data={chartData} answerCount={answerCount} sort={sort} />
    </>
  );
};

const getPaddingForElement = (element: HTMLElement) => {
  const rhythm = 12;

  switch (element.tagName) {
    case "H1":
      return 0;
    case "H2":
      return rhythm * 0;
    case "H3":
      return rhythm * 1;
    case "H4":
      return rhythm * 2;
    case "H5":
      return rhythm * 3;
    case "H6":
      return rhythm * 4;
    default:
      return 0;
  }
};

export const Census = () => {
  const headings = useHeadings();
  const activities = useMemo(() => {
    return csv
      .getColumnByTitle("Which activities do you do related to making games?")
      .asMultipleChoiceRecord();
  }, [csv]);

  const supportSelf = useMemo(() => {
    return csv
      .getColumnByTitle("Do you support yourself with games-related work?")
      .asSingleChoiceRecord();
  }, [csv]);
  const outsideOfWork = useMemo(() => {
    return csv
      .getColumnByTitle("Do you make games outside of work?")
      .asSingleChoiceRecord();
  }, [csv]);
  const contractWork = useMemo(() => {
    return csv
      .getColumnByTitle("Do you do contract games-related work?")
      .asSingleChoiceRecord();
  }, [csv]);

  return (
    <>
      <aside
        style={{
          position: "fixed",
          transform: "translateX(calc(-100% - 24px))",
          maxWidth: "300px",
          minWidth: "200px",
        }}
      >
        <Section>
          <Heading as="h2">Outline</Heading>
          <ul style={{ padding: 0 }}>
            {headings
              ?.filter((heading) => {
                switch (heading.tagName) {
                  case "H2":
                  case "H3":
                    return true;
                  case "H1":
                  default:
                    return false;
                }
              })
              .filter((heading) => heading.textContent !== "Outline")
              .map((heading) => (
                <li
                  style={{
                    listStyle: "none",
                    paddingLeft: getPaddingForElement(heading),
                  }}
                >
                  <a href={`#${slugify(heading.textContent).toLowerCase()}`}>
                    {heading.textContent}
                  </a>
                </li>
              ))}
          </ul>
        </Section>
      </aside>
      <Section>
        <Heading as="h2">Introduction</Heading>
        <p>Hey! Here's data about people in town.</p>
        <p>Number of submissions: {csv.rowCount}</p>
        <Heading as="h3">Take the survey</Heading>
        <p>
          We'd love more submissions and will update as they come in. Take the
          survey now if you haven't already!
        </p>
      </Section>
      <Section>
        <Heading as="h2">Making games</Heading>
      </Section>
      <Section>
        <Heading as="h3">Activities</Heading>
        <Chart
          title="Which activities do you do related to making games?"
          columnType="multi"
          sortType={{ type: "count" }}
        />
        <Chart
          title="How many different activities per person?"
          columnType="single"
          sortType={{ type: "alpha" }}
          data={{
            answers: csv
              .getColumnByTitle(
                "Which activities do you do related to making games?"
              )
              .transform((item: string) => {
                const activities = item.split(",");
                return activities.length.toString();
              })
              .asSingleChoiceRecord(),
            answerCount: csv.rowCount,
          }}
        />
        <Chart
          title="What activities are done by people doing only one?"
          columnType="single"
          sortType={{ type: "alpha" }}
          data={{
            answers: csv
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
              })
              .asSingleChoiceRecord(),
            answerCount: csv.rowCount,
          }}
        />
      </Section>
      <Section>
        <Heading as="h3">Support</Heading>
        <Chart
          title="Do you support yourself with games-related work?"
          columnType="single"
          sortType={{ type: "manual", order: ["Fully", "Partially", "No"] }}
        />
        {/* <Chart
          title="What activities are done by people fully supporting themselves making games?"
          columnType="multi"
          sortType={{ type: "count" }}
          data={{
            answers: csv
              .getColumnByTitle(
                "Which activities do you do related to making games?"
              )
              .transform((item: string, index: number) => {
                if (
                  csv
                    .getColumnByTitle(
                      "Do you support yourself with games-related work?"
                    )
                    .getItem(index) === "Fully"
                )
                  return item;

                return "";
              })
              .filter((item: string) => {
                return item !== "";
              })
              .asMultipleChoiceRecord(),
            answerCount: csv.rowCount,
          }}
        /> */}
        {/* <Chart
          title="What activities are done by people partially supporting themselves making games?"
          columnType="multi"
          sortType={{ type: "count" }}
          data={{
            answers: csv
              .getColumnByTitle(
                "Which activities do you do related to making games?"
              )
              .transform((item: string, index: number) => {
                if (
                  csv
                    .getColumnByTitle(
                      "Do you support yourself with games-related work?"
                    )
                    .getItem(index) === "Partially"
                )
                  return item;

                return "";
              })
              .filter((item: string) => {
                return item !== "";
              })
              .asMultipleChoiceRecord(),
            answerCount: csv.rowCount,
          }}
        /> */}
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
          data={{
            answers: csv
              .getColumnByTitle(
                "Do you support yourself with games-related work?"
              )
              .transform((item: string, index: number) => {
                if (
                  csv
                    .getColumnByTitle("Do you do contract games-related work?")
                    .getItem(index) === "Yes"
                )
                  return item;

                return "";
              })
              .filter((item: string) => {
                return item !== "";
              })
              .asMultipleChoiceRecord(),
            answerCount: csv.rowCount,
          }}
        />
      </Section>
      <Section>
        <Heading as="h3">Publishing</Heading>
        <Chart
          title="Do you self publish games?"
          columnType="single"
          sortType={{ type: "manual", order: ["Yes", "No"] }}
        />
        <Chart
          title="Do people self publishing support themselves with games?"
          columnType="multi"
          sortType={{ type: "count" }}
          data={{
            answers: csv
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
              })
              .asMultipleChoiceRecord(),
            answerCount: csv.rowCount,
          }}
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
          data={{
            answers: csv
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
              })
              .asMultipleChoiceRecord(),
            answerCount: csv.rowCount,
          }}
        />
        <Chart
          title="How many of your coworkers or collaborators are located in Portland?"
          columnType="single"
          sortType={{ type: "manual", order: ["All", "Some", "None"] }}
        />
      </Section>
      <Section>
        <Heading as="h3">Mediums</Heading>
        <Chart
          title="What mediums do you make games in?"
          columnType="multi"
          sortType={{ type: "count" }}
        />
        <Chart
          title="What mediums to people who have worked with a publisher work in?"
          columnType="multi"
          sortType={{ type: "count" }}
          data={{
            answers: csv
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
              })
              .asMultipleChoiceRecord(),
            answerCount: csv.rowCount,
          }}
        />
        <Heading as="h4">What kinds of games do you work on?</Heading>
        <p>
          People interpreted this question differently. Here are some genres and
          styles people mentioned:
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
        <p>
          Here are the full answers people provided. Some of them have
          interesting color and cool career stories.
        </p>
        <ShortAnswer
          pageSize={10}
          items={csv
            .getColumnByTitle("What kinds of games do you work on?")
            .asArray()
            .filter((value) => value !== "")}
        />
      </Section>
      <Section>
        <Heading as="h2">Events</Heading>
      </Section>
      <Section>
        <Heading as="h3">Preferences</Heading>
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
        <Heading as="h3">Topics</Heading>
        <Chart
          title="What parts of game events are you interested in?"
          columnType="multi"
          sortType={{ type: "count" }}
        />
        <Heading as="h4">
          What games-related topics are you interested in?
        </Heading>
        <ShortAnswer
          pageSize={10}
          items={csv
            .getColumnByTitle(
              "What games-related topics are you interested in?"
            )
            .asArray()
            .filter((value) => value !== "")}
        />
        <Heading as="h4">
          What kind of games-related events would you like to see in Portland?
        </Heading>
        <ShortAnswer
          pageSize={10}
          items={csv
            .getColumnByTitle(
              "What kind of games-related events would you like to see in Portland?"
            )
            .asArray()
            .filter((value) => value !== "")}
        />
      </Section>
      <Section>
        <Heading as="h3">Other events</Heading>
        <Heading as="h4">What games-related events have you attended?</Heading>
        <p>
          TODO: Validate these are all public events and remove anything private
          that I cannot identify.
        </p>
        <Columns
          items={unique([
            "GDC",
            "PAX",
            "XOXO",
            "PIGSquad",
            "Portland Retro Gaming Expo",
            "PAX West",
            "PAX East",
            "E3",
            "GSC",
            "BitBash",
            "Alt Cade",
            "Playtest PDX",
            "OrcaCon",
            "Gamestorm",
            "GenCon",
            "Kublacon",
            "PAX South",
            "Comic cons",
            "Fan Expo",
            "Wholesome Snack",
            "Wholesome Direct",
            "Ludonarrecon",
            "Playstation EXPO",
            "Pokemon Regionals",
            "Pokemon Worlds",
            "Twitchcon",
            "WhiteThorn Online Event",
            "Seattle Indies Expo",
            "C2E2",
            "Gayming Awards",
            "A Maze",
            "Indie Game Trash Night",
            "IndieCade",
            "Experimental Gameplay Workshop",
            "Alt Ctrl",
            "Fantastic Arcade",
            "Future of Storytelling",
            "Children's Media Conference",
            "digiPlaySpace",
            "Indie Arcade @ The Smithsonian",
            "ZKM",
            "Train Jam",
            "Game Connection",
            "WordPlay",
            "Pixelatl",
            "Playcrafting NYC",
            "Serious Play",
            "Casual Connect",
            "Imladris",
            "Pixelpop Festival",
            "Global Game Jam",
            "GameStorm",
            "Work With Indies Online Chats",
            "Seattle Indies",
            "SavePoint GCD Meetup",
            "Games Industry Gathering",
            "OGPC",
            "Kublacon",
            "Gamestorm",
            "Gencon",
            "PAGDIG",
            "OMSI",
            "PAX Unplugged",
            "Unpub",
          ])}
        />
      </Section>
      <Section>
        <Heading as="h2">Communities</Heading>
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
          communities. Here are the public communities mentioned:
        </p>
        <p>TODO: Verify these are all public communities</p>
        <Columns
          items={unique([
            "PIGSquad",
            "PAGDIG (defunct)",
            "AltCade",
            "Unreal PDX",
            "Stumptown Gamecrafters",
            "Pokemon",
            "Playtest PDX",
            "Imladris",
            "Stumptown Game Collective",
            "XOXO (defunct)",
            "Sasha Jelton's Tabletop Meetup",
            "Retro Game Swap Meets",
            "TTRPG Painting & Paladin's League",
            "Geek Week PDX",
            "UnityPDX",
            "Stumptown",
            "Playtest PDX",
            "Fresh games at Rainy Day Games",
            "Break My Game",
          ])}
        />
        <ul>
          {/* {csv
            .getColumnByTitle(
              "What games-related communities are you aware of in Portland?"
            )
            .asArray()
            .filter((value) => value !== "")
            .map((value) => (
              <li>{value}</li>
            ))} */}
        </ul>
      </Section>
      <Section>
        <Heading as="h2">Plugs</Heading>
        <Heading as="h4">Anything you'd like to plug on the way out?</Heading>
        <ul>
          {/* {csv
            .getColumnByTitle("Anything you'd like to plug on the way out?")
            .asArray()
            .filter((value) => value !== "")
            .map((value) => (
              <li>{value}</li>
            ))} */}
        </ul>
      </Section>
      {/* <Section>
        <table>
          <tr>
            {csv.header.map((col: string) => (
              <th>{col}</th>
            ))}
          </tr>
          {csv.rows.map((row: string[]) => (
            <tr>
              {row.map((col) => (
                <td>{col}</td>
              ))}
            </tr>
          ))}
        </table>
      </Section> */}
      {/* <Section>
        <pre>{JSON.stringify(surveyResults, undefined, 2)}</pre>
      </Section> */}
    </>
  );
};
