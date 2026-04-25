import { fs, YAML } from "zx";
import z from "zod";
import {
  differenceInMilliseconds,
  format,
  isSameDay,
  isSameMonth,
  isSameYear,
} from "date-fns";

async function run() {
  const { events } = await getEventsFromFile();
  const discordString = convertEventsToDiscordString(events);

  /**
   * TODO:
   * Filter out previously added events for posting
   */
  console.log(discordString);
}

function formatDateWithAllDay(date: Date) {
  if (isSameYear(date, Date.now())) {
    return format(date, "MMM do");
  }

  return format(date, "MMM do, yyyy");
}

function formatDateWithTime(date: Date) {
  if (isSameYear(date, Date.now())) {
    return format(date, "MMM do h:mm aa");
  }

  return format(date, "MMM do, yyyy h:mm aa");
}

function formatCustomDate({ isAllDay, date }: CustomDateTime): string {
  if (isAllDay) {
    return formatDateWithAllDay(date);
  } else {
    return formatDateWithTime(date);
  }
}

function convertEventsToDiscordString(events: Event[]) {
  function formatEventName(event: Event) {
    let name = "";
    if (event.link) {
      name = `[${event.name}](${event.link})`;
    } else {
      name = event.name;
    }
    if (event.rsvp) {
      name += ` ([RSVP](${event.rsvp}))`;
    }
    // bold name:
    name = `**${name}**`;
    return name;
  }

  function formatStartAndEnd(event: Event) {
    const { start, end } = event;

    if (isSameDay(start.date, end.date)) {
      // TODO:
      // only add format time diff if is not an all day event
      return `_${formatCustomDate(start)} - ${format(end.date, "h:mm aa")}_`;
    }

    // TODO: Collapse same months
    // if (isSameMonth(start.date, end.date)) {
    //   return `_${formatCustomDate(start)} - ${format(end.date, "h:mm aa")}_`;
    // }

    return `_${formatCustomDate(event.start)} - ${formatCustomDate(event.end)}_`;
  }

  return events
    .map(
      (event) =>
        `- ${formatEventName(event)} – ${formatStartAndEnd(event)} - ${event.location}`,
    )
    .join("\n");
}

/**
 * Using this type def instead of z.infer because
 * we want to use this type for the formatCustomDate
 * function and need to avoid the circular type
 * reference.
 */
type CustomDateTime = {
  date: Date;
  isAllDay: boolean;
};
const CustomDateTimeCodec = z.codec(
  // input schema
  z.string(),
  // output schema
  z.object({
    date: z.date(),
    isAllDay: z.boolean(),
  }),
  {
    decode: (string) => {
      const parts = string.split(" ");
      // Assume if a date has 3 parts it is specifying a time
      const hasTimeComponent = parts.length == 3;

      return {
        date: new Date(string),
        isAllDay: !hasTimeComponent,
      };
    },
    encode: (date) => formatCustomDate(date),
  },
);

type Event = z.infer<typeof EventSchema>;
const EventSchema = z.object({
  name: z.string(),
  start: CustomDateTimeCodec,
  end: CustomDateTimeCodec,
  link: z.url().optional(),
  rsvp: z.url().optional(),
  location: z
    .union([
      z.string(),
      z.object({
        name: z.string(),
        link: z.url(),
        address: z.string(),
      }),
    ])
    .optional(),
  desc: z
    .union([
      z.string(),
      z.object({
        short: z.string(),
        long: z.string(),
      }),
    ])
    .optional(),
  added: CustomDateTimeCodec,
  // TODO: Maybe make this required later on
  updated: CustomDateTimeCodec.optional(),
});

const EventFileSchema = z.object({ events: z.array(EventSchema) });

async function getEventsFromFile() {
  const eventsRaw = await fs.readFile("./src/data/events.yaml", "utf8");
  const eventsYaml = await YAML.parse(eventsRaw);
  const events = EventFileSchema.parse(eventsYaml);

  events.events.sort((a, b) => {
    return differenceInMilliseconds(a.start.date, b.start.date);
  });

  return events;
}

run();
