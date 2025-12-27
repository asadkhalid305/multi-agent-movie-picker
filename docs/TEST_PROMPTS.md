# Test Prompts for Multi-Agent Movie Picker

This document contains a list of test prompts designed to verify the robustness of the multi-agent system, specifically targeting edge cases, complex logic, and recent fixes.

## 1. Genre Mapping & TV Show Specifics
*These tests verify that the system correctly maps common terms to TMDB's specific TV genres (e.g., "Thriller" -> "Mystery").*

- **"I want a thriller TV show."**
    - *Expected:* Finds shows tagged with "Mystery" or "Crime" (e.g., *Sherlock*, *Black Mirror*). Should not fail with "No results".
- **"Show me some sci-fi series."**
    - *Expected:* Maps "Sci-Fi" to "Sci-Fi & Fantasy" and returns relevant shows.
- **"I need an action show for my flight."**
    - *Expected:* Maps "Action" to "Action & Adventure".
- **"Do you have any war shows?"**
    - *Expected:* Maps "War" to "War & Politics".

## 2. Runtime & Fallback Logic
*These tests verify the runtime filtering and the fix for "0 minute" episodes.*

- **"Give me a thriller show with episodes under 60 minutes."**
    - *Expected:* Returns shows where `episode_run_time` or `last_episode_to_air.runtime` is < 60. Should not show "0 min" in the UI.
- **"I have 30 minutes. What can I watch?"**
    - *Expected:* Returns short items (Movies or TV episodes under 30m).
- **"Find me a long movie, at least 3 hours."**
    - *Expected:* (Note: The current tool only supports `.lte` (less than). This prompt tests if the agent handles the "at least" constraint gracefully or ignores it. *Constraint: Tool only does max limit.*)

## 3. Complex "OR" Logic
*These tests verify the Parser Agent's ability to split complex requests into multiple tool calls and merge results.*

- **"I want an action movie or a comedy show."**
    - *Expected:*
        - Call 1: Type=Movie, Genre=Action
        - Call 2: Type=Show, Genre=Comedy
        - Result: A mix of both in the final list.
- **"Horror movies or sci-fi series please."**
    - *Expected:* Mix of Horror movies and Sci-Fi & Fantasy shows.
- **"Something funny or scary."**
    - *Expected:* Type=Any, Genres=[Comedy, Horror]. Returns a mix.

## 4. Pagination & Volume
*These tests verify the pagination UI and the removal of the 6-item limit.*

- **"Recommend me popular action movies."**
    - *Expected:* Should return 20 items. UI should show 6 initially with a "Load More" button.
- **"List all the comedy shows you can find."**
    - *Expected:* Should fill the list up to the fetch limit (20) without arbitrary capping.

## 5. Agent Handoffs & Safety
*These tests verify the guardrails and agent routing.*

- **"Hi, how are you?"**
    - *Expected:* Handled by `GreetingAgent`. No recommendations, just a chat.
- **"Help me cook pasta."**
    - *Expected:* Handled by `OutOfScopeAgent`. Polite refusal.
- **"I want a movie with [inappropriate term]."**
    - *Expected:* Blocked by `InputGuardrail`. API returns 400.

## 6. Edge Cases
- **"I want a western."** (Ambiguous type)
    - *Expected:* Returns both Western Movies and Western TV shows.
- **"Surprise me."**
    - *Expected:* Should default to "Any" type and likely no specific genre (or random popular ones depending on tool default).