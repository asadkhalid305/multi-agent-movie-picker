import { NextRequest, NextResponse } from "next/server";
import type { RecommendRequest, RecommendResponse } from "@/lib/types/api";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: RecommendRequest = await request.json();

    // Basic validation
    if (!body.message || body.message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Static response for Phase 1
    const response: RecommendResponse = {
      title: "Starter response",
      echo: body.message,
      items: [
        {
          name: "Example Movie",
          type: "movie",
          durationMinutes: 90,
          why: "Static placeholder",
        },
      ],
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
