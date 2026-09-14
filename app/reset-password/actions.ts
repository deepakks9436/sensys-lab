"use server";

import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";

export async function updatePassword(
  formData: FormData
) {
  const password =
    String(
      formData.get("password") ??
        ""
    );

  const confirmPassword =
    String(
      formData.get(
        "confirm_password"
      ) ?? ""
    );

  if (
    password.length < 8
  ) {
    redirect(
      "/reset-password?error=Password%20must%20contain%20at%20least%208%20characters."
    );
  }

  if (
    password !==
    confirmPassword
  ) {
    redirect(
      "/reset-password?error=The%20passwords%20do%20not%20match."
    );
  }

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login?error=Your%20password-reset%20session%20has%20expired.%20Please%20request%20another%20reset%20link."
    );
  }

  const { error } =
    await supabase.auth.updateUser({
      password,
    });

  if (error) {
    redirect(
      `/reset-password?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  redirect(
    "/hub?passwordChanged=1"
  );
}