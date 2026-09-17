"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../../lib/supabase/server";

export async function updateProfile(
  formData: FormData
) {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName =
    String(
      formData.get(
        "full_name"
      ) ?? ""
    ).trim();

  if (!fullName) {
    redirect(
      "/hub/profile?error=Please%20enter%20your%20name."
    );
  }

  const {
    error,
  } =
    await supabase
      .from("profiles")
      .update({
        full_name:
          fullName,
      })
      .eq(
        "id",
        user.id
      );

  if (error) {
    redirect(
      `/hub/profile?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath(
    "/hub"
  );

  revalidatePath(
    "/hub/profile"
  );

  redirect(
    "/hub/profile?message=Profile%20updated%20successfully."
  );
}