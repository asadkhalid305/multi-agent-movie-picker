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

  // Filter by included genres (must have at least one)
  if (query.genresInclude.length > 0) {
    results = results.filter((item) =>
      query.genresInclude.some((genre: string) => item.genres.includes(genre))
    );
  }

  // Filter by excluded genres (must not have any)
  if (query.genresExclude.length > 0) {
    results = results.filter(
      (item) =>
        !query.genresExclude.some((genre: string) =>
          item.genres.includes(genre)
        )
    );
  }

  // Filter by age rating preference
  if (query.ageRatingPreference !== "any") {
    results = results.filter((item) => {
      const rating = item.ageRating;

      switch (query.ageRatingPreference) {
        case "kids":
          // Only content safe for young children
          return ["G", "TV-Y", "TV-Y7"].includes(rating);

        case "family":
          // Family-friendly content (no mature content)
          return ["G", "PG", "TV-Y", "TV-Y7", "TV-PG"].includes(rating);

        case "teen":
          // Teen and below (no mature adult content)
          return !["R", "TV-MA"].includes(rating);

        case "adult":
          // Only mature/adult content
          return ["R", "TV-MA"].includes(rating);

        default:
          return true;
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
    timeLimitMinutes: z
      .number()
      .nullable()
      .describe(
        "Maximum runtime in minutes for movies or episode runtime for shows"
      ),
    moods: z
      .array(z.string())
      .describe("Array of mood keywords (not used for filtering in MVP)"),
    genresInclude: z
      .array(z.string())
      .describe("Genres that must be present (at least one)"),
    genresExclude: z
      .array(z.string())
      .describe("Genres that must not be present"),
    groupMode: z
      .enum(["solo", "group"])
      .describe(
        "Whether watching solo or in a group (affects explanations only)"
      ),
    ageRatingPreference: z
      .enum(["kids", "family", "teen", "adult", "any"])
      .describe(
        "Age rating preference: 'kids' (G/TV-Y/TV-Y7), 'family' (G/PG/TV-PG), 'teen' (PG-13/TV-14 and below), 'adult' (R/TV-MA), or 'any' for no restriction"
      ),
  }),
  execute: async (query) => {
    const results = searchCatalog(query);
    return results;
  },
});
