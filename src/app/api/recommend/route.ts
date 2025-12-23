import { NextRequest, NextResponse } from "next/server";
import type { RecommendRequest, RecommendResponse } from "@/types/api";

export async function POST(request: NextRequest) {
  // Parse the request body
  const body: RecommendRequest = await request.json();
  const message = body.message.trim();

  // Basic validation
  if (!message || message === "") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  // Get API key from header (if provided by client) or fall back to environment
  const clientApiKey = request.headers.get("x-openai-api-key");
  const apiKey = clientApiKey || process.env.OPENAI_API_KEY;

  // Validate that we have an API key from either source
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OpenAI API key is required. Please provide it via the application or set OPENAI_API_KEY environment variable.",
      },
      { status: 401 }
    );
  }

  // TODO: Execute the multi-agent system and handle the response
  // 1. Create and call executeMultiAgentSystem(message) to run the agent workflow
  // 2. Use formatResponse() to transform the result into API response format
  // 3. Return the formatted response as JSON
  //
  // Note: After adding guardrails to agents, we'll add error handling here for:
  // - InputGuardrailTripwireTriggered (content policy violations)
  // - OutputGuardrailTripwireTriggered (validation issues)

  const response: RecommendResponse = {} as any;

  return NextResponse.json(response);
}
