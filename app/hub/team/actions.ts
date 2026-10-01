"use server";

import {
  headers,
} from "next/headers";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import type {
  HubRole,
} from "../../../lib/hub/auth";

import {
  requireAdmin,
} from "../../../lib/hub/auth";

import {
  createAdminClient,
} from "../../../lib/supabase/admin";

const allowedRoles: HubRole[] = [
  "admin",
  "research_manager",
  "lab_manager",
  "student",
  "member",
];

function isHubRole(
  value: string
): value is HubRole {
  return allowedRoles.includes(
    value as HubRole
  );
}

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

function buildOrigin(
  host: string | null,
  forwardedProto: string | null
) {
  if (!host) {
    return "http://localhost:3000";
  }

  const protocol =
    forwardedProto ||
    (
      host.includes(
        "localhost"
      )
        ? "http"
        : "https"
    );

  return `${protocol}://${host}`;
}

async function getOrigin() {
  const requestHeaders =
    await headers();

  return buildOrigin(
    requestHeaders.get(
      "host"
    ),
    requestHeaders.get(
      "x-forwarded-proto"
    )
  );
}

async function audit(
  admin: ReturnType<
    typeof createAdminClient
  >,
  actorUserId: string,
  targetUserId: string,
  action: string,
  previousRole:
    | string
    | null,
  newRole:
    | string
    | null,
  details:
    | Record<
        string,
        unknown
      >
    | null = null
) {
  const { error } =
    await admin
      .from(
        "team_access_audit"
      )
      .insert({
        actor_user_id:
          actorUserId,

        target_user_id:
          targetUserId,

        action,

        previous_role:
          previousRole,

        new_role:
          newRole,

        details,
      });

  if (error) {
    console.error(
      "Team access audit error:",
      error.message
    );
  }
}

/* ============================================================
   INVITE TEAM MEMBER
============================================================ */

export async function inviteTeamMember(
  formData: FormData
) {
  const actor =
    await requireAdmin();

  const admin =
    createAdminClient();

  const fullName =
    String(
      formData.get(
        "full_name"
      ) ?? ""
    ).trim();

  const email =
    String(
      formData.get(
        "email"
      ) ?? ""
    )
      .trim()
      .toLowerCase();

  const role =
    String(
      formData.get(
        "role"
      ) ?? "student"
    );

  const programme =
    String(
      formData.get(
        "programme"
      ) ?? "Other"
    ).trim() ||
    "Other";

  const existingStudentId =
    optionalText(
      formData.get(
        "student_id"
      )
    );

  if (
    !fullName ||
    !email
  ) {
    redirect(
      "/hub/team/invite?error=Name%20and%20email%20are%20required."
    );
  }

  if (
    !isHubRole(role)
  ) {
    redirect(
      "/hub/team/invite?error=Invalid%20Hub%20role."
    );
  }

  const {
    data: existingProfile,
  } = await admin
    .from("profiles")
    .select(
      "id, email"
    )
    .ilike(
      "email",
      email
    )
    .maybeSingle();

  if (existingProfile) {
    redirect(
      `/hub/team/invite?error=${encodeURIComponent(
        "A SenSys Hub account already exists for this email."
      )}`
    );
  }

  if (
    existingStudentId &&
    role !== "student"
  ) {
    redirect(
      `/hub/team/invite?error=${encodeURIComponent(
        "A linked graduate-researcher profile must be invited with the Student role."
      )}`
    );
  }

  if (existingStudentId) {
    const {
      data: existingStudent,
    } = await admin
      .from("students")
      .select(
        "id, user_id, full_name"
      )
      .eq(
        "id",
        existingStudentId
      )
      .maybeSingle();

    if (!existingStudent) {
      redirect(
        "/hub/team/invite?error=Researcher%20record%20not%20found."
      );
    }

    if (
      existingStudent.user_id
    ) {
      redirect(
        "/hub/team/invite?error=This%20researcher%20is%20already%20linked%20to%20a%20Hub%20account."
      );
    }
  }

  const origin =
    await getOrigin();

  const {
    data: inviteData,
    error: inviteError,
  } =
    await admin.auth.admin
      .inviteUserByEmail(
        email,
        {
          data: {
            full_name:
              fullName,

            hub_role:
              role,
          },

          /*
           * The branded Invite template supplied in README uses
           * /auth/confirm and the token hash. This redirect remains
           * useful as the intended post-verification destination.
           */
          redirectTo:
            `${origin}/reset-password?mode=invite`,
        }
      );

  if (
    inviteError ||
    !inviteData.user
  ) {
    redirect(
      `/hub/team/invite?error=${encodeURIComponent(
        inviteError?.message ??
        "Unable to send the invitation."
      )}`
    );
  }

  const invitedUser =
    inviteData.user;

  const {
    error: profileError,
  } = await admin
    .from("profiles")
    .upsert(
      {
        id:
          invitedUser.id,

        full_name:
          fullName,

        email,

        role,

        is_active:
          true,

        onboarding_complete:
          false,

        invited_at:
          new Date()
            .toISOString(),
      },
      {
        onConflict:
          "id",
      }
    );

  if (profileError) {
    console.error(
      "Unable to prepare invited profile:",
      profileError.message
    );

    await admin.auth.admin
      .deleteUser(
        invitedUser.id
      );

    redirect(
      `/hub/team/invite?error=${encodeURIComponent(
        "The authentication invitation was created, but the SenSys profile could not be prepared. The partial invitation was rolled back."
      )}`
    );
  }

  if (
    role === "student"
  ) {
    if (
      existingStudentId
    ) {
      const {
        error,
      } = await admin
        .from(
          "students"
        )
        .update({
          user_id:
            invitedUser.id,

          full_name:
            fullName,

          updated_by:
            actor.userId,
        })
        .eq(
          "id",
          existingStudentId
        );

      if (error) {
        console.error(
          "Unable to link researcher:",
          error.message
        );

        redirect(
          `/hub/team?error=${encodeURIComponent(
            "Invitation sent, but the existing researcher profile could not be linked. Please contact the Hub administrator."
          )}`
        );
      }
    } else {
      const {
        error,
      } = await admin
        .from(
          "students"
        )
        .insert({
          user_id:
            invitedUser.id,

          full_name:
            fullName,

          programme,

          created_by:
            actor.userId,

          updated_by:
            actor.userId,
        });

      if (error) {
        console.error(
          "Unable to create researcher record:",
          error.message
        );

        redirect(
          `/hub/team?error=${encodeURIComponent(
            "Invitation sent, but the researcher record could not be created. Please add or link it from People."
          )}`
        );
      }
    }
  }

  await admin
    .from(
      "notification_preferences"
    )
    .upsert(
      {
        user_id:
          invitedUser.id,
      },
      {
        onConflict:
          "user_id",
      }
    );

  await audit(
    admin,
    actor.userId,
    invitedUser.id,
    "invite",
    null,
    role,
    {
      email,
      full_name:
        fullName,
      linked_student_id:
        existingStudentId,
    }
  );

  revalidatePath(
    "/hub/team"
  );

  revalidatePath(
    "/hub/students"
  );

  redirect(
    `/hub/team?message=${encodeURIComponent(
      `Invitation sent to ${email}.`
    )}`
  );
}

