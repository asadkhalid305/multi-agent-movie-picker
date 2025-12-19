export type Intent = "greeting" | "recommendation" | "out_of_scope";

export interface PreferenceQuery {
  typePreference: "movie" | "show" | "any";
  timeLimitMinutes: number | null;
  moods: string[];
  genresInclude: string[];
  genresExclude: string[];
  groupMode: "solo" | "group";
  ageRatingPreference: "kids" | "family" | "teen" | "adult" | "any";
}

export interface CatalogItem {
  name: string;
  type: "movie" | "show";
  runtimeMinutes?: number;
  episodeRuntimeMinutes?: number;
  genres: string[];
  year: number;
  seasons?: number;
  ageRating: string;
}

export interface RankedRecommendation {
  name: string;
  type: "movie" | "show";
  durationMinutes?: number;
  episodeDurationMinutes?: number;
  genres: string[];
  year: number;
  ageRating: string;
  rank: number;
  score: number;
  explanation: string;
  timeFit: string;
}

export interface RankerOutput {
  recommendations: RankedRecommendation[];
}
