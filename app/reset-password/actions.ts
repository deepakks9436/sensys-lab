"use server";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../lib/supabase/server";

export async function updatePassword(
  formData: FormData
) {
  const password =
    String(
      formData.get(
        "password"
      ) ?? ""
    );

  const confirmPassword =
    String(
      formData.get(
        "confirm_password"
      ) ?? ""
    );

  const mode =
    String(
      formData.get(
        "mode"
      ) ?? ""
    );

  const errorBase =
    mode === "invite"
      ? "/reset-password?mode=invite"
      : mode === "change"
        ? "/reset-password?mode=change"
        : "/reset-password";

  if (
    password.length < 8
  ) {
    redirect(
      `${errorBase}&error=${encodeURIComponent(
        "Password must contain at least 8 characters."
      )}`
    );
  }

  if (
    password !==
    confirmPassword
  ) {
    redirect(
      `${errorBase}&error=${encodeURIComponent(
        "The passwords do not match."
      )}`
    );
  }

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login?error=Your%20password-reset%20session%20has%20expired.%20Please%20request%20another%20link."
    );
  }

  const { error } =
    await supabase.auth.updateUser({
      password,
    });

  if (error) {
    redirect(
      `${errorBase}&error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  if (
    mode === "invite"
  ) {
    redirect(
      "/onboarding"
    );
  }

  redirect(
    "/hub?passwordChanged=1"
  );
}
