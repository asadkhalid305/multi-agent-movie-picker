# Multi-Agent Movie Picker

_End decision fatigue. Get personalized movie and show recommendations in seconds._

A Next.js application powered by a multi-agent AI system that understands natural language and delivers intelligent, context-aware recommendations.

---

## 🌟 Branch Overview

This repository uses a **three-branch strategy** to support different learning paths:

### **`main` (You are here)**

Minimal project setup with basic Next.js scaffolding and a single static API endpoint. Use this if you want to:

- Build the entire multi-agent system from scratch without any guidance
- Start with a completely clean slate
- Implement your own architecture and design decisions

**What's included:**

- ✅ Next.js 15 project setup
- ✅ Basic UI components and styling
- ✅ Empty API endpoint (`/api/recommend`) with static response
- ✅ Movie/show catalog data (`catalog.json`)
- ✅ Basic TypeScript types
- ❌ No agents, tools, or guardrails
- ❌ No TODOs or instructions
- ❌ No tests

### **`template` (Recommended starting point)**

Workshop-ready branch with complete project structure, TODOs, and step-by-step instructions. Use this if you want to:

- Follow the guided workshop experience
- Learn multi-agent architecture with structured guidance
- Implement features incrementally with clear checkpoints

**What's included:**

- ✅ Everything from `main`
- ✅ Complete folder structure for agents, tools, and guardrails
- ✅ Pre-written instructions for each agent
- ✅ TODO markers throughout the codebase
- ✅ Comprehensive workshop guide (`WORKSHOP.md`)
- ✅ Automated tests for validation
- ✅ Postman collection for API testing

### **`solution` (Reference implementation)**

Fully implemented multi-agent system with all features working. Use this to:

- See the complete working implementation
- Reference code while working on `template`
- Understand how all components integrate
- Test the final user experience

---

## 🚀 Getting Started

### Choose Your Path

#### Path 1: Build from Scratch (Advanced)

Stay on the `main` branch and build everything yourself:

```bash
# You're already here!
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the basic UI.

**Your mission:** Implement a multi-agent system that classifies user intent, searches for movies/shows, and returns personalized recommendations. The API endpoint at `src/app/api/recommend/route.ts` currently returns a static response—replace it with your implementation.

#### Path 2: Guided Workshop (Recommended)

Switch to the `template` branch and follow the structured workshop:

```bash
# Switch to template branch
git checkout template

# Create your own working branch
git checkout -b my-workshop

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your OpenAI API key

# Start development
npm run dev
```

Follow the comprehensive guide in `docs/WORKSHOP.md` for step-by-step implementation instructions.

#### Path 3: View the Solution

See the fully working implementation:

```bash
# Switch to solution branch
git checkout solution

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your OpenAI API key

# Run the application
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and interact with the complete system.

---

## 📋 What You'll Build

The complete system (available on `solution` branch) includes:

### Key Features

- **Natural Language Understanding** - Describe what you want in plain English
- **Context-Aware** - Understands time constraints, mood preferences, and group dynamics
- **Multi-Agent Architecture** - Specialized agents handle classification, parsing, ranking, and validation
- **Intelligent Ranking** - Results are sorted by relevance with personalized explanations
- **Safety Guardrails** - Input and output validation for content safety

### How It Works

The system uses a **multi-agent architecture** where specialized AI agents collaborate:

1. **Classification Agent** - Determines intent (greeting, recommendation, or out-of-scope)
2. **Parser Agent** - Extracts preferences (genre, type, time limits) and searches the catalog
3. **Ranker Agent** - Sorts results by relevance and generates explanations
4. **Greeting Agent** - Handles conversational greetings
5. **Out-of-Scope Agent** - Politely declines unrelated requests

Each agent has one clear responsibility, uses pre-defined instructions, and can hand off control to other agents. The parser agent uses a **catalog search tool** (a deterministic function) to query the movie/show database. **Input and output guardrails** validate content at system boundaries.

---

## 🏗️ Main Branch Structure

Here's what's currently in this branch:

