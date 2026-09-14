import Link from "next/link";

import { createClient } from "../../../../lib/supabase/server";

type SearchParams = {
  view?: string;
  date?: string;
  instrument?: string;
  user?: string;
  scope?: string;
  sort?: string;
  cancelled?: string;
};

type ScheduleBooking = {
  booking_id: string;
  instrument_id: string;
  instrument_name: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  booked_by: string;
  purpose: string | null;
  is_own_booking: boolean;
};

type HistoryBooking = {
  id: string;
  instrument_id: string;
  user_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  purpose: string | null;
  instruments:
    | {
        id: string;
        name: string;
      }
    | {
        id: string;
        name: string;
      }[]
    | null;
};

function addDays(
  date: Date,
  days: number
) {
  const result = new Date(date);

  result.setDate(
    result.getDate() + days
  );

  return result;
}

function addMonths(
  date: Date,
  months: number
) {
  const result = new Date(date);

  result.setMonth(
    result.getMonth() + months
  );

  return result;
}

function dateString(
  date: Date
) {
  return date
    .toISOString()
    .slice(0, 10);
}

function safeDate(
  value?: string
) {
  if (
    value &&
    /^\d{4}-\d{2}-\d{2}$/.test(
      value
    )
  ) {
    return new Date(
      `${value}T12:00:00`
    );
  }

  return new Date();
}

function displayDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  ).format(
    new Date(
      `${value}T12:00:00`
    )
  );
}

