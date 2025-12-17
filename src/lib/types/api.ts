// API Request/Response Types

export interface RecommendRequest {
  message: string;
}

export interface RecommendItem {
  name: string;
  type: "movie" | "show";
  durationMinutes?: number; // for movies (runtimeMinutes)
  episodeDurationMinutes?: number; // for shows
  why: string;
}

export interface RecommendResponse {
  title: string;
  echo: string;
  items: RecommendItem[];
}
