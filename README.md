# Movie & Show Picker - Workshop Starter

A Next.js application that demonstrates a multi-agent AI recommendation system for movies and shows.

## Phase 1: Basic Setup (Current)

This is a starter repo with a working Next.js app where users can:

- Enter a natural language query in a text area
- Submit the query to a backend API
- Receive and view a static JSON response

**No AI/Agent logic is implemented yet** - this is just the foundation.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx              # Main UI page with form and results
    layout.tsx            # Root layout
    globals.css           # Global styles
    api/
      recommend/
        route.ts          # POST /api/recommend endpoint
  lib/
    data/
      catalog.json        # Sample movie and show data
    types/
      api.ts             # TypeScript types for API
docs/
  pitch.md               # Project pitch/overview
```

## How It Works (Phase 1)

1. User types a message in the textarea
2. Clicks "Recommend" button
3. Frontend calls `POST /api/recommend` with `{ message: string }`
4. Backend returns a static JSON response
5. UI displays the response in cards

## API

### POST /api/recommend

**Request:**

```json
{
  "message": "I have a 1 hour flight, want something light and funny"
}
```

**Response:**

```json
{
  "title": "Starter response",
  "echo": "I have a 1 hour flight, want something light and funny",
  "items": [
    {
      "name": "Example Movie",
      "type": "movie",
      "durationMinutes": 90,
      "why": "Static placeholder"
    }
  ]
}
```

## Next Steps

Future phases will add:

- Multi-agent system for processing queries
- Real catalog search
- Intelligent recommendations
- Constraint handling (time, mood, group preferences)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **No external libraries** for state management or data fetching (keeping it simple)
