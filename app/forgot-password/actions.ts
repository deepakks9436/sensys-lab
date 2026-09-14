"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";

function buildOrigin(
  host: string | null,
  forwardedProto: string | null
) {
  if (!host) {
    return "http://localhost:3000";
  }

  const protocol =
    forwardedProto ||
    (host.includes("localhost")
      ? "http"
      : "https");

  return `${protocol}://${host}`;
}

export async function requestPasswordReset(
  formData: FormData
) {
  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  if (!email) {
    redirect(
      "/forgot-password?error=Please%20enter%20your%20email%20address."
    );
  }

  const requestHeaders =
    await headers();

  const host =
    requestHeaders.get("host");

  const forwardedProto =
    requestHeaders.get(
      "x-forwarded-proto"
    );

  const origin =
    buildOrigin(
      host,
      forwardedProto
    );

  const supabase =
    await createClient();

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${origin}/auth/callback?next=/reset-password`,
      }
    );

  /*
   * Avoid revealing whether an account
   * exists for a particular email.
   */
  if (error) {
    console.error(
      "Password reset request error:",
      error.message
    );
  }

  redirect(
    "/forgot-password?sent=1"
  );
}