import { getCollection, type CollectionEntry } from "astro:content";
import { yearOf, monthOf, slugOf, monthUrl, type Section } from "./activity";

export type Entry = CollectionEntry<"activities"> & { url: string };

export async function entriesOf(section: Section): Promise<Entry[]> {
  const entries = await getCollection(
    "activities",
    ({ data }) => data.section === section && !data.draft
  );
  const withUrl = entries
    .sort(
      (a, b) =>
        a.data.date.valueOf() - b.data.date.valueOf() ||
        a.id.localeCompare(b.id)
    )
    .map((entry) => ({
      ...entry,
      url:
        monthUrl(section, yearOf(entry.data.date), monthOf(entry.data.date)) +
        `${slugOf(entry.id)}/`,
    }));

  const seen = new Set<string>();
  for (const { url, id } of withUrl) {
    if (seen.has(url)) {
      throw new Error(`Dos entradas de la bitácora generan la misma URL ${url} (${id}). Cambiá el nombre de una.`);
    }
    seen.add(url);
  }
  return withUrl;
}

export type Month = { year: number; month: string; entries: Entry[] };

export function groupByMonth(entries: Entry[]): Month[] {
  const months: Month[] = [];
  for (const entry of entries) {
    const year = yearOf(entry.data.date);
    const month = monthOf(entry.data.date);
    const last = months.at(-1);
    if (last && last.year === year && last.month === month) {
      last.entries.push(entry);
    } else {
      months.push({ year, month, entries: [entry] });
    }
  }
  return months;
}
