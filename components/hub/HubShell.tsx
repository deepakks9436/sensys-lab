"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  logout,
} from "../../app/logout/actions";

import {
  createClient,
} from "../../lib/supabase/client";

type HubRole =
  | "admin"
  | "research_manager"
  | "lab_manager"
  | "student"
  | "member";

type HubShellProps = {
  children: ReactNode;

  profile: {
    fullName: string;
    email: string;
    role: HubRole;
  };

  studentId?:
    | string
    | null;
};

type NavItem = {
  label: string;
  href: string;
  icon: string;
  comingSoon?: boolean;
};

function roleLabel(
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

function initials(
  name: string,
  email: string
) {
  const source =
    name?.trim() ||
    email?.trim() ||
    "SS";

  const words =
    source
      .split(
        /\s+/
      )
      .filter(
        Boolean
      );

  if (
    words.length >=
    2
  ) {
    return (
      words[0][0] +
      words[
        words.length -
          1
      ][0]
    ).toUpperCase();
  }

  return source
    .slice(
      0,
      2
    )
    .toUpperCase();
}

export default function HubShell({
  children,
  profile,
  studentId,
}: HubShellProps) {
  const pathname =
    usePathname();

  const [
    mobileOpen,
    setMobileOpen,
  ] =
    useState(
      false
    );

  const [
    accountOpen,
    setAccountOpen,
  ] =
    useState(
      false
    );

  const [
    unreadNotifications,
    setUnreadNotifications,
  ] =
    useState(
      0
    );

  const role =
    profile.role;

  /* ========================================================
     NOTIFICATION COUNT
  ======================================================== */

  useEffect(
    () => {
      const supabase =
        createClient();

      let mounted =
        true;

      async function loadUnreadCount() {
        const {
          count,
          error,
        } =
          await supabase
            .from(
              "notifications"
            )
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
              "is_read",
              false
            );

        if (
          !error &&
          mounted
        ) {
          setUnreadNotifications(
            count ??
              0
          );
        }
      }

      loadUnreadCount();

      const timer =
        window.setInterval(
          loadUnreadCount,
          30000
        );

      function handleVisibility() {
        if (
          document.visibilityState ===
          "visible"
        ) {
          loadUnreadCount();
        }
      }

      document.addEventListener(
        "visibilitychange",
        handleVisibility
      );

      return () => {
        mounted =
          false;

        window.clearInterval(
          timer
        );

        document.removeEventListener(
          "visibilitychange",
          handleVisibility
        );
      };
    },
    [
      pathname,
    ]
  );

  /* ========================================================
     ADMIN NAV
  ======================================================== */

  const adminNav: NavItem[] =
    [
      {
        label:
          "Dashboard",
        href:
          "/hub",
        icon:
          "⌂",
      },
      {
        label:
          "People",
        href:
          "/hub/students",
        icon:
          "◎",
      },
      {
        label:
          "Research",
        href:
          "#",
        icon:
          "◇",
        comingSoon:
          true,
      },
      {
        label:
          "Research Reviews",
        href:
          "/hub/meetings",
        icon:
          "▣",
      },
      {
        label:
          "Actions",
        href:
          "/hub/actions",
        icon:
          "✓",
      },
      {
        label:
          "Lab",
        href:
          "/hub/lab",
        icon:
          "⊙",
      },
      {
        label:
          "Inventory",
        href:
          "/hub/inventory",
        icon:
          "≡",
      },
      {
        label:
          "Resources",
        href:
          "#",
        icon:
          "▫",
        comingSoon:
          true,
      },
    ];

  /* ========================================================
     RESEARCH MANAGER NAV
  ======================================================== */

  const researchManagerNav: NavItem[] =
    [
      {
        label:
          "Dashboard",
        href:
          "/hub",
        icon:
          "⌂",
      },
      {
        label:
          "People",
        href:
          "/hub/students",
        icon:
          "◎",
      },
      {
        label:
          "Research",
        href:
          "#",
        icon:
          "◇",
        comingSoon:
          true,
      },
      {
        label:
          "Research Reviews",
        href:
          "/hub/meetings",
        icon:
          "▣",
      },
      {
        label:
          "Actions",
        href:
          "/hub/actions",
        icon:
          "✓",
      },
      {
        label:
          "Lab",
        href:
          "/hub/lab",
        icon:
          "⊙",
      },
      {
        label:
          "Inventory",
        href:
          "/hub/inventory",
        icon:
          "≡",
      },
      {
        label:
          "Resources",
        href:
          "#",
        icon:
          "▫",
        comingSoon:
          true,
      },
    ];

  /* ========================================================
     LAB MANAGER NAV
  ======================================================== */

  const labManagerNav: NavItem[] =
    [
      {
        label:
          "Dashboard",
        href:
          "/hub",
        icon:
          "⌂",
      },
      {
        label:
          "Lab",
        href:
          "/hub/lab",
        icon:
          "⊙",
      },
      {
        label:
          "Inventory",
        href:
          "/hub/inventory",
        icon:
          "≡",
      },
      {
        label:
          "Research Reviews",
        href:
          "/hub/meetings",
        icon:
          "▣",
      },
      {
        label:
          "Actions",
        href:
          "/hub/actions",
        icon:
          "✓",
      },
      {
        label:
          "Resources",
        href:
          "#",
        icon:
          "▫",
        comingSoon:
          true,
      },
    ];

  /* ========================================================
     STUDENT NAV
  ======================================================== */

  const studentNav: NavItem[] =
    studentId
      ? [
          {
            label:
              "My Research",
            href:
              `/hub/students/${studentId}`,
            icon:
              "◎",
          },
          {
            label:
              "Research Check-in",
            href:
              `/hub/students/${studentId}/weekly/new`,
            icon:
              "▣",
          },
          {
            label:
              "My Actions",
            href:
              "/hub/actions",
            icon:
              "✓",
          },
          {
            label:
              "Research Reviews",
            href:
              "/hub/meetings",
            icon:
              "◫",
          },
          {
            label:
              "Lab & Instruments",
            href:
              "/hub/lab",
            icon:
              "⊙",
          },
          {
            label:
              "Resources",
            href:
              "#",
            icon:
              "▫",
            comingSoon:
              true,
          },
        ]
      : [
          {
            label:
              "My Research",
            href:
              "/hub",
            icon:
              "◎",
          },
          {
            label:
              "My Actions",
            href:
              "/hub/actions",
            icon:
              "✓",
          },
          {
            label:
              "Research Reviews",
            href:
              "/hub/meetings",
            icon:
              "◫",
          },
          {
            label:
              "Lab & Instruments",
            href:
              "/hub/lab",
            icon:
              "⊙",
          },
          {
            label:
              "Resources",
            href:
              "#",
            icon:
              "▫",
            comingSoon:
              true,
          },
        ];

  /* ========================================================
     MEMBER NAV
  ======================================================== */

  const memberNav: NavItem[] =
    [
      {
        label:
          "Dashboard",
        href:
          "/hub",
        icon:
          "⌂",
      },
      {
        label:
          "Lab",
        href:
          "/hub/lab",
        icon:
          "⊙",
      },
      {
        label:
          "Inventory",
        href:
          "/hub/inventory",
        icon:
          "≡",
      },
      {
        label:
          "Resources",
        href:
          "#",
        icon:
          "▫",
        comingSoon:
          true,
      },
    ];

  /* ========================================================
     ROLE NAV
  ======================================================== */

  let navItems =
    memberNav;

  if (
    role ===
    "admin"
  ) {
    navItems =
      adminNav;
  }

  if (
    role ===
    "research_manager"
  ) {
    navItems =
      researchManagerNav;
  }

  if (
    role ===
    "lab_manager"
  ) {
    navItems =
      labManagerNav;
  }

  if (
    role ===
    "student"
  ) {
    navItems =
      studentNav;
  }

  /* ========================================================
     ACTIVE NAV
  ======================================================== */

  function isActive(
    item: NavItem
  ) {
    if (
      item.href ===
        "#" ||
      item.comingSoon
    ) {
      return false;
    }

    if (
      item.href ===
      "/hub"
    ) {
      return (
        pathname ===
        "/hub"
      );
    }

    if (
      role ===
        "student" &&
      studentId &&
      item.label ===
        "My Research"
    ) {
      return (
        pathname.startsWith(
          `/hub/students/${studentId}`
        ) &&
        !pathname.includes(
          "/weekly/"
        )
      );
    }

    if (
      role ===
        "student" &&
      studentId &&
      item.label ===
        "Research Check-in"
    ) {
      return pathname.startsWith(
        `/hub/students/${studentId}/weekly`
      );
    }

    if (
      role ===
        "student" &&
      item.label ===
        "My Actions"
    ) {
      return pathname.startsWith(
        "/hub/actions"
      );
    }

    if (
      role ===
        "student" &&
      item.label ===
        "Research Reviews"
    ) {
      return pathname.startsWith(
        "/hub/meetings"
      );
    }

    if (
      role ===
        "student" &&
      item.label ===
        "Lab & Instruments"
    ) {
      return pathname.startsWith(
        "/hub/lab"
      );
    }

    return pathname.startsWith(
      item.href
    );
  }

  /* ========================================================
     CURRENT AREA
  ======================================================== */

  let currentArea =
    "Workspace";

  if (
    pathname.startsWith(
      "/hub/notifications"
    )
  ) {
    currentArea =
      "Notifications";
  } else if (
    role ===
    "student"
  ) {
    if (
      pathname.startsWith(
        "/hub/actions"
      )
    ) {
      currentArea =
        "My Actions";
    } else if (
      pathname.startsWith(
        "/hub/meetings"
      )
    ) {
      currentArea =
        "Research Reviews";
    } else if (
      pathname.startsWith(
        "/hub/lab"
      )
    ) {
      currentArea =
        "Lab & Instruments";
    } else if (
      pathname.includes(
        "/weekly/"
      )
    ) {
      currentArea =
        "Research Check-in";
    } else {
      currentArea =
        "My Research";
    }
  } else if (
    pathname.startsWith(
      "/hub/students"
    )
  ) {
    currentArea =
      "People";
  } else if (
    pathname.startsWith(
      "/hub/lab"
    )
  ) {
    currentArea =
      "Lab";
  } else if (
    pathname.startsWith(
      "/hub/inventory"
    )
  ) {
    currentArea =
      "Inventory";
  } else if (
    pathname.startsWith(
      "/hub/meetings"
    )
  ) {
    currentArea =
      "Research Reviews";
  } else if (
    pathname.startsWith(
      "/hub/actions"
    )
  ) {
    currentArea =
      "Actions";
  } else if (
    pathname ===
    "/hub"
  ) {
    currentArea =
      "Dashboard";
  }

  const userInitials =
    initials(
      profile.fullName,
      profile.email
    );

  /* ========================================================
     SIDEBAR CONTENT
  ======================================================== */

  const sidebarContent = (
    <>
      <div className="px-4 pt-5">
        <p className="px-2 text-[8px] font-bold uppercase tracking-[0.24em] text-[#A0968D]">
          Workspace
        </p>

        <nav className="mt-4 space-y-1.5">
          {navItems.map(
            (
              item
            ) => {
              const active =
                isActive(
                  item
                );

              if (
                item.comingSoon
              ) {
                return (
                  <div
                    key={
                      item.label
                    }
                    className="flex cursor-default items-center gap-3 rounded-xl px-3 py-3 text-[#A69D95]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0ECE7] text-[10px]">
                      {
                        item.icon
                      }
                    </span>

                    <span className="text-sm font-semibold">
                      {
                        item.label
                      }
                    </span>

                    <span className="ml-auto text-[7px] font-bold uppercase tracking-[0.2em] text-[#B2A89F]">
                      Soon
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={
                    item.label
                  }
                  href={
                    item.href
                  }
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                    active
                      ? "bg-[#4668A9] text-white"
                      : "text-[#211C18] hover:bg-[#F1EDE8]"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] ${
                      active
                        ? "bg-white/15"
                        : "bg-[#F0ECE7]"
                    }`}
                  >
                    {
                      item.icon
                    }
                  </span>

                  <span className="text-sm font-semibold">
                    {
                      item.label
                    }
                  </span>
                </Link>
              );
            }
          )}
        </nav>
      </div>

      {/* QUICK LINKS */}

      {role !==
        "student" && (
        <div className="mx-4 mt-8 border-t border-[#DED8D2] pt-6">
          <p className="px-2 text-[8px] font-bold uppercase tracking-[0.24em] text-[#A0968D]">
            SenSys
          </p>

          <div className="mt-4 space-y-3 px-2">
            {(role ===
              "admin" ||
              role ===
                "research_manager") && (
              <>
                <Link
                  href="/hub/students"
                  className="block text-xs text-[#332D28] hover:text-[#385E9D]"
                >
                  Graduate researchers
                </Link>

                <Link
                  href="/hub/meetings"
                  className="block text-xs text-[#332D28] hover:text-[#385E9D]"
                >
                  Research reviews
                </Link>

                <Link
                  href="/hub/actions"
                  className="block text-xs text-[#332D28] hover:text-[#385E9D]"
                >
                  Open actions
                </Link>
              </>
            )}

            <Link
              href="/hub/lab"
              className="block text-xs text-[#332D28] hover:text-[#385E9D]"
            >
              Lab & instruments
            </Link>

            <Link
              href="/hub/lab/schedule"
              className="block text-xs text-[#332D28] hover:text-[#385E9D]"
            >
              Instrument schedule
            </Link>

            <Link
              href="/hub/inventory"
              className="block text-xs text-[#332D28] hover:text-[#385E9D]"
            >
              Inventory
            </Link>

            <Link
              href="/hub/notifications"
              className="flex items-center justify-between text-xs text-[#332D28] hover:text-[#385E9D]"
            >
              <span>
                Notifications
              </span>

              {unreadNotifications >
                0 && (
                <span className="rounded-full bg-[#385E9D] px-2 py-0.5 text-[8px] font-bold text-white">
                  {unreadNotifications >
                  99
                    ? "99+"
                    : unreadNotifications}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}

      {/* SECURE WORKSPACE */}

      <div className="mx-4 mb-5 mt-auto rounded-2xl bg-[#203650] p-5 text-white">
        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#F2A900]">
          Secure Workspace
        </p>

        <p className="mt-2 text-sm font-semibold">
          SenSys Hub v1.1
        </p>

        <p className="mt-2 text-[10px] leading-5 text-white/65">
          {role ===
          "student"
            ? "Your research projects, check-ins, research reviews, actions, instruments and notifications."
            : "Research projects, reviews, actions, instruments, notifications, inventory and laboratory management."}
        </p>
      </div>
    </>
  );

  /* ========================================================
     PAGE
  ======================================================== */

  return (
    <div className="min-h-screen bg-[#F6F4F1] text-[#201B17]">
      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#DDD6CF] border-t-[3px] border-[#F2A900] bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center px-4 md:px-6">
          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#DDD6CF] lg:hidden"
            aria-label="Open navigation"
          >
            ☰
          </button>

          {/* BRAND */}

          <Link
            href="/hub"
            className="flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#385E9D]">
              <div className="h-3 w-3 rounded-full bg-[#F2A900]" />
            </div>

            <div>
              <p className="text-[17px] font-medium tracking-[-0.02em]">
                SenSys Hub
              </p>

              <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.24em] text-[#91877E]">
                Internal Research
                Workspace
              </p>
            </div>
          </Link>

          <div className="ml-5 hidden border-l border-[#DED8D2] pl-5 sm:block">
            <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#B1A79E]">
              Current Area
            </p>

            <p className="mt-1 text-xs text-[#6D655F]">
              {
                currentArea
              }
            </p>
          </div>

          {/* RIGHT */}

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-[#DDD6CF] bg-white px-4 py-2 text-[11px] font-semibold sm:inline-flex"
            >
              Public Website ↗
            </Link>

            <Link
              href="/hub/notifications"
              aria-label={`Notifications${
                unreadNotifications >
                0
                  ? `, ${unreadNotifications} unread`
                  : ""
              }`}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition ${
                pathname.startsWith(
                  "/hub/notifications"
                )
                  ? "border-[#385E9D] bg-[#EEF2F8]"
                  : "border-[#DDD6CF] bg-white hover:border-[#385E9D]"
              }`}
            >
              <span
                className="text-[17px] leading-none"
                aria-hidden="true"
              >
                🔔
              </span>

              {unreadNotifications >
                0 && (
                <span className="absolute -right-1 -top-1 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#A23B35] px-1 text-[8px] font-bold leading-none text-white">
                  {unreadNotifications >
                  99
                    ? "99+"
                    : unreadNotifications}
                </span>
              )}
            </Link>

            {/* ACCOUNT */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setAccountOpen(
                    !accountOpen
                  )
                }
                className="flex items-center gap-3 rounded-full border border-[#DDD6CF] bg-white py-1.5 pl-1.5 pr-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#385E9D] text-[10px] font-bold text-white">
                  {
                    userInitials
                  }
                </div>

                <div className="hidden text-left md:block">
                  <p className="max-w-[190px] truncate text-[10px] font-semibold">
                    {
                      profile.fullName
                    }
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#8B827A]">
                    {roleLabel(
                      role
                    )}
                  </p>
                </div>

                <span className="text-[9px] text-[#8B827A]">
                  ⌄
                </span>
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-[260px] border border-[#DDD6CF] bg-white p-4 shadow-lg">
                  <p className="text-xs font-semibold">
                    {
                      profile.fullName
                    }
                  </p>

                  <p className="mt-1 break-all text-[10px] text-[#837A72]">
                    {
                      profile.email
                    }
                  </p>

                  <div className="mt-3 inline-flex rounded-full bg-[#EEF2F8] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#385E9D]">
                    {roleLabel(
                      role
                    )}
                  </div>

                  <div className="mt-4 border-t border-[#EEE9E4] pt-2">
                    <Link
                      href="/hub/notifications"
                      onClick={() =>
                        setAccountOpen(
                          false
                        )
                      }
                      className="flex items-center justify-between rounded-lg px-2 py-2.5 text-xs font-semibold text-[#385E9D] transition hover:bg-[#F4F6F9]"
                    >
                      <span>
                        Notifications
                      </span>

                      {unreadNotifications >
                        0 && (
                        <span className="rounded-full bg-[#385E9D] px-2 py-0.5 text-[8px] font-bold text-white">
                          {
                            unreadNotifications
                          }
                        </span>
                      )}
                    </Link>
                  </div>

                  <div className="mt-1 border-t border-[#EEE9E4] pt-2">
                    <Link
                      href="/reset-password?mode=change"
                      onClick={() =>
                        setAccountOpen(
                          false
                        )
                      }
                      className="block w-full rounded-lg px-2 py-2.5 text-left text-xs font-semibold text-[#385E9D] transition hover:bg-[#F4F6F9]"
                    >
                      Change password
                    </Link>
                  </div>

                  <div className="mt-1 border-t border-[#EEE9E4] pt-2">
                    <form
                      action={
                        logout
                      }
                    >
                      <button
                        type="submit"
                        className="w-full rounded-lg px-2 py-2.5 text-left text-xs font-semibold text-[#A23B35] transition hover:bg-[#FBF1F0]"
                      >
                        Sign out
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close navigation"
            type="button"
            onClick={() =>
              setMobileOpen(
                false
              )
            }
            className="absolute inset-0 bg-black/20"
          />

          <aside className="relative flex h-full w-[285px] flex-col overflow-y-auto bg-[#FAF9F7] pt-[75px] shadow-xl">
            {
              sidebarContent
            }
          </aside>
        </div>
      )}

      {/* MAIN BODY */}

      <div className="mx-auto flex max-w-[1500px]">
        <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-[245px] shrink-0 flex-col overflow-y-auto border-r border-[#DDD6CF] bg-[#FAF9F7] lg:flex">
          {
            sidebarContent
          }
        </aside>

        <div className="min-w-0 flex-1">
          {
            children
          }
        </div>
      </div>
    </div>
  );
}