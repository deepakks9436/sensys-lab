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

import {
  notifyHubUser,
} from "../../../lib/hub/notifications";

type HubRole =
  | "admin"
  | "research_manager"
  | "lab_manager"
  | "student"
  | "member";

/* ============================================================
   AUTH
============================================================ */

async function getActor() {
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
    data: profile,
  } =
    await supabase
      .from("profiles")
      .select(
        "role, is_active"
      )
      .eq(
        "id",
        user.id
      )
      .single();

  if (
    !profile ||
    !profile.is_active
  ) {
    throw new Error(
      "Your SenSys Hub account is not active."
    );
  }

  return {
    supabase,
    user,

    role:
      profile.role as HubRole,
  };
}

async function requireLabManager() {
  const actor =
    await getActor();

  if (
    ![
      "admin",
      "lab_manager",
    ].includes(
      actor.role
    )
  ) {
    throw new Error(
      "You do not have permission to manage laboratory instruments."
    );
  }

  return actor;
}

/* ============================================================
   HELPERS
============================================================ */

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

function optionalDate(
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

function booleanValue(
  value:
    | FormDataEntryValue
    | null
) {
  return (
    String(
      value ?? ""
    ) === "on"
  );
}

async function getInstrumentName(
  supabase: any,
  instrumentId: string
) {
  const {
    data,
  } =
    await supabase
      .from(
        "instruments"
      )
      .select(
        "name"
      )
      .eq(
        "id",
        instrumentId
      )
      .maybeSingle();

  return (
    data?.name ??
    "Instrument"
  );
}

/* ============================================================
   ADD INSTRUMENT
============================================================ */

export async function addInstrument(
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireLabManager();

  const name =
    String(
      formData.get(
        "name"
      ) ?? ""
    ).trim();

  if (!name) {
    redirect(
      "/hub/lab/instruments/new?error=Instrument%20name%20is%20required."
    );
  }

  const {
    data,
    error,
  } =
    await supabase
      .from("instruments")
      .insert({
        name,

        category:
          optionalText(
            formData.get(
              "category"
            )
          ),

        manufacturer:
          optionalText(
            formData.get(
              "manufacturer"
            )
          ),

        model:
          optionalText(
            formData.get(
              "model"
            )
          ),

        serial_number:
          optionalText(
            formData.get(
              "serial_number"
            )
          ),

        location:
          optionalText(
            formData.get(
              "location"
            )
          ),

        description:
          optionalText(
            formData.get(
              "description"
            )
          ),

        status:
          String(
            formData.get(
              "status"
            ) ??
              "Available"
          ),

        responsible_person:
          optionalText(
            formData.get(
              "responsible_person"
            )
          ),

        booking_required:
          booleanValue(
            formData.get(
              "booking_required"
            )
          ),

        training_required:
          booleanValue(
            formData.get(
              "training_required"
            )
          ),

        sop_url:
          optionalText(
            formData.get(
              "sop_url"
            )
          ),

        manual_url:
          optionalText(
            formData.get(
              "manual_url"
            )
          ),

        last_calibration_date:
          optionalDate(
            formData.get(
              "last_calibration_date"
            )
          ),

        next_calibration_date:
          optionalDate(
            formData.get(
              "next_calibration_date"
            )
          ),

        last_maintenance_date:
          optionalDate(
            formData.get(
              "last_maintenance_date"
            )
          ),

        next_maintenance_date:
          optionalDate(
            formData.get(
              "next_maintenance_date"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        created_by:
          user.id,

        updated_by:
          user.id,
      })
      .select("id")
      .single();

  if (
    error ||
    !data
  ) {
    redirect(
      `/hub/lab/instruments/new?error=${encodeURIComponent(
        error?.message ??
          "Unable to create instrument."
      )}`
    );
  }

  revalidatePath(
    "/hub"
  );

  revalidatePath(
    "/hub/lab"
  );

  revalidatePath(
    "/hub/lab/schedule"
  );

  redirect(
    `/hub/lab/instruments/${data.id}`
  );
}

/* ============================================================
   UPDATE INSTRUMENT
============================================================ */

export async function updateInstrument(
  instrumentId: string,
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireLabManager();

  const name =
    String(
      formData.get(
        "name"
      ) ?? ""
    ).trim();

  if (!name) {
    throw new Error(
      "Instrument name is required."
    );
  }

  const {
    error,
  } =
    await supabase
      .from("instruments")
      .update({
        name,

        category:
          optionalText(
            formData.get(
              "category"
            )
          ),

        manufacturer:
          optionalText(
            formData.get(
              "manufacturer"
            )
          ),

        model:
          optionalText(
            formData.get(
              "model"
            )
          ),

        serial_number:
          optionalText(
            formData.get(
              "serial_number"
            )
          ),

        location:
          optionalText(
            formData.get(
              "location"
            )
          ),

        description:
          optionalText(
            formData.get(
              "description"
            )
          ),

        status:
          String(
            formData.get(
              "status"
            ) ??
              "Available"
          ),

        responsible_person:
          optionalText(
            formData.get(
              "responsible_person"
            )
          ),

        booking_required:
          booleanValue(
            formData.get(
              "booking_required"
            )
          ),

        training_required:
          booleanValue(
            formData.get(
              "training_required"
            )
          ),

        sop_url:
          optionalText(
            formData.get(
              "sop_url"
            )
          ),

        manual_url:
          optionalText(
            formData.get(
              "manual_url"
            )
          ),

        last_calibration_date:
          optionalDate(
            formData.get(
              "last_calibration_date"
            )
          ),

        next_calibration_date:
          optionalDate(
            formData.get(
              "next_calibration_date"
            )
          ),

        last_maintenance_date:
          optionalDate(
            formData.get(
              "last_maintenance_date"
            )
          ),

        next_maintenance_date:
          optionalDate(
            formData.get(
              "next_maintenance_date"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        updated_by:
          user.id,
      })
      .eq(
        "id",
        instrumentId
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  revalidatePath(
    "/hub"
  );

  revalidatePath(
    "/hub/lab"
  );

  revalidatePath(
    "/hub/lab/schedule"
  );

  revalidatePath(
    `/hub/lab/instruments/${instrumentId}`
  );

  redirect(
    `/hub/lab/instruments/${instrumentId}`
  );
}

/* ============================================================
   CREATE BOOKING
============================================================ */

export async function createInstrumentBooking(
  instrumentId: string,
  formData: FormData
) {
  const actor =
    await getActor();

  const bookingDate =
    String(
      formData.get(
        "booking_date"
      ) ?? ""
    ).trim();

  const startTime =
    String(
      formData.get(
        "start_time"
      ) ?? ""
    ).trim();

  const endTime =
    String(
      formData.get(
        "end_time"
      ) ?? ""
    ).trim();

  if (
    !bookingDate ||
    !startTime ||
    !endTime
  ) {
    redirect(
      `/hub/lab/instruments/${instrumentId}/book?error=Date%2C%20start%20time%20and%20end%20time%20are%20required.`
    );
  }

  const {
    data,
    error,
  } =
    await actor.supabase.rpc(
      "create_instrument_booking",
      {
        p_instrument_id:
          instrumentId,

        p_booking_date:
          bookingDate,

        p_start_time:
          startTime,

        p_end_time:
          endTime,

        p_purpose:
          optionalText(
            formData.get(
              "purpose"
            )
          ),

        p_notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),
      }
    );

  if (error) {
    redirect(
      `/hub/lab/instruments/${instrumentId}/book?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath(
    "/hub/lab"
  );

  revalidatePath(
    "/hub/lab/schedule"
  );

  revalidatePath(
    `/hub/lab/instruments/${instrumentId}`
  );

  if (data) {
    redirect(
      `/hub/lab/bookings/${data}?created=1`
    );
  }

  redirect(
    `/hub/lab/instruments/${instrumentId}?booked=1`
  );
}

/* ============================================================
   MODIFY BOOKING
============================================================ */

export async function updateInstrumentBooking(
  bookingId: string,
  formData: FormData
) {
  const actor =
    await getActor();

  const bookingDate =
    String(
      formData.get(
        "booking_date"
      ) ?? ""
    ).trim();

  const startTime =
    String(
      formData.get(
        "start_time"
      ) ?? ""
    ).trim();

  const endTime =
    String(
      formData.get(
        "end_time"
      ) ?? ""
    ).trim();

  if (
    !bookingDate ||
    !startTime ||
    !endTime
  ) {
    redirect(
      `/hub/lab/bookings/${bookingId}/edit?error=Date%2C%20start%20time%20and%20end%20time%20are%20required.`
    );
  }

  const {
    error,
  } =
    await actor.supabase.rpc(
      "update_instrument_booking",
      {
        p_booking_id:
          bookingId,

        p_booking_date:
          bookingDate,

        p_start_time:
          startTime,

        p_end_time:
          endTime,

        p_purpose:
          optionalText(
            formData.get(
              "purpose"
            )
          ),

        p_notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),
      }
    );

  if (error) {
    redirect(
      `/hub/lab/bookings/${bookingId}/edit?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath(
    "/hub/lab"
  );

  revalidatePath(
    "/hub/lab/schedule"
  );

  revalidatePath(
    `/hub/lab/bookings/${bookingId}`
  );

  redirect(
    `/hub/lab/bookings/${bookingId}?updated=1`
  );
}

/* ============================================================
   CANCEL BOOKING
============================================================ */

export async function cancelInstrumentBooking(
  bookingId: string
) {
  const actor =
    await getActor();

  const {
    error,
  } =
    await actor.supabase.rpc(
      "cancel_instrument_booking",
      {
        p_booking_id:
          bookingId,
      }
    );

  if (error) {
    throw new Error(
      error.message
    );
  }

  revalidatePath(
    "/hub/lab"
  );

  revalidatePath(
    "/hub/lab/schedule"
  );

  revalidatePath(
    `/hub/lab/bookings/${bookingId}`
  );

  redirect(
    "/hub/lab/schedule?cancelled=1"
  );
}

/* ============================================================
   SAVE TRAINING AUTHORIZATION
============================================================ */

export async function saveInstrumentAuthorization(
  instrumentId: string,
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireLabManager();

  const userId =
    String(
      formData.get(
        "user_id"
      ) ?? ""
    ).trim();

  if (!userId) {
    redirect(
      `/hub/lab/instruments/${instrumentId}/training?error=Please%20select%20a%20Hub%20user.`
    );
  }

  const status =
    String(
      formData.get(
        "status"
      ) ??
        "Authorized"
    );

  const allowedStatuses = [
    "Pending",
    "Authorized",
    "Expired",
    "Suspended",
  ];

  if (
    !allowedStatuses.includes(
      status
    )
  ) {
    throw new Error(
      "Invalid authorization status."
    );
  }

  const {
    error,
  } =
    await supabase
      .from(
        "instrument_authorizations"
      )
      .upsert(
        {
          instrument_id:
            instrumentId,

          user_id:
            userId,

          status,

          trained_by:
            optionalText(
              formData.get(
                "trained_by"
              )
            ),

          training_date:
            optionalDate(
              formData.get(
                "training_date"
              )
            ),

          expiry_date:
            optionalDate(
              formData.get(
                "expiry_date"
              )
            ),

          notes:
            optionalText(
              formData.get(
                "notes"
              )
            ),

          created_by:
            user.id,

          updated_by:
            user.id,
        },
        {
          onConflict:
            "instrument_id,user_id",
        }
      );

  if (error) {
    redirect(
      `/hub/lab/instruments/${instrumentId}/training?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  const instrumentName =
    await getInstrumentName(
      supabase,
      instrumentId
    );

  await notifyHubUser(
    supabase,
    userId,
    {
      type:
        "instrument_authorization_updated",

      title:
        status ===
        "Authorized"
          ? "Instrument access authorized"
          : "Instrument access updated",

      message:
        `${instrumentName}: authorization status is now ${status}.`,

      entityType:
        "instrument",

      entityId:
        instrumentId,

      actionUrl:
        `/hub/lab/instruments/${instrumentId}`,

      priority:
        status ===
          "Suspended" ||
        status ===
          "Expired"
          ? "High"
          : "Normal",
    }
  );

  revalidatePath(
    "/hub/lab"
  );

  revalidatePath(
    `/hub/lab/instruments/${instrumentId}`
  );

  revalidatePath(
    `/hub/lab/instruments/${instrumentId}/training`
  );

  redirect(
    `/hub/lab/instruments/${instrumentId}/training?saved=1`
  );
}

/* ============================================================
   CHANGE AUTHORIZATION STATUS
============================================================ */

export async function updateAuthorizationStatus(
  authorizationId: string,
  instrumentId: string,
  formData: FormData
) {
  const {
    supabase,
    user,
  } =
    await requireLabManager();

  const status =
    String(
      formData.get(
        "status"
      ) ?? ""
    );

  const allowedStatuses = [
    "Pending",
    "Authorized",
    "Expired",
    "Suspended",
  ];

  if (
    !allowedStatuses.includes(
      status
    )
  ) {
    throw new Error(
      "Invalid authorization status."
    );
  }

  const {
    data: authorization,
  } =
    await supabase
      .from(
        "instrument_authorizations"
      )
      .select(
        "user_id"
      )
      .eq(
        "id",
        authorizationId
      )
      .maybeSingle();

  const {
    error,
  } =
    await supabase
      .from(
        "instrument_authorizations"
      )
      .update({
        status,

        updated_by:
          user.id,
      })
      .eq(
        "id",
        authorizationId
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  if (
    authorization?.user_id
  ) {
    const instrumentName =
      await getInstrumentName(
        supabase,
        instrumentId
      );

    await notifyHubUser(
      supabase,
      authorization.user_id,
      {
        type:
          "instrument_authorization_updated",

        title:
          "Instrument access updated",

        message:
          `${instrumentName}: authorization status is now ${status}.`,

        entityType:
          "instrument",

        entityId:
          instrumentId,

        actionUrl:
          `/hub/lab/instruments/${instrumentId}`,

        priority:
          status ===
            "Suspended" ||
          status ===
            "Expired"
            ? "High"
            : "Normal",
      }
    );
  }

  revalidatePath(
    `/hub/lab/instruments/${instrumentId}`
  );

  revalidatePath(
    `/hub/lab/instruments/${instrumentId}/training`
  );
}

/* ============================================================
   REMOVE AUTHORIZATION
============================================================ */

export async function removeInstrumentAuthorization(
  authorizationId: string,
  instrumentId: string
) {
  const {
    supabase,
  } =
    await requireLabManager();

  const {
    data: authorization,
  } =
    await supabase
      .from(
        "instrument_authorizations"
      )
      .select(
        "user_id"
      )
      .eq(
        "id",
        authorizationId
      )
      .maybeSingle();

  const {
    error,
  } =
    await supabase
      .from(
        "instrument_authorizations"
      )
      .delete()
      .eq(
        "id",
        authorizationId
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  if (
    authorization?.user_id
  ) {
    const instrumentName =
      await getInstrumentName(
        supabase,
        instrumentId
      );

    await notifyHubUser(
      supabase,
      authorization.user_id,
      {
        type:
          "instrument_authorization_removed",

        title:
          "Instrument authorization removed",

        message:
          `Your authorization for ${instrumentName} has been removed.`,

        entityType:
          "instrument",

        entityId:
          instrumentId,

        actionUrl:
          `/hub/lab/instruments/${instrumentId}`,

        priority:
          "High",
      }
    );
  }

  revalidatePath(
    `/hub/lab/instruments/${instrumentId}`
  );

  revalidatePath(
    `/hub/lab/instruments/${instrumentId}/training`
  );
}