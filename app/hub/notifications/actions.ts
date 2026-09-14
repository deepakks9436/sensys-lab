"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../../lib/supabase/server";

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