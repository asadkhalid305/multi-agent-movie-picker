import { NextRequest, NextResponse } from "next/server";
import type { RecommendRequest, RecommendResponse } from "@/types/api";
import { executeMultiAgentSystem } from "@/lib/agents-sdk/agents";
import { formatResponse } from "@/utils/responseFormatter";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: RecommendRequest = await request.json();
    const message = body.message.trim();

    // Basic validation
    if (!message || message === "") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    let response: RecommendResponse;

    try {
      const result = await executeMultiAgentSystem(message);

      response = formatResponse(result);
    } catch (error) {
      console.error("Error executing multi-agent system:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
