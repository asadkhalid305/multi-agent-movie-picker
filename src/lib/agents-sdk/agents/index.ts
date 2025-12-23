import { run, setDefaultOpenAIKey } from "@openai/agents";
import classificationAgent from "./classificationAgent";

export const executeMultiAgentSystem = async (
  message: string,
  apiKey?: string
) => {
  // If a custom API key is provided, set it as the default
  // Otherwise, the SDK will use OPENAI_API_KEY from environment
  if (apiKey) {
    setDefaultOpenAIKey(apiKey);
  }

  return await run(classificationAgent, message);
};
