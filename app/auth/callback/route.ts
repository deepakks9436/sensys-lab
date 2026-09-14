import {
  NextResponse,
  type NextRequest,
} from "next/server";

import { createClient } from "../../../lib/supabase/server";

export async function GET(
  request: NextRequest
) {
  const requestUrl =
    new URL(request.url);

  const code =
    requestUrl.searchParams.get(
      "code"
    );

  const next =
    requestUrl.searchParams.get(
      "next"
    ) || "/hub";

  if (code) {
    const supabase =
      await createClient();

    const { error } =
      await supabase.auth.exchangeCodeForSession(
        code
      );

    if (!error) {
      const destination =
        new URL(
          next,
          requestUrl.origin
        );

      return NextResponse.redirect(
        destination
      );
    }
  }

  const errorUrl =
    new URL(
      "/login",
      requestUrl.origin
    );

  errorUrl.searchParams.set(
    "error",
    "The authentication link is invalid or has expired."
  );

  return NextResponse.redirect(
    errorUrl
  );
}