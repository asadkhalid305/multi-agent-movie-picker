import { setDefaultOpenAIKey } from "@openai/agents";

export const executeMultiAgentSystem = async (
  message: string,
  apiKey?: string
) => {
  // If a custom API key is provided, set it as the default
  // Otherwise, the SDK will use OPENAI_API_KEY from environment
  if (apiKey) {
    setDefaultOpenAIKey(apiKey);
  }

  // TODO: Implement multi-agent system execution logic here
  const result = message;
  return result;
};
