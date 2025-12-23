import { Agent } from "@openai/agents";
import { CLASSIFICATION_AGENT_INSTRUCTIONS } from "../instructions";
import { contentSafetyGuardrail } from "../guardrails/inputGuardrail";
import greetingAgent from "./greetingAgent";
import outOfScopeAgent from "./outOfScopeAgent";
import parserAgent from "./parserAgent";

/**
 * Classification Agent - The Orchestrator
 *
 * This agent determines user intent and routes to appropriate specialists:
 * - Greeting → greetingAgent
 * - Recommendation → parserAgent
 * - Out of scope → outOfScopeAgent
 *
 * It also enforces input validation through the content safety guardrail.
 */
const classificationAgent = Agent.create({
  name: "Classification agent",
  instructions: CLASSIFICATION_AGENT_INSTRUCTIONS,

  // Input Guardrails: Validate user input before processing
  // Checks for offensive content, message length, and validity
  inputGuardrails: [contentSafetyGuardrail],

  // Handoffs: Enable agent-to-agent delegation
  // Classification agent routes to one of these three specialists
  handoffs: [greetingAgent, parserAgent, outOfScopeAgent],
});

export default classificationAgent;