```
src/
  app/
    page.tsx                    # Main UI (functional)
    layout.tsx                  # App layout
    globals.css                 # Global styles
    api/
      recommend/
        route.ts                # API endpoint (static response only)
  lib/
    data/
      catalog.json              # Movie and show database
    types/
      api.ts                    # Basic API types
docs/
  PITCH.md                      # Project vision and problem statement
  WORKSHOP.md                   # Guide for template branch
package.json                    # Dependencies (no OpenAI SDK yet)
tailwind.config.ts              # Tailwind configuration
tsconfig.json                   # TypeScript configuration
```

---

## 🛠️ Main Branch Quick Start

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

**Note:** This branch contains only the basic UI and a static API response. To build the full multi-agent system:

- **For guided learning:** Switch to the `template` branch
- **For the working solution:** Switch to the `solution` branch

---

---

## 📡 API Reference (Main Branch)

### POST /api/recommend

**Current implementation:** Returns a static response for any input.

**Request:**

```json
{
  "message": "I want a comedy movie under 2 hours"
}
```

**Response (Static):**

```json
{
  "title": "Starter response",
  "echo": "I want a comedy movie under 2 hours",
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

**To implement the full system:**

- Switch to the `template` branch and follow the workshop guide
- Or reference the `solution` branch for the complete implementation

**Expected behavior (on `solution` branch):**

- Intelligent intent classification (greeting, recommendation, out-of-scope)
- Natural language understanding for preferences
- Personalized recommendations with explanations
- Input/output validation with guardrails

---

## 📚 Learning Paths

This project is designed to teach multi-agent system architecture through hands-on implementation:

### Option 1: Self-Directed (Main Branch)

You're currently on the `main` branch, which provides a minimal foundation. This path is for advanced users who want to:

- Design their own architecture from scratch
- Make all implementation decisions independently
- Build without guided instructions or TODOs

**Getting started:**

1. Study the project vision in `docs/PITCH.md`
2. Implement the multi-agent system in `src/app/api/recommend/route.ts`
3. Add agents, tools, and guardrails as needed
4. Create your own folder structure and patterns

### Option 2: Guided Workshop (Template Branch)

Switch to the `template` branch for a structured learning experience:

```bash
# Switch to template branch
git checkout template

# Create your own working branch (recommended)
git checkout -b my-workshop
```

The template branch includes:

- Complete folder structure for agents, tools, and guardrails
- TODO markers throughout the codebase
- Pre-written instructions for each agent
- Step-by-step workshop guide in `WORKSHOP.md`
- Automated tests for validation
- Postman collection for API testing

**Follow the workshop:**

1. Set up your OpenAI API key
2. Follow `docs/WORKSHOP.md` step-by-step
3. Implement each agent with clear guidance
4. Run tests at each checkpoint
5. Reference the `solution` branch when needed

### Option 3: View Complete Solution

Switch to the `solution` branch to see the fully working implementation:

```bash
git checkout solution
npm install
npm run dev
```

Use this to:

- Understand how all components integrate
- Reference code while working on `template`
- Test the complete user experience
- Learn from the final implementation

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **AI/Agents:** OpenAI API with multi-agent orchestration
- **Styling:** Tailwind CSS
- **Testing:** Jest

---

## Why This Matters

Movie & Show Picker demonstrates how to build intelligent systems that:

- **Respect user time** - No endless scrolling or filter clicking
- **Understand context** - Not just keywords, but intent and constraints
- **Explain decisions** - Clear reasoning for each recommendation
- **Scale gracefully** - Multi-agent architecture handles complexity through specialization

The same principles apply to any domain requiring intelligent decision-making: customer support, content moderation, data analysis, workflow automation, and more.

---

## 📖 Additional Resources

- **[PITCH.md](docs/PITCH.md)** - Project vision, problem statement, and user experience
- **[WORKSHOP.md](docs/WORKSHOP.md)** - Complete implementation guide (for `template` branch)

**Note:** For complete documentation including test cases and detailed project structure, switch to the `template` or `solution` branch.

---

## License

MIT
