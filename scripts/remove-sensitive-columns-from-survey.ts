import * as csvSync from "csv/sync";
import fs from "fs/promises";
import path from "path";
import { Csv } from "../src/csv/Csv";

/**
 * Example usage:
 * npm run script:remove-sensitive-data "PDX Games Census_Submissions_2025-08-02.csv"
 */

/**
 * TODO:
 * There are two parsing issues with the script that I just resolved manually
 * instead of bothering to fix here.
 *
 * 1. The first "Submission ID" column got some weird extraneous """" and a
 *    broken char character on it
 * 2. An empty row is appended to the end of the file, causing a broken
 *    row to be parsed in the CSV logic
 */

const sensitiveDataPrefix = "src/data/sensitive/";
const outputDataPrefix = "src/data/";

async function run() {
  const [, , fileName] = process.argv;

  if (!fileName) {
    throw new Error(
      "You must provide a file name of a CSV file in the src/data/sensitive folder."
    );
  }

  const filePath = path.join(sensitiveDataPrefix, fileName);
  const rawFile = await fs.readFile(filePath, "utf-8");
  const data = csvSync.parse(rawFile, { relax_quotes: true });
  const csv = new Csv(data);

  csv.deleteColumn(
    "What games-related communities are you aware of in Portland?"
  );
  csv.deleteColumn("Anything else?");
  csv.deleteColumn("Do you want updates? Share your email!");
  csv.deleteColumn(
    "Would you like an email when the survey results are published?"
  );
  csv.deleteColumn(
    "Would you like emails about games-related events in Portland?"
  );
  csv.deleteColumn("Anything you'd like to plug on the way out?");

  const output = csvSync.stringify([csv.header, ...csv.rows], {
    quoted: true,
    quoted_empty: true,
  });

  const outputPath = path.join(outputDataPrefix, fileName);
  await fs.writeFile(outputPath, output);
  console.log(`Wrote sanitized data to: ${outputPath}`);
}

run();
