import { tool } from "@openai/agents";
import { z } from "zod";
import { searchTMDBCatalog } from "@/services/tmdb";

/**
 * Catalog Search Tool - Search for movies and shows based on user preferences
 *
 * This tool extends the parser agent's capabilities by providing deterministic
 * search functionality.
 */
export const catalogSearchTool = tool({
  name: "search_catalog",
  description:
    "Search the movie and TV show catalog based on user preferences. Returns a filtered list of items matching the criteria.",

  // The Zod schema defines the structured input the agent must provide when calling this tool.
  parameters: z.object({
    typePreference: z
      .enum(["movie", "show", "any"])
      .describe("The type of content the user is looking for (movie, show, or any)."),
    genresInclude: z
      .array(z.string())
      .describe("List of genre names to include (e.g., ['Action', 'Comedy'])."),
    timeLimitMinutes: z
      .number()
      .nullable()
      .optional()
      .describe("Maximum runtime or episode duration in minutes."),
    year: z.number().nullable().optional().describe("A specific release year."),
    minYear: z.number().nullable().optional().describe("Minimum release year."),
    maxYear: z.number().nullable().optional().describe("Maximum release year."),
    minRating: z.number().nullable().optional().describe("Minimum user rating (0-10)."),
    language: z
      .string()
      .nullable()
      .optional()
      .describe("ISO-639-1 language code (e.g., 'en', 'fr')."),
    actors: z.array(z.string()).nullable().optional().describe("List of actors to include."),
    directors: z
      .array(z.string())
      .nullable()
      .optional()
      .describe("List of directors to include."),
    sortBy: z
      .enum(["popularity", "newest", "top_rated"])
      .nullable()
      .optional()
      .describe("How to sort the results."),
  }),

  // Execute: The actual tool implementation
  execute: async (query) => {
    // TODO: Call searchTMDBCatalog(query) and return results
    return [];
  },
});