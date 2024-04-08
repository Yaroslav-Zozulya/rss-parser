import { z } from "zod";

const urlRegex = /^https:\/\/\S+$/;

export const updateArticleSchema = z.object({
  title: z
    .string()
    .min(6, { message: "title must be at least 6 characters long" }),
  contentSnippet: z
    .string()
    .min(6, { message: "contentSnippet must be at least 6 characters long" }),
  link: z
    .string()
    .regex(urlRegex, {
      message: "link must be URL as like https://example.com",
    })
    .url({ message: "link must be URL as like https://expamle.com" }),
  categories: z
    .string()
    .min(1, { message: "categories must be at least 1 characters long" }),
});
