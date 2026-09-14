import Link from "next/link";

import { createClient } from "../../../lib/supabase/server";

import {
  markAllNotificationsRead,
  markNotificationRead,
} from "./actions";

function typeLabel(
  value: string
) {
  switch (value) {
    case "instrument_booking_created":
      return "Booking";

    case "instrument_booking_updated":
      return "Booking Updated";

    case "instrument_booking_cancelled":
      return "Booking Cancelled";

    case "action_assigned":
      return "Action";

    case "meeting_published":
      return "Meeting";

    case "milestone_updated":
      return "Milestone";

    case "instrument_authorized":
      return "Instrument Access";

    default:
      return "SenSys Hub";
  }
}

function priorityClasses(
  priority: string
) {
  if (
    priority === "Critical"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  if (
    priority === "High"
  ) {
    return "bg-[#FFF4D9] text-[#8A6200]";
  }

  return "bg-[#EEF2F8] text-[#385E9D]";
}

function displayTime(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(
    new Date(value)
  );
}

export default async function NotificationsPage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const {
    data: notifications,
  } =
    await supabase
      .from("notifications")
      .select(
        `
        id,
        notification_type,
        title,
        message,
        action_url,
        priority,
        is_read,
        created_at
        `
      )
      .eq(
        "user_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .limit(100);

  const items =
    notifications ?? [];

  const unreadCount =
    items.filter(
      (item) =>
        !item.is_read
    ).length;

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1050px]">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
              SenSys Hub
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Notifications.
            </h1>

            <p className="mt-3 text-sm text-[#706963]">
              {unreadCount} unread
              notification
              {unreadCount === 1
                ? ""
                : "s"}
            </p>
          </div>

          {unreadCount > 0 && (
            <form
              action={
                markAllNotificationsRead
              }
            >
              <button
                type="submit"
                className="rounded-full border border-[#385E9D] bg-white px-5 py-3 text-xs font-semibold text-[#385E9D]"
              >
                Mark all as read
              </button>
            </form>
          )}
        </div>

        <section className="mt-8 border border-[#DDD6CF] bg-white">
          {items.length ===
          0 ? (
            <div className="px-6 py-14 text-sm text-[#837A72]">
              You have no notifications.
            </div>
          ) : (
            <div className="divide-y divide-[#EEE9E4]">
              {items.map(
                (
                  notification
                ) => {
                  const readAction =
                    markNotificationRead.bind(
                      null,
                      notification.id
                    );

                  return (
                    <div
                      key={
                        notification.id
                      }
                      className={`px-6 py-5 ${
                        notification.is_read
                          ? "bg-white"
                          : "bg-[#F7F9FC]"
                      }`}
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div className="max-w-3xl">
                          <div className="flex flex-wrap items-center gap-2">
                            {!notification.is_read && (
                              <span className="h-2 w-2 rounded-full bg-[#385E9D]" />
                            )}

                            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#385E9D]">
                              {typeLabel(
                                notification.notification_type
                              )}
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${priorityClasses(
                                notification.priority
                              )}`}
                            >
                              {
                                notification.priority
                              }
                            </span>
                          </div>

                          <h2 className="mt-3 text-sm font-semibold">
                            {
                              notification.title
                            }
                          </h2>

                          {notification.message && (
                            <p className="mt-2 text-xs leading-6 text-[#706963]">
                              {
                                notification.message
                              }
                            </p>
                          )}

                          <p className="mt-3 text-[9px] text-[#928980]">
                            {displayTime(
                              notification.created_at
                            )}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap gap-2">
                          {!notification.is_read && (
                            <form
                              action={
                                readAction
                              }
                            >
                              <button
                                type="submit"
                                className="rounded-full border border-[#D8D0C7] px-4 py-2 text-[10px] font-semibold"
                              >
                                Mark read
                              </button>
                            </form>
                          )}

                          {notification.action_url && (
                            <Link
                              href={
                                notification.action_url
                              }
                              className="rounded-full bg-[#385E9D] px-4 py-2 text-[10px] font-semibold text-white"
                            >
                              Open →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}