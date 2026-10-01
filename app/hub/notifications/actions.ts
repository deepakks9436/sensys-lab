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

function checked(
  formData: FormData,
  name: string
) {
  return (
    formData.get(
      name
    ) === "on"
  );
}

export async function markNotificationRead(
  notificationId: string
) {
  const supabase =
    await createClient();

  const { error } =
    await supabase.rpc(
      "mark_notification_read",
      {
        p_notification_id:
          notificationId,
      }
    );

  if (error) {
    throw new Error(
      error.message
    );
  }

  revalidatePath(
    "/hub/notifications"
  );

  revalidatePath(
    "/hub"
  );
}

export async function markAllNotificationsRead() {
  const supabase =
    await createClient();

  const { error } =
    await supabase.rpc(
      "mark_all_notifications_read"
    );

  if (error) {
    throw new Error(
      error.message
    );
  }

  revalidatePath(
    "/hub/notifications"
  );

  revalidatePath(
    "/hub"
  );
}

export async function updateEmailPreferences(
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

  const {
    error,
  } = await supabase
    .from(
      "notification_preferences"
    )
    .upsert(
      {
        user_id:
          user.id,

        email_research_reviews:
          checked(
            formData,
            "email_research_reviews"
          ),

        email_actions:
          checked(
            formData,
            "email_actions"
          ),

        email_research_updates:
          checked(
            formData,
            "email_research_updates"
          ),

        email_instruments:
          checked(
            formData,
            "email_instruments"
          ),

        email_inventory:
          checked(
            formData,
            "email_inventory"
          ),

        email_chemical_expiry:
          checked(
            formData,
            "email_chemical_expiry"
          ),

        email_purchases:
          checked(
            formData,
            "email_purchases"
          ),

        updated_at:
          new Date()
            .toISOString(),
      },
      {
        onConflict:
          "user_id",
      }
    );

  if (error) {
    redirect(
      `/hub/notifications?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath(
    "/hub/notifications"
  );

  redirect(
    "/hub/notifications?message=Email%20preferences%20updated."
  );
}
