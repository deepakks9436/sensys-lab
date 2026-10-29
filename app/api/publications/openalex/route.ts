import { NextResponse } from "next/server";

import {
  getMergedPublications,
} from "../../../../lib/openalex";

export const runtime = "nodejs";

export async function GET() {
  const result =
    await getMergedPublications();

  return NextResponse.json(
    result,
    {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    }
  );
}