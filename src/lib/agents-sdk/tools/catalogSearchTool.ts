import { tool } from "@openai/agents";
import { z } from "zod";
import catalog from "@/data/catalog.json";
import { CatalogItem, PreferenceQuery } from "@/types/agent";

/**
 * Deterministic catalog search with no AI reasoning.
 * Filters the catalog based on parsed user preferences.
 */
function searchCatalog(query: PreferenceQuery): CatalogItem[] {
  let results = catalog as CatalogItem[];

  // Filter by type (movie / show / any)
  if (query.typePreference !== "any") {
    results = results.filter((item) => item.type === query.typePreference);
  }

  // Filter by included genres (must have at least one)
  if (query.genresInclude.length > 0) {
    results = results.filter((item) =>
      query.genresInclude.some((genre: string) => item.genres.includes(genre))
    );
  }

  // Filter by runtime limit
  if (query.timeLimitMinutes !== null) {
    results = results.filter((item) => {
      if (item.type === "movie") {
        return (
          item.runtimeMinutes !== undefined &&
          item.runtimeMinutes <= query.timeLimitMinutes!
        );
      } else {
        // For shows, check episode runtime
        return (
          item.episodeRuntimeMinutes !== undefined &&
          item.episodeRuntimeMinutes <= query.timeLimitMinutes!
        );
      }
    });
  }

  return results;
}

export const catalogSearchTool = tool({
  name: "search_catalog",
  description:
    "Search the movie and TV show catalog based on user preferences. Returns a filtered list of items matching the criteria.",
  parameters: z.object({
    typePreference: z
      .enum(["movie", "show", "any"])
      .describe("Type of content to search for"),
    genresInclude: z
      .array(z.string())
      .describe("Genres that must be present (at least one)"),
    timeLimitMinutes: z
      .number()
      .nullable()
      .describe(
        "Maximum runtime in minutes for movies or episode runtime for shows"
      ),
  }),
  execute: async (query) => {
    const results = searchCatalog(query);
    return results;
  },
});
