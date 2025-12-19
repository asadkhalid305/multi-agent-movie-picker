import { Agent } from "@openai/agents";
import { CLASSIFICATION_AGENT_INSTRUCTIONS } from "../instructions";
import greetingAgent from "./greetingAgent";
import outOfScopeAgent from "./outOfScopeAgent";
import parserAgent from "./parserAgent";

const classificationAgent = Agent.create({
  name: "Classification agent",
  instructions: CLASSIFICATION_AGENT_INSTRUCTIONS,
  handoffs: [greetingAgent, parserAgent, outOfScopeAgent],
});

export default classificationAgent;
