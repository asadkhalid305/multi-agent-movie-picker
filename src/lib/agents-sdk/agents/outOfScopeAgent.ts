import { Agent } from "@openai/agents";
import { OUT_OF_SCOPE_AGENT_INSTRUCTIONS } from "../instructions";

/**
 * Out of Scope Agent - Politely declines non-movie/show requests
 *
 * This agent handles requests unrelated to movies or TV shows,
 * such as weather queries, jokes, or general questions.
 */
const outOfScopeAgent = Agent.create({
  name: "Out_of_Scope agent",
  instructions: OUT_OF_SCOPE_AGENT_INSTRUCTIONS,
});

export default outOfScopeAgent;
