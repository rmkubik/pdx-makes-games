import { remove } from "../arrays/remove";

export type CsvColumnTransformer = (item: string, index: number) => string;
export type CsvColumnFilter = (item: string) => boolean;

class CsvColumn {
  constructor(private items: string[]) {
    if (!items) throw new Error("Items is not defined in CsvColumn");
  }

  get itemCount() {
    return this.items.length;
  }

  get answerCount() {
    return this.items.filter((item) => item !== "").length;
  }

  getItem(index: number) {
    return this.items[index];
  }

  transform(transformer: CsvColumnTransformer) {
    this.items = this.items.map(transformer);
    return this;
  }

  filter(filter: CsvColumnFilter) {
    this.items = this.items.filter(filter);
    return this;
  }

  asArray() {
    return this.items;
  }

  asSingleChoiceRecord() {
    return this.items.reduce<Record<string, number>>((record, label) => {
      if (record[label] === undefined) {
        record[label] = 0;
      }
      record[label] += 1;

      return record;
    }, {});
  }

  asMultipleChoiceRecord() {
    return this.items.reduce<Record<string, number>>(
      (labelCountRecord, col) => {
        const labels = col.split(",").map((label) => label.trim());

        labels.forEach((label) => {
          if (labelCountRecord[label] === undefined) {
            labelCountRecord[label] = 0;
          }
          labelCountRecord[label] += 1;
        });

        return labelCountRecord;
      },
      {}
    );
  }
}

export class Csv {
  public header: string[] = [];
  public rows: string[][] = [];
  private colTitleHash: Record<string, string[]> = {};

  get rowCount() {
    return this.rows.length;
  }

  constructor(data: string[][]) {
    const [header, ...rows] = data;
    this.header = header;
    this.rows = rows;

    this.reBuildColTitleHash();
  }

  private reBuildColTitleHash() {
    // Clear out old hash
    this.colTitleHash = {};

    this.header.forEach((header, index) => {
      this.colTitleHash[header] = this.rows.map((row) => row[index]);
    });
  }

  getColumnByTitle(title: string): CsvColumn {
    return new CsvColumn(this.colTitleHash[title.trim()]);
  }

  deleteColumn(title: string) {
    const targetColumnIndex = this.header.findIndex(
      (header) => header === title
    );

    // Do nothing if title isn't found
    if (targetColumnIndex === -1) return;

    this.header = remove(this.header, targetColumnIndex);
    this.rows = this.rows.map((row) => remove(row, targetColumnIndex));

    this.reBuildColTitleHash();
  }
}