/* ============================================================
   UPDATE ROLE / ACCESS
============================================================ */

export async function updateTeamAccess(
  targetUserId: string,
  formData: FormData
) {
  const actor =
    await requireAdmin();

  const admin =
    createAdminClient();

  const role =
    String(
      formData.get(
        "role"
      ) ?? ""
    );

  const isActive =
    formData.get(
      "is_active"
    ) === "on";

  if (
    !isHubRole(role)
  ) {
    redirect(
      "/hub/team?error=Invalid%20Hub%20role."
    );
  }

  const {
    data: current,
    error: readError,
  } = await admin
    .from("profiles")
    .select(
      "id, full_name, email, role, is_active"
    )
    .eq(
      "id",
      targetUserId
    )
    .maybeSingle();

  if (
    readError ||
    !current
  ) {
    redirect(
      "/hub/team?error=Hub%20account%20not%20found."
    );
  }

  const roleChanged =
    current.role !== role;

  const activeChanged =
    Boolean(
      current.is_active
    ) !== isActive;

  if (
    actor.userId ===
      targetUserId &&
    (
      role !== "admin" ||
      !isActive
    )
  ) {
    redirect(
      `/hub/team?error=${encodeURIComponent(
        "You cannot demote or deactivate your own administrator account."
      )}`
    );
  }

  if (
    current.role === "admin" &&
    current.is_active &&
    (
      role !== "admin" ||
      !isActive
    )
  ) {
    const {
      count,
    } = await admin
      .from("profiles")
      .select(
        "id",
        {
          count:
            "exact",
          head:
            true,
        }
      )
      .eq(
        "role",
        "admin"
      )
      .eq(
        "is_active",
        true
      );

    if (
      (count ?? 0) <= 1
    ) {
      redirect(
        `/hub/team?error=${encodeURIComponent(
          "The last active administrator cannot be demoted or deactivated."
        )}`
      );
    }
  }

  const {
    error,
  } = await admin
    .from("profiles")
    .update({
      role,
      is_active:
        isActive,
    })
    .eq(
      "id",
      targetUserId
    );

  if (error) {
    redirect(
      `/hub/team?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  /*
   * If an existing Hub member is newly made a Student and does not
   * yet have a researcher row, create the minimum linked record.
   */
  if (
    role === "student"
  ) {
    const {
      data: linkedStudent,
    } = await admin
      .from("students")
      .select("id")
      .eq(
        "user_id",
        targetUserId
      )
      .maybeSingle();

    if (!linkedStudent) {
      const {
        error: studentError,
      } = await admin
        .from("students")
        .insert({
          user_id:
            targetUserId,

          full_name:
            current.full_name ??
            current.email,

          programme:
            "Other",

          created_by:
            actor.userId,

          updated_by:
            actor.userId,
        });

      if (studentError) {
        console.error(
          "Unable to create linked student after role change:",
          studentError.message
        );
      }
    }
  }

  if (
    roleChanged ||
    activeChanged
  ) {
    await audit(
      admin,
      actor.userId,
      targetUserId,
      activeChanged
        ? "access_update"
        : "role_update",
      current.role,
      role,
      {
        previous_active:
          Boolean(
            current.is_active
          ),

        new_active:
          isActive,
      }
    );
  }

  revalidatePath(
    "/hub/team"
  );

  revalidatePath(
    "/hub"
  );

  redirect(
    "/hub/team?message=Access%20updated%20successfully."
  );
}
