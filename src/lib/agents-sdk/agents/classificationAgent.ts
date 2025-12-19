import { Agent } from "@openai/agents";
import greetingAgent from "./greetingAgent";
import outOfScopeAgent from "./outOfScopeAgent";
import parserAgent from "./parserAgent";

const classificationAgent = Agent.create({
  name: "Classification agent",
  instructions: `You are a classification agent. Your ONLY job is to classify the user's input and immediately hand off to the appropriate agent. Do NOT respond with text - only perform handoffs.

  Classify the user input into exactly ONE of these categories and IMMEDIATELY transfer to that agent:

  1. "greeting" - User is greeting, saying hello, or making general conversation (e.g., "hi", "hello", "how are you")
    → TRANSFER to greetingAgent
  
  2. "recommendation" - User is asking for movie/TV show recommendations or expressing preferences (e.g., "I want action movies", "recommend something funny", "what should I watch")
    → TRANSFER to parserAgent
  
  3. "out_of_scope" - User is asking about anything else not related to movies/TV or greetings (e.g., "what's the weather", "help me with math", "tell me a joke")
    → TRANSFER to outOfScopeAgent

  IMPORTANT: Do NOT return text. Do NOT explain your classification. ONLY perform the handoff to the appropriate agent.`,
  model: "gpt-4.1-mini",
  handoffs: [greetingAgent, parserAgent, outOfScopeAgent],
});

export default classificationAgent;
