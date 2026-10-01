"use server";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../lib/supabase/server";

export async function login(
  formData: FormData
) {
  const email =
    String(
      formData.get(
        "email"
      ) ?? ""
    )
      .trim()
      .toLowerCase();

  const password =
    String(
      formData.get(
        "password"
      ) ?? ""
    );

  if (
    !email ||
    !password
  ) {
    redirect(
      "/login?error=Please%20enter%20your%20email%20and%20password."
    );
  }

  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      });

  if (
    error ||
    !data.user
  ) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Invalid email or password."
      )}`
    );
  }

  const {
    data: profile,
  } = await supabase
    .from("profiles")
    .select(
      "is_active, onboarding_complete"
    )
    .eq(
      "id",
      data.user.id
    )
    .maybeSingle();

  if (
    !profile ||
    !profile.is_active
  ) {
    await supabase.auth.signOut();

    redirect(
      "/login?error=Your%20SenSys%20Hub%20account%20is%20not%20active."
    );
  }

  if (
    !profile.onboarding_complete
  ) {
    redirect(
      "/onboarding"
    );
  }

  redirect("/hub");
}
