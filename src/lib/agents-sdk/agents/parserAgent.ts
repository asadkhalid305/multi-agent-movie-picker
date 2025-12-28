import { Agent } from "@openai/agents";
import { PARSER_AGENT_INSTRUCTIONS } from "../instructions";
// import { catalogSearchTool } from "../tools/catalogSearchTool"; // TODO: Import tool
// import rankerAgent from "./rankerAgent"; // TODO: Import rankerAgent

const parserAgent = Agent.create({
  name: "Parser Agent",
  instructions: PARSER_AGENT_INSTRUCTIONS,
  tools: [
    // TODO: Add catalogSearchTool here
  ],
  handoffs: [
    // TODO: Add rankerAgent here
  ],
});

export default parserAgent;