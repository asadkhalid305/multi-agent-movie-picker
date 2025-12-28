import { Agent } from "@openai/agents";
import { CLASSIFICATION_AGENT_INSTRUCTIONS } from "../instructions";
import greetingAgent from "./greetingAgent";
import outOfScopeAgent from "./outOfScopeAgent";
// import parserAgent from "./parserAgent"; // TODO: Import parserAgent when created

const classificationAgent = Agent.create({
  name: "Classification Agent",
  instructions: CLASSIFICATION_AGENT_INSTRUCTIONS,
  handoffs: [
    greetingAgent,
    outOfScopeAgent,
    // parserAgent, // TODO: Enable handoff to parserAgent
  ],
});

export default classificationAgent;