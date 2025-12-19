import { Agent } from "@openai/agents";
import { RANKER_AGENT_INSTRUCTIONS } from "../instructions";

const rankerAgent = Agent.create({
  name: "Ranker agent",
  instructions: RANKER_AGENT_INSTRUCTIONS,
});

export default rankerAgent;
