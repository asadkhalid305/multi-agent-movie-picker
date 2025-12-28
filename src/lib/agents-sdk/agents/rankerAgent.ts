import { Agent } from "@openai/agents";
import { RANKER_AGENT_INSTRUCTIONS } from "../instructions";
// import { outputValidationGuardrail } from "../guardrails/outputGuardrail"; // TODO: Import guardrail

const rankerAgent = Agent.create({
  name: "Ranker agent",
  instructions: RANKER_AGENT_INSTRUCTIONS,
  outputGuardrails: [
    // TODO: Add outputValidationGuardrail here
  ],
});

export default rankerAgent;