function displayMonth(
  date: Date
) {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

function timeText(
  value: string
) {
  return String(value).slice(
    0,
    5
  );
}

function minutesFromTime(
  value: string
) {
  const [
    hour,
    minute,
  ] = String(value)
    .slice(0, 5)
    .split(":")
    .map(Number);

  return hour * 60 + minute;
}

function timeFromMinutes(
  minutes: number
) {
  const hour =
    Math.floor(
      minutes / 60
    );

  const minute =
    minutes % 60;

  return `${String(
    hour
  ).padStart(
    2,
    "0"
  )}:${String(
    minute
  ).padStart(
    2,
    "0"
  )}`;
}

/*
 * For v1, SenSys operating hours are
 * represented as 08:00–18:00.
 *
 * These can later be moved into
 * instrument-specific settings.
 */
function calculateFreeSlots(
  bookings: ScheduleBooking[],
  day: string
) {
  const DAY_START =
    8 * 60;

  const DAY_END =
    18 * 60;

  const dayBookings =
    bookings
      .filter(
        (booking) =>
          booking.booking_date ===
          day
      )
      .sort(
        (a, b) =>
          minutesFromTime(
            a.start_time
          ) -
          minutesFromTime(
            b.start_time
          )
      );

  const free: {
    start: string;
    end: string;
  }[] = [];

  let cursor =
    DAY_START;

  dayBookings.forEach(
    (booking) => {
      const start =
        minutesFromTime(
          booking.start_time
        );

      const end =
        minutesFromTime(
          booking.end_time
        );

      if (
        start > cursor
      ) {
        free.push({
          start:
            timeFromMinutes(
              cursor
            ),
          end:
            timeFromMinutes(
              start
            ),
        });
      }

      cursor =
        Math.max(
          cursor,
          end
        );
    }
  );

  if (
    cursor < DAY_END
  ) {
    free.push({
      start:
        timeFromMinutes(
          cursor
        ),

      end:
        timeFromMinutes(
          DAY_END
        ),
    });
  }

  return free;
}

function statusClasses(
  status: string
) {
  if (
    status ===
    "Confirmed"
  ) {
    return "bg-[#E8F4EC] text-[#2D6A45]";
  }

  if (
    status ===
    "Completed"
  ) {
    return "bg-[#EEF2F8] text-[#385E9D]";
  }

  if (
    status ===
    "Cancelled"
  ) {
    return "bg-[#FBE7E5] text-[#A23B35]";
  }

  return "bg-[#FFF4D9] text-[#8A6200]";
}

export default async function InstrumentSchedulePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query =
    await searchParams;

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
    data: profile,
  } =
    await supabase
      .from("profiles")
      .select(
        "role, is_active"
      )
      .eq("id", user.id)
      .single();

  if (
    !profile ||
    !profile.is_active
  ) {
    return null;
  }

  const canManage =
    [
      "admin",
      "lab_manager",
    ].includes(
      profile.role
    );

  /* ========================================================
     VIEW
  ======================================================== */

  const allowedViews = [
    "calendar",
    "today",
    "week",
    "instrument",
    "mine",
  ];

  const view =
    allowedViews.includes(
      query.view ?? ""
    )
      ? query.view!
      : "calendar";

  const baseDate =
    safeDate(query.date);

  const selectedDate =
    dateString(
      baseDate
    );

  const today =
    dateString(
      new Date()
    );

  /* ========================================================
     INSTRUMENTS
  ======================================================== */

  const {
    data: instruments,
  } =
    await supabase
      .from(
        "instruments"
      )
      .select(
        `
        id,
        name,
        status,
        location,
        booking_required,
        training_required
        `
      )
      .neq(
        "status",
        "Archived"
      )
      .order("name");

  const instrumentList =
    instruments ?? [];

  const selectedInstrument =
    query.instrument &&
    instrumentList.some(
      (instrument) =>
        instrument.id ===
        query.instrument
    )
      ? query.instrument
      : instrumentList[0]?.id ??
        "";

  /* ========================================================
     LIVE SCHEDULE RANGE
  ======================================================== */

  let liveStart =
    selectedDate;

  let liveEnd =
    selectedDate;

  if (
    view ===
    "week"
  ) {
    liveEnd =
      dateString(
        addDays(
          baseDate,
          6
        )
      );
  }

  if (
    view ===
    "calendar"
  ) {
    const firstDay =
      new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        1,
        12
      );

    const lastDay =
      new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() +
          1,
        0,
        12
      );

    liveStart =
      dateString(
        firstDay
      );

    liveEnd =
      dateString(
        lastDay
      );
  }

  if (
    view ===
    "instrument"
  ) {
    liveStart =
      selectedDate;

    liveEnd =
      dateString(
        addDays(
          baseDate,
          13
        )
      );
  }

  /* ========================================================
     LIVE BOOKINGS
  ======================================================== */

  const {
    data: liveSchedule,
  } =
    await supabase.rpc(
      "get_instrument_schedule",
      {
        p_start_date:
          liveStart,

        p_end_date:
          liveEnd,

        p_instrument_id:
          view ===
            "instrument" &&
          selectedInstrument
            ? selectedInstrument
            : null,
      }
    );

  const schedule =
    (liveSchedule ??
      []) as ScheduleBooking[];

  /* ========================================================
     MY / USER BOOKING HISTORY
  ======================================================== */

  let historyBookings:
    HistoryBooking[] =
    [];

  const historyScope =
    query.scope ??
    "all";

  const sort =
    query.sort ===
    "oldest"
      ? "oldest"
      : "newest";

  if (
    view === "mine"
  ) {
    let bookingQuery =
      supabase
        .from(
          "instrument_bookings"
        )
        .select(
          `
          id,
          instrument_id,
          user_id,
          booking_date,
          start_time,
          end_time,
          status,
          purpose,
          instruments (
            id,
            name
          )
          `
        );

    if (
      canManage &&
      query.user
    ) {
      bookingQuery =
        bookingQuery.eq(
          "user_id",
          query.user
        );
    } else {
      bookingQuery =
        bookingQuery.eq(
          "user_id",
          user.id
        );
    }

    if (
      query.instrument
    ) {
      bookingQuery =
        bookingQuery.eq(
          "instrument_id",
          query.instrument
        );
    }

    if (
      historyScope ===
      "upcoming"
    ) {
      bookingQuery =
        bookingQuery
          .gte(
            "booking_date",
            today
          )
          .in(
            "status",
            [
              "Pending",
              "Confirmed",
            ]
          );
    }

    if (
      historyScope ===
      "past"
    ) {
      bookingQuery =
        bookingQuery.lt(
          "booking_date",
          today
        );
    }

    if (
      historyScope ===
      "cancelled"
    ) {
      bookingQuery =
        bookingQuery.eq(
          "status",
          "Cancelled"
        );
    }

    const {
      data: history,
    } =
      await bookingQuery
        .order(
          "booking_date",
          {
            ascending:
              sort ===
              "oldest",
          }
        )
        .order(
          "start_time",
          {
            ascending:
              sort ===
              "oldest",
          }
        );

    historyBookings =
      (history ??
        []) as HistoryBooking[];
  }

  /* ========================================================
     USER FILTER FOR LAB MANAGEMENT
  ======================================================== */

  let users:
    {
      id: string;
      full_name: string | null;
      email: string | null;
    }[] = [];

  if (canManage) {
    const {
      data: userProfiles,
    } =
      await supabase
        .from("profiles")
        .select(
          "id, full_name, email"
        )
        .eq(
          "is_active",
          true
        )
        .order(
          "full_name"
        );

    users =
      userProfiles ??
      [];
  }

  /* ========================================================
     CALENDAR DAYS
  ======================================================== */

  const firstOfMonth =
    new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      1,
      12
    );

  const lastOfMonth =
    new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() +
        1,
      0,
      12
    );

  const calendarStart =
    addDays(
      firstOfMonth,
      -firstOfMonth.getDay()
    );

  const calendarEnd =
    addDays(
      lastOfMonth,
      6 -
        lastOfMonth.getDay()
    );

  const calendarDays: Date[] =
    [];

  let cursor =
    calendarStart;

  while (
    cursor <= calendarEnd
  ) {
    calendarDays.push(
      new Date(cursor)
    );

    cursor =
      addDays(
        cursor,
        1
      );
  }

  const countForDay =
    new Map<
      string,
      ScheduleBooking[]
    >();

  schedule.forEach(
    (booking) => {
      const existing =
        countForDay.get(
          booking.booking_date
        ) ?? [];

      existing.push(
        booking
      );

      countForDay.set(
        booking.booking_date,
        existing
      );
    }
  );

  /* ========================================================
     WEEK DAYS
  ======================================================== */

  const weekDays =
    Array.from(
      {
        length: 7,
      },
      (_, index) =>
        dateString(
          addDays(
            baseDate,
            index
          )
        )
    );

  const instrumentDays =
    Array.from(
      {
        length: 14,
      },
      (_, index) =>
        dateString(
          addDays(
            baseDate,
            index
          )
        )
    );

  const previousDate =
    view ===
    "calendar"
      ? dateString(
          addMonths(
            baseDate,
            -1
          )
        )
      : view ===
        "week"
      ? dateString(
          addDays(
            baseDate,
            -7
          )
        )
      : view ===
        "instrument"
      ? dateString(
          addDays(
            baseDate,
            -14
          )
        )
      : dateString(
          addDays(
            baseDate,
            -1
          )
        );

  const nextDate =
    view ===
    "calendar"
      ? dateString(
          addMonths(
            baseDate,
            1
          )
        )
      : view ===
        "week"
      ? dateString(
          addDays(
            baseDate,
            7
          )
        )
      : view ===
        "instrument"
      ? dateString(
          addDays(
            baseDate,
            14
          )
        )
      : dateString(
          addDays(
            baseDate,
            1
          )
        );

  const navigationLabel =
    view ===
    "calendar"
      ? displayMonth(
          baseDate
        )
      : view ===
        "week"
      ? `${displayDate(
          selectedDate
        )} – ${displayDate(
          dateString(
            addDays(
              baseDate,
              6
            )
          )
        )}`
      : view ===
        "instrument"
      ? `${displayDate(
          selectedDate
        )} – ${displayDate(
          dateString(
            addDays(
              baseDate,
              13
            )
          )
        )}`
      : displayDate(
          selectedDate
        );

  /* ========================================================
     VIEW URL HELPER
  ======================================================== */

  function viewHref(
    target: string
  ) {
    return `/hub/lab/schedule?view=${target}&date=${selectedDate}`;
  }

  /* ========================================================
     PAGE
  ======================================================== */

  return (
    <main className="px-5 py-8 md:px-8 md:py-10 xl:px-10">
      <div className="mx-auto max-w-[1320px]">
        {/* HEADER */}

        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#385E9D]">
              Laboratory Operations
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Instrument Schedule.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#706963]">
              Explore instrument
              availability, live bookings
              and your complete booking
              history.
            </p>
          </div>

          <Link
            href="/hub/lab"
            className="inline-flex self-start rounded-full border border-[#D8D0C7] bg-white px-5 py-3 text-xs font-semibold"
          >
            ← Lab & Instruments
          </Link>
        </div>

        {query.cancelled ===
          "1" && (
          <div className="mt-7 border-l-[3px] border-[#2D6A45] bg-[#E8F4EC] px-5 py-4 text-xs text-[#2D6A45]">
            Booking cancelled successfully.
          </div>
        )}

        {/* MAIN VIEW TABS */}

        <div className="mt-8 border border-[#DDD6CF] bg-white p-4">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {[
                [
                  "calendar",
                  "Calendar",
                ],
                [
                  "today",
                  "Today",
                ],
                [
                  "week",
                  "Week",
                ],
                [
                  "instrument",
                  "Instrument",
                ],
                [
                  "mine",
                  "My Bookings",
                ],
              ].map(
                ([
                  value,
                  label,
                ]) => (
                  <Link
                    key={
                      value
                    }
                    href={viewHref(
                      value
                    )}
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${
                      view ===
                      value
                        ? "bg-[#385E9D] text-white"
                        : "border border-[#D8D0C7] bg-white"
                    }`}
                  >
                    {
                      label
                    }
                  </Link>
                )
              )}
            </div>

            {view !==
              "mine" && (
              <div className="flex items-center gap-2">
                <Link
                  href={`/hub/lab/schedule?view=${view}&date=${previousDate}${
                    selectedInstrument
                      ? `&instrument=${selectedInstrument}`
                      : ""
                  }`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D0C7]"
                >
                  ←
                </Link>

                <div className="min-w-[180px] text-center text-xs font-semibold">
                  {
                    navigationLabel
                  }
                </div>

                <Link
                  href={`/hub/lab/schedule?view=${view}&date=${nextDate}${
                    selectedInstrument
                      ? `&instrument=${selectedInstrument}`
                      : ""
                  }`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D0C7]"
                >
                  →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* CALENDAR VIEW */}
        {/* ================================================= */}

        {view ===
          "calendar" && (
          <section className="mt-8 border border-[#DDD6CF] bg-white">
            <div className="grid grid-cols-7 border-b border-[#E7E1DB] bg-[#FAF9F7]">
              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map(
                (day) => (
                  <div
                    key={
                      day
                    }
                    className="border-r border-[#E7E1DB] px-2 py-3 text-center text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980] last:border-r-0"
                  >
                    {day}
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-7">
              {calendarDays.map(
                (day) => {
                  const dayString =
                    dateString(
                      day
                    );

                  const dayBookings =
                    countForDay.get(
                      dayString
                    ) ?? [];

                  const inMonth =
                    day.getMonth() ===
                    baseDate.getMonth();

                  const isToday =
                    dayString ===
                    today;

                  return (
                    <Link
                      key={
                        dayString
                      }
                      href={`/hub/lab/schedule?view=today&date=${dayString}`}
                      className={`min-h-[135px] border-b border-r border-[#E7E1DB] p-3 transition hover:bg-[#FAF9F7] ${
                        !inMonth
                          ? "bg-[#FBFAF8] text-[#B6ADA5]"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                            isToday
                              ? "bg-[#385E9D] text-white"
                              : ""
                          }`}
                        >
                          {
                            day.getDate()
                          }
                        </span>

                        {dayBookings.length >
                          0 && (
                          <span className="rounded-full bg-[#EEF2F8] px-2 py-1 text-[8px] font-bold text-[#385E9D]">
                            {
                              dayBookings.length
                            }
                          </span>
                        )}
                      </div>

                      <div className="mt-3 space-y-1">
                        {dayBookings
                          .slice(
                            0,
                            3
                          )
                          .map(
                            (
                              booking
                            ) => (
                              <div
                                key={
                                  booking.booking_id
                                }
                                className="truncate border-l-2 border-[#385E9D] pl-2 text-[9px] leading-5 text-[#645D57]"
                              >
                                {timeText(
                                  booking.start_time
                                )}{" "}
                                {
                                  booking.instrument_name
                                }
                              </div>
                            )
                          )}

                        {dayBookings.length >
                          3 && (
                          <p className="text-[8px] font-semibold text-[#385E9D]">
                            +
                            {dayBookings.length -
                              3}{" "}
                            more
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* TODAY VIEW */}
        {/* ================================================= */}

        {view ===
          "today" && (
          <DaySchedule
            day={
              selectedDate
            }
            bookings={
              schedule
            }
            canManage={
              canManage
            }
          />
        )}

        {/* ================================================= */}
        {/* WEEK VIEW */}
        {/* ================================================= */}

        {view ===
          "week" && (
          <div className="mt-8 space-y-5">
            {weekDays.map(
              (day) => (
                <DaySchedule
                  key={
                    day
                  }
                  day={
                    day
                  }
                  bookings={
                    schedule
                  }
                  canManage={
                    canManage
                  }
                />
              )
            )}
          </div>
        )}

        {/* ================================================= */}
        {/* INSTRUMENT VIEW */}
        {/* ================================================= */}

        {view ===
          "instrument" && (
          <div className="mt-8">
            <section className="border border-[#DDD6CF] bg-white p-6">
              <form
                method="get"
                className="grid gap-4 md:grid-cols-[1fr_auto]"
              >
                <input
                  type="hidden"
                  name="view"
                  value="instrument"
                />

                <input
                  type="hidden"
                  name="date"
                  value={
                    selectedDate
                  }
                />

                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                    Instrument
                  </label>

                  <select
                    name="instrument"
                    defaultValue={
                      selectedInstrument
                    }
                    className="mt-2 w-full border border-[#D8D0C7] bg-white px-4 py-3 text-sm"
                  >
                    {instrumentList.map(
                      (
                        instrument
                      ) => (
                        <option
                          key={
                            instrument.id
                          }
                          value={
                            instrument.id
                          }
                        >
                          {
                            instrument.name
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>

                <button
                  type="submit"
                  className="self-end rounded-full bg-[#385E9D] px-6 py-3 text-xs font-semibold text-white"
                >
                  Check Availability
                </button>
              </form>
            </section>

            {selectedInstrument && (
              <div className="mt-6 space-y-5">
                {instrumentDays.map(
                  (day) => {
                    const dayBookings =
                      schedule.filter(
                        (booking) =>
                          booking.booking_date ===
                          day
                      );

                    const free =
                      calculateFreeSlots(
                        dayBookings,
                        day
                      );

                    return (
                      <section
                        key={
                          day
                        }
                        className="border border-[#DDD6CF] bg-white"
                      >
                        <div className="border-b border-[#E7E1DB] px-6 py-4">
                          <h3 className="text-base font-bold">
                            {displayDate(
                              day
                            )}
                          </h3>
                        </div>

                        <div className="grid gap-6 p-6 lg:grid-cols-2">
                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#A23B35]">
                              Booked
                            </p>

                            {dayBookings.length ===
                            0 ? (
                              <p className="mt-3 text-xs text-[#837A72]">
                                No bookings.
                              </p>
                            ) : (
                              <div className="mt-3 space-y-2">
                                {dayBookings.map(
                                  (
                                    booking
                                  ) => (
                                    <div
                                      key={
                                        booking.booking_id
                                      }
                                      className="border border-[#EEE9E4] px-4 py-3"
                                    >
                                      <p className="text-xs font-semibold">
                                        {timeText(
                                          booking.start_time
                                        )}
                                        {" – "}
                                        {timeText(
                                          booking.end_time
                                        )}
                                      </p>

                                      <p className="mt-1 text-[10px] text-[#706963]">
                                        {
                                          booking.booked_by
                                        }
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#2D6A45]">
                              Available
                            </p>

                            {free.length ===
                            0 ? (
                              <p className="mt-3 text-xs text-[#A23B35]">
                                No free
                                time within
                                08:00–18:00.
                              </p>
                            ) : (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {free.map(
                                  (
                                    slot
                                  ) => (
                                    <span
                                      key={`${slot.start}-${slot.end}`}
                                      className="rounded-full bg-[#E8F4EC] px-3 py-2 text-[10px] font-semibold text-[#2D6A45]"
                                    >
                                      {
                                        slot.start
                                      }{" "}
                                      –{" "}
                                      {
                                        slot.end
                                      }
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                    );
                  }
                )}
              </div>
            )}
          </div>
        )}

        {/* ================================================= */}
        {/* MY BOOKINGS / USER BOOKINGS */}
        {/* ================================================= */}

        {view ===
          "mine" && (
          <div className="mt-8">
            <section className="border border-[#DDD6CF] bg-white p-6">
              <form
                method="get"
                className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
              >
                <input
                  type="hidden"
                  name="view"
                  value="mine"
                />

                {canManage && (
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                      User
                    </label>

                    <select
                      name="user"
                      defaultValue={
                        query.user ??
                        ""
                      }
                      className="mt-2 w-full border border-[#D8D0C7] bg-white px-3 py-3 text-xs"
                    >
                      <option value="">
                        My bookings
                      </option>

                      {users.map(
                        (
                          item
                        ) => (
                          <option
                            key={
                              item.id
                            }
                            value={
                              item.id
                            }
                          >
                            {item.full_name ||
                              item.email}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                    Instrument
                  </label>

                  <select
                    name="instrument"
                    defaultValue={
                      query.instrument ??
                      ""
                    }
                    className="mt-2 w-full border border-[#D8D0C7] bg-white px-3 py-3 text-xs"
                  >
                    <option value="">
                      All instruments
                    </option>

                    {instrumentList.map(
                      (
                        instrument
                      ) => (
                        <option
                          key={
                            instrument.id
                          }
                          value={
                            instrument.id
                          }
                        >
                          {
                            instrument.name
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                    Period
                  </label>

                  <select
                    name="scope"
                    defaultValue={
                      historyScope
                    }
                    className="mt-2 w-full border border-[#D8D0C7] bg-white px-3 py-3 text-xs"
                  >
                    <option value="all">
                      All bookings
                    </option>

                    <option value="upcoming">
                      Upcoming
                    </option>

                    <option value="past">
                      Past
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#706963]">
                    Sort
                  </label>

                  <select
                    name="sort"
                    defaultValue={
                      sort
                    }
                    className="mt-2 w-full border border-[#D8D0C7] bg-white px-3 py-3 text-xs"
                  >
                    <option value="newest">
                      Newest first
                    </option>

                    <option value="oldest">
                      Oldest first
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="self-end rounded-full bg-[#385E9D] px-5 py-3 text-xs font-semibold text-white"
                >
                  Apply Filters
                </button>
              </form>
            </section>

            <section className="mt-6 border border-[#DDD6CF] bg-white">
              <div className="border-b border-[#E7E1DB] px-6 py-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
                  Booking History
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {canManage &&
                  query.user
                    ? "User Bookings"
                    : "My Bookings"}
                </h2>
              </div>

              {historyBookings.length ===
              0 ? (
                <div className="px-6 py-12 text-sm text-[#837A72]">
                  No bookings match
                  these filters.
                </div>
              ) : (
                <div className="divide-y divide-[#EEE9E4]">
                  {historyBookings.map(
                    (
                      booking
                    ) => {
                      const instrument =
                        Array.isArray(
                          booking.instruments
                        )
                          ? booking.instruments[0]
                          : booking.instruments;

                      const canOpen =
                        booking.user_id ===
                          user.id ||
                        canManage;

                      const row = (
                        <div className="grid gap-4 px-6 py-5 md:grid-cols-[1fr_0.75fr_0.55fr_0.45fr] md:items-center">
                          <div>
                            <p className="text-sm font-semibold">
                              {instrument?.name ||
                                "Instrument"}
                            </p>

                            {booking.purpose && (
                              <p className="mt-1 text-[10px] text-[#928980]">
                                {
                                  booking.purpose
                                }
                              </p>
                            )}
                          </div>

                          <div>
                            <p className="text-xs">
                              {
                                booking.booking_date
                              }
                            </p>

                            <p className="mt-1 text-[10px] text-[#928980]">
                              {timeText(
                                booking.start_time
                              )}
                              {" – "}
                              {timeText(
                                booking.end_time
                              )}
                            </p>
                          </div>

                          <div>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${statusClasses(
                                booking.status
                              )}`}
                            >
                              {
                                booking.status
                              }
                            </span>
                          </div>

                          <div className="text-right">
                            {canOpen && (
                              <span className="text-[9px] font-semibold text-[#385E9D]">
                                View →
                              </span>
                            )}
                          </div>
                        </div>
                      );

                      if (
                        canOpen
                      ) {
                        return (
                          <Link
                            key={
                              booking.id
                            }
                            href={`/hub/lab/bookings/${booking.id}`}
                            className="block transition hover:bg-[#FAF9F7]"
                          >
                            {
                              row
                            }
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={
                            booking.id
                          }
                        >
                          {
                            row
                          }
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

/* ============================================================
   DAY SCHEDULE
============================================================ */

function DaySchedule({
  day,
  bookings,
  canManage,
}: {
  day: string;
  bookings: ScheduleBooking[];
  canManage: boolean;
}) {
  const dayBookings =
    bookings
      .filter(
        (booking) =>
          booking.booking_date ===
          day
      )
      .sort(
        (a, b) =>
          minutesFromTime(
            a.start_time
          ) -
          minutesFromTime(
            b.start_time
          )
      );

  return (
    <section className="mt-8 border border-[#DDD6CF] bg-white">
      <div className="border-b border-[#E7E1DB] px-6 py-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#385E9D]">
          Schedule
        </p>

        <h2 className="mt-1 text-xl font-bold">
          {displayDate(day)}
        </h2>
      </div>

      {dayBookings.length ===
      0 ? (
        <div className="px-6 py-10 text-sm text-[#837A72]">
          No instrument bookings
          for this date.
        </div>
      ) : (
        <div className="divide-y divide-[#EEE9E4]">
          {dayBookings.map(
            (booking) => {
              const editable =
                booking.is_own_booking ||
                canManage;

              const row = (
                <div className="grid gap-4 px-6 py-5 md:grid-cols-[1.05fr_0.55fr_0.85fr_1fr] md:items-center">
                  <div>
                    <p className="text-sm font-semibold">
                      {
                        booking.instrument_name
                      }
                    </p>

                    <p className="mt-1 text-[10px] text-[#928980]">
                      {
                        booking.status
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                      Time
                    </p>

                    <p className="mt-2 text-xs font-semibold">
                      {timeText(
                        booking.start_time
                      )}
                      {" – "}
                      {timeText(
                        booking.end_time
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                      Booked By
                    </p>

                    <p className="mt-2 text-xs">
                      {
                        booking.booked_by
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#928980]">
                      Purpose
                    </p>

                    <p className="mt-2 text-xs text-[#645D57]">
                      {booking.purpose ||
                        "Not specified"}
                    </p>

                    {editable && (
                      <p className="mt-2 text-[9px] font-semibold text-[#385E9D]">
                        Manage booking →
                      </p>
                    )}
                  </div>
                </div>
              );

              if (
                editable
              ) {
                return (
                  <Link
                    key={
                      booking.booking_id
                    }
                    href={`/hub/lab/bookings/${booking.booking_id}`}
                    className="block transition hover:bg-[#FAF9F7]"
                  >
                    {row}
                  </Link>
                );
              }

              return (
                <div
                  key={
                    booking.booking_id
                  }
                >
                  {row}
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}