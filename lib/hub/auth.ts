import { redirect } from "next/navigation";

import { createClient } from "../supabase/server";

export type HubRole =
  | "admin"
  | "research_manager"
  | "lab_manager"
  | "student"
  | "member";

export type HubProfile = {
  id: string;
  fullName: string;
  email: string;
  role: HubRole;
  isActive: boolean;
  onboardingComplete: boolean;
  phone: string;
  shortBio: string;
  orcid: string;
  googleScholarUrl: string;
  linkedinUrl: string;
};

export type HubUserContext = {
  userId: string;
  profile: HubProfile;
  studentId: string | null;
};

/* ============================================================
   ROLE HELPERS
============================================================ */

export function isAdmin(role: HubRole) {
  return role === "admin";
}

export function isResearchManager(
  role: HubRole
) {
  return (
    role === "admin" ||
    role === "research_manager"
  );
}

export function isLabManager(
  role: HubRole
) {
  return (
    role === "admin" ||
    role === "lab_manager"
  );
}

export function isStudent(
  role: HubRole
) {
  return role === "student";
}

export function canManageResearch(
  role: HubRole
) {
  return (
    role === "admin" ||
    role === "research_manager"
  );
}

export function canManageInventory(
  role: HubRole
) {
  return (
    role === "admin" ||
    role === "lab_manager"
  );
}

export function roleLabel(
  role: HubRole
) {
  switch (role) {
    case "admin":
      return "Administrator";

    case "research_manager":
      return "Research Manager";

    case "lab_manager":
      return "Lab Manager";

    case "student":
      return "Student";

    default:
      return "Member";
  }
}

/* ============================================================
   GET CURRENT HUB USER
============================================================ */

export async function getHubUser(): Promise<HubUserContext> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const {
    data: profile,
    error,
  } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      email,
      role,
      is_active,
      onboarding_complete,
      phone,
      short_bio,
      orcid,
      google_scholar_url,
      linkedin_url
      `
    )
    .eq("id", user.id)
    .single();

  if (
    error ||
    !profile
  ) {
    await supabase.auth.signOut();
    redirect("/login");
  }

  if (!profile.is_active) {
    await supabase.auth.signOut();
    redirect(
      "/login?error=Your%20SenSys%20Hub%20account%20is%20not%20active."
    );
  }

  if (!profile.onboarding_complete) {
    redirect("/onboarding");
  }

  const role =
    profile.role as HubRole;

  let studentId: string | null =
    null;

  if (role === "student") {
    const { data: student } =
      await supabase
        .from("students")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

    studentId =
      student?.id ?? null;
  }

  return {
    userId: user.id,

    profile: {
      id: profile.id,

      fullName:
        profile.full_name?.trim() ||
        profile.email ||
        user.email ||
        "SenSys User",

      email:
        profile.email ||
        user.email ||
        "",

      role,

      isActive:
        Boolean(
          profile.is_active
        ),

      onboardingComplete:
        Boolean(
          profile.onboarding_complete
        ),

      phone:
        profile.phone ?? "",

      shortBio:
        profile.short_bio ?? "",

      orcid:
        profile.orcid ?? "",

      googleScholarUrl:
        profile.google_scholar_url ?? "",

      linkedinUrl:
        profile.linkedin_url ?? "",
    },

    studentId,
  };
}

/* ============================================================
   REQUIRE ADMIN
============================================================ */

export async function requireAdmin() {
  const context =
    await getHubUser();

  if (
    context.profile.role !==
    "admin"
  ) {
    redirect("/hub");
  }

  return context;
}

/* ============================================================
   REQUIRE RESEARCH MANAGER
============================================================ */

export async function requireResearchManager() {
  const context =
    await getHubUser();

  if (
    !canManageResearch(
      context.profile.role
    )
  ) {
    redirect("/hub");
  }

  return context;
}

/* ============================================================
   REQUIRE LAB MANAGER
============================================================ */

export async function requireLabManager() {
  const context =
    await getHubUser();

  if (
    !canManageInventory(
      context.profile.role
    )
  ) {
    redirect("/hub");
  }

  return context;
}
