import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { SECTIONS, CATEGORIES } from "@/lib/activity";

const proposalCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    order: z.number(),
  }),
});

const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => (value === "" || value === null ? undefined : value), schema.optional());

const videoId = (value: string) =>
  value.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)?.[1] ?? value.trim();

const activityCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/activities" }),
  schema: z.object({
    date: z.coerce.date(),
    section: z.enum(Object.keys(SECTIONS) as [keyof typeof SECTIONS]),
    category: z.enum(Object.keys(CATEGORIES) as [keyof typeof CATEGORIES]),
    title: z.string(),
    summary: z.string(),
    location: optional(z.string()),
    video: z.preprocess(
      (value) => ((value as { id?: string } | undefined)?.id ? value : undefined),
      z
        .object({
          provider: z.enum(["youtube", "cloudflare"]).default("youtube"),
          id: z.string(),
          format: z.enum(["vertical", "horizontal"]).default("vertical"),
        })
        .transform((video) =>
          video.provider === "youtube" ? { ...video, id: videoId(video.id) } : video
        )
        .optional()
    ),
    photos: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          credit: optional(z.string()),
        })
      )
      .nullish()
      .transform((photos) => photos ?? []),
    source: optional(z.string().url()),
    social: z
      .object({
        instagram: optional(z.string().url()),
        facebook: optional(z.string().url()),
      })
      .optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  proposals: proposalCollection,
  activities: activityCollection,
};
