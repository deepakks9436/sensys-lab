import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              supabaseResponse.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  /*
   * Validate the currently authenticated user.
   *
   * If nobody is signed in, user will simply be null.
   * This avoids the getClaims() null-destructuring error.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  /*
   * Protect everything under /hub.
   */
  if (
    pathname.startsWith("/hub") &&
    !user
  ) {
    const url = request.nextUrl.clone();

    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  /*
   * If already logged in, don't show login again.
   */
  if (
    pathname === "/login" &&
    user
  ) {
    const url = request.nextUrl.clone();

    url.pathname = "/hub";

    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}