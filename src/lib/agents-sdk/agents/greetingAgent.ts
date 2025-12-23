import { Agent } from "@openai/agents";
import { GREETING_AGENT_INSTRUCTIONS } from "../instructions";

/**
 * Greeting Agent - Responds warmly to user greetings
 *
 * This is a simple agent with no tools or guardrails.
 * It handles conversational greetings like "hi", "hello", "how are you?".
 */
const greetingAgent = Agent.create({
  name: "Greeting agent",
  instructions: GREETING_AGENT_INSTRUCTIONS,
});

export default greetingAgent;
