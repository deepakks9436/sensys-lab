"use server";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../lib/supabase/server";

function optionalText(
  value:
    | FormDataEntryValue
    | null
) {
  const text =
    String(
      value ?? ""
    ).trim();

  return text || null;
}

export async function completeOnboarding(
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
      "/onboarding?error=Please%20enter%20your%20name."
    );
  }

  const {
    data: profile,
    error: profileReadError,
  } = await supabase
    .from("profiles")
    .select(
      "role, is_active"
    )
    .eq(
      "id",
      user.id
    )
    .maybeSingle();

  if (
    profileReadError ||
    !profile ||
    !profile.is_active
  ) {
    redirect(
      "/login?error=Your%20SenSys%20Hub%20account%20is%20not%20active."
    );
  }

  const {
    error: profileError,
  } = await supabase
    .from("profiles")
    .update({
      full_name:
        fullName,

      phone:
        optionalText(
          formData.get(
            "phone"
          )
        ),

      short_bio:
        optionalText(
          formData.get(
            "short_bio"
          )
        ),

      orcid:
        optionalText(
          formData.get(
            "orcid"
          )
        ),

      google_scholar_url:
        optionalText(
          formData.get(
            "google_scholar_url"
          )
        ),

      linkedin_url:
        optionalText(
          formData.get(
            "linkedin_url"
          )
        ),

      onboarding_complete:
        true,
    })
    .eq(
      "id",
      user.id
    );

  if (profileError) {
    redirect(
      `/onboarding?error=${encodeURIComponent(
        profileError.message
      )}`
    );
  }

  if (
    profile.role === "student"
  ) {
    const {
      error: studentError,
    } = await supabase
      .from("students")
      .update({
        full_name:
          fullName,

        research_area:
          optionalText(
            formData.get(
              "research_area"
            )
          ),

        current_priority:
          optionalText(
            formData.get(
              "current_priority"
            )
          ),

        updated_by:
          user.id,
      })
      .eq(
        "user_id",
        user.id
      );

    if (studentError) {
      redirect(
        `/onboarding?error=${encodeURIComponent(
          studentError.message
        )}`
      );
    }
  }

  await supabase
    .from(
      "notification_preferences"
    )
    .upsert(
      {
        user_id:
          user.id,
      },
      {
        onConflict:
          "user_id",
      }
    );

  redirect(
    "/hub?onboarding=complete"
  );
}
