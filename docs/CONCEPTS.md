# Multi-Agent System Concepts

This guide explains the core concepts used in this workshop. It connects the pieces covered in [WORKSHOP.md](WORKSHOP.md) to help you understand how multi-agent systems work.

---

## Table of Contents

- [What is an Agent?](#what-is-an-agent)
- [What are Instructions?](#what-are-instructions)
- [What are Handoffs?](#what-are-handoffs)
- [What are Tools?](#what-are-tools)
- [What are Guardrails?](#what-are-guardrails)
- [Multi-Agent Orchestration](#multi-agent-orchestration)
- [When to Use Multi-Agent Architecture](#when-to-use-multi-agent-architecture)
- [OpenAI Agents SDK Reference](#openai-agents-sdk-reference)

---

## What is an Agent?

An **agent** is an independent AI entity with a specific responsibility. Think of it as a specialized team member who's really good at one thing.

### In This Workshop

We built **5 specialized agents**:

1. **Classification Agent** - Determines what type of request the user made
2. **Greeting Agent** - Responds to greetings warmly
3. **Out of Scope Agent** - Politely declines non-movie requests
4. **Parser Agent** - Extracts preferences and searches the catalog
5. **Ranker Agent** - Sorts results and generates explanations

### Key Characteristics

- **Single Responsibility** - Each agent has one clear job
- **Autonomous** - Can make decisions within its scope
- **Communicative** - Can hand off to other agents when needed

### Creating an Agent (OpenAI SDK)

```typescript
import { Agent } from "@openai/agents";

const myAgent = Agent.create({
  name: "Agent Name",
  instructions: "What this agent does...",
  handoffs: [otherAgent1, otherAgent2],
  tools: [toolDefinition],
  inputGuardrails: [guardrail],
  outputGuardrails: [guardrail],
});
```

**Reference:** [OpenAI Agents SDK - Agent Creation](https://openai.github.io/openai-agents-js/classes/Agent.html#create)

---

## What are Instructions?

**Instructions** are natural language guidelines that define how an agent behaves. They're like a job description that tells the AI what to do, how to do it, and when to delegate to others.

### In This Workshop

Each agent has detailed instructions in [instructions.ts](../src/lib/agents-sdk/instructions.ts):

- **Classification Instructions** - How to categorize user intent
- **Greeting Instructions** - How to respond to greetings
- **Parser Instructions** - How to extract preferences and use the search tool
- **Ranker Instructions** - How to rank results and format output
- **Out of Scope Instructions** - How to politely decline

### Best Practices

- **Be specific** - "Classify into exactly ONE of these categories..."
- **Give examples** - Show expected input/output patterns
- **Define boundaries** - Explain what the agent should NOT do
- **Enable handoffs** - Use `RECOMMENDED_PROMPT_PREFIX` for agent-to-agent communication

### Example from Our Workshop

```typescript
export const CLASSIFICATION_AGENT_INSTRUCTIONS = `${RECOMMENDED_PROMPT_PREFIX}

Classify the user input into exactly ONE of these categories and transfer to the appropriate agent:

  1. "greeting" - User is greeting, saying hello, or making general conversation
    → greetingAgent
  
  2. "recommendation" - User is asking for movie/TV show recommendations
    → parserAgent
  
  3. "out_of_scope" - User is asking about anything else not related to movies/TV
    → outOfScopeAgent`;
```

**Reference:** [OpenAI Agents SDK - Instructions](https://openai.github.io/openai-agents-js/interfaces/AgentOptions.html#instructions)

---

## What are Handoffs?

**Handoffs** (also called transfers) enable agents to delegate work to other specialized agents. This is how we build complex workflows from simple, focused agents.

### In This Workshop

The **Classification Agent** acts as an orchestrator and hands off to specialists:

```
User Request
    ↓
Classification Agent (orchestrator)
    ↓
    ├─→ Greeting Agent (if greeting)
    ├─→ Parser Agent (if recommendation request)
    └─→ Out of Scope Agent (if unrelated)
```

The **Parser Agent** also hands off to the **Ranker Agent** after searching:

```
Parser Agent (extracts preferences + searches)
    ↓
Ranker Agent (sorts + explains results)
```

### How Handoffs Work

1. Agent A completes its task
2. Agent A determines that Agent B should handle the next step
3. Agent A transfers control to Agent B with relevant context
4. Agent B takes over and continues the workflow

### Implementing Handoffs

```typescript
const classificationAgent = Agent.create({
  name: "Classification agent",
  instructions: CLASSIFICATION_AGENT_INSTRUCTIONS,
  handoffs: [greetingAgent, parserAgent, outOfScopeAgent], // ← Agents it can transfer to
});
```

**Important:** Instructions must include `RECOMMENDED_PROMPT_PREFIX` to enable handoff functionality.

**Reference:** [OpenAI Agents SDK - Handoffs](https://openai.github.io/openai-agents-js/interfaces/AgentOptions.html#handoffs)

---

## What are Tools?

**Tools** are deterministic functions that extend agent capabilities beyond language generation. They allow agents to interact with external systems, APIs, databases, or perform calculations.

### In This Workshop

We built **one tool**: `catalogSearchTool`

**Purpose:** Search the movie/show catalog based on extracted preferences

**Parameters:**

- `typePreference` - "movie", "show", or "any"
- `genresInclude` - Array of genre names
- `timeLimitMinutes` - Optional runtime constraint

### Tool Definition Structure

```typescript
import { defineTool } from "@openai/agents";
import { z } from "zod";

export const catalogSearchTool = defineTool({
  name: "catalogSearchTool",
  description: "Searches the catalog for movies and shows...",

  // Schema defines parameters and their validation
  schema: z.object({
    typePreference: z.enum(["movie", "show", "any"]),
    genresInclude: z.array(z.string()),
    timeLimitMinutes: z.number().nullable(),
  }),

  // Execute function contains the actual logic
  execute: async (query) => {
    const results = searchCatalog(query);
    return results;
  },
});
```

### When to Use Tools

- **External data** - Fetch from APIs or databases
- **Calculations** - Perform complex math or logic
- **State management** - Update system state
- **Validation** - Check against external rules

**Note:** Tools are synchronous/deterministic. For AI reasoning, use agent handoffs instead.

**Reference:** [OpenAI Agents SDK - Tools](https://openai.github.io/openai-agents-js/functions/defineTool.html)

---

## What are Guardrails?

**Guardrails** are validation functions that check inputs or outputs to ensure safety, correctness, and quality. They act as safety nets at system boundaries.

### In This Workshop

We implemented **two guardrails**:

#### 1. Input Guardrail (Content Safety)

**Attached to:** Classification Agent  
**Purpose:** Validate user requests BEFORE processing  
**Checks:**

- Offensive or harmful language
- Message length (not too long)
- Empty or invalid inputs

**When it triggers:** Returns a 400 error immediately, preventing processing

#### 2. Output Guardrail (Response Validation)

**Attached to:** Ranker Agent  
**Purpose:** Validate recommendations AFTER generation  
**Checks:**

- Proper JSON format
- Required fields present (name, type, genres, etc.)
- No hallucinated (made-up) movie titles
- Max 10 recommendations

**When it triggers:** Returns a 500 error, indicating processing failed

### Guardrail Structure

```typescript
import { defineGuardrail } from "@openai/agents";

export const myGuardrail = defineGuardrail({
  name: "My Guardrail",

  // Check function performs validation
  check: async (input) => {
    if (/* validation fails */) {
      return {
        tripwire: "error_code",
        message: "What went wrong",
      };
    }
    return null; // null = validation passed
  },
});
```

### Input vs Output Guardrails

| Aspect          | Input Guardrail              | Output Guardrail            |
| --------------- | ---------------------------- | --------------------------- |
| **When**        | Before agent processing      | After agent completes       |
| **Attached to** | First agent (Classification) | Last agent (Ranker)         |
| **Purpose**     | Validate user input          | Validate system output      |
| **Error**       | 400 Bad Request              | 500 Server Error            |
| **Example**     | Check for offensive content  | Check for valid JSON format |

**Reference:** [OpenAI Agents SDK - Guardrails](https://openai.github.io/openai-agents-js/functions/defineGuardrail.html)

---

## Multi-Agent Orchestration

**Orchestration** is how multiple agents work together to solve complex problems. In this workshop, we use a **hierarchical orchestration pattern**.

### Our Architecture Pattern

```
                    ┌─────────────────────┐
                    │  Classification     │ ← Orchestrator
                    │  Agent              │
                    └─────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ↓               ↓               ↓
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │  Greeting    │ │  Parser      │ │ Out of Scope │ ← Specialists
    │  Agent       │ │  Agent       │ │ Agent        │
    └──────────────┘ └──────────────┘ └──────────────┘
                            │
                            ↓
                    ┌──────────────┐
                    │  Ranker      │ ← Sub-specialist
                    │  Agent       │
                    └──────────────┘
```

### Flow Example: "I want a comedy movie"

1. **Classification Agent** receives the request
2. Classifies as "recommendation" intent
3. **Hands off to Parser Agent**
4. Parser Agent extracts: `type=movie, genres=[Comedy]`
5. Parser Agent **uses catalogSearchTool** to search
6. **Hands off to Ranker Agent** with results
7. Ranker Agent sorts by year, generates explanations
8. Returns formatted JSON response

### Benefits of This Pattern

- **Separation of concerns** - Each agent has one job
- **Maintainability** - Easy to update individual agents
- **Testability** - Each agent can be tested independently
- **Reusability** - Agents can be reused in different workflows
- **Clarity** - Flow is easy to understand and debug

---

## When to Use Multi-Agent Architecture

### Use Multi-Agent When:

✅ **Problem has distinct phases** - Classification → Parsing → Ranking  
✅ **Different types of responses needed** - Greetings vs Recommendations  
✅ **Need reusable components** - Greeting agent can be reused across projects  
✅ **Complexity requires specialization** - Complex parsing logic separated from ranking logic  
✅ **Multiple decision points** - Route to different handlers based on intent

### Use Single-Agent When:

❌ **Simple, linear task** - "Translate this text"  
❌ **No branching logic** - One input type, one output type  
❌ **No tool usage needed** - Pure language generation  
❌ **Minimal complexity** - Can be solved with one prompt

### Example from This Workshop

**Why we use 5 agents instead of 1:**

| Agent              | Why Separate?                                                   |
| ------------------ | --------------------------------------------------------------- |
| **Classification** | Different intents need different handling                       |
| **Greeting**       | Simple, reusable, no need for tools                             |
| **Out of Scope**   | Consistent decline message, no processing needed                |
| **Parser**         | Complex logic: extract preferences + use tools + handle OR/AND  |
| **Ranker**         | Focused on sorting + explanation generation + output validation |

If we used one agent, the instructions would be 10x longer, harder to maintain, and less testable.

---

## OpenAI Agents SDK Reference

This workshop uses the **OpenAI Agents SDK** for JavaScript/TypeScript.

### Official Documentation

- **Main Documentation:** [https://openai.github.io/openai-agents-js/](https://openai.github.io/openai-agents-js/)
- **GitHub Repository:** [https://github.com/openai/openai-agents-js](https://github.com/openai/openai-agents-js)

### Key APIs Used in This Workshop

| Concept              | SDK Function                | Documentation                                                                                        |
| -------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Create Agent**     | `Agent.create()`            | [Agent Class](https://openai.github.io/openai-agents-js/classes/Agent.html#create)                   |
| **Define Tool**      | `defineTool()`              | [Tools Guide](https://openai.github.io/openai-agents-js/functions/defineTool.html)                   |
| **Define Guardrail** | `defineGuardrail()`         | [Guardrails Guide](https://openai.github.io/openai-agents-js/functions/defineGuardrail.html)         |
| **Handoffs**         | `handoffs: [...]`           | [Agent Options](https://openai.github.io/openai-agents-js/interfaces/AgentOptions.html#handoffs)     |
| **Instructions**     | `instructions: "..."`       | [Agent Options](https://openai.github.io/openai-agents-js/interfaces/AgentOptions.html#instructions) |
| **Enable Handoffs**  | `RECOMMENDED_PROMPT_PREFIX` | [Extensions](https://openai.github.io/openai-agents-js/modules.html)                                 |

### Additional Learning Resources

- **OpenAI Platform Docs:** [https://platform.openai.com/docs](https://platform.openai.com/docs)
- **Agents Cookbook:** Examples and best practices (check GitHub repo)
- **API Reference:** Detailed API specifications in the docs

---

## Next Steps

Now that you understand the concepts, you can:

1. **Build the system yourself** - Checkout the `template` branch and follow [WORKSHOP.md](WORKSHOP.md)
2. **Explore the architecture** - Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design details
3. **Study the code** - Review the complete implementation in the `main` branch
4. **Experiment** - Modify agents, add new tools, create custom guardrails

**Remember:** Multi-agent systems are about breaking down complexity into manageable, specialized pieces that collaborate effectively.
