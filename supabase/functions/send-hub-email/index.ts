import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type EmailOutboxRecord = {
  id: string;
  user_id: string | null;
  recipient_email: string;
  subject: string;
  html_body: string | null;
  text_body: string | null;
  notification_id: string | null;
  status: string;
  attempts: number;
};

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: EmailOutboxRecord;
};

Deno.serve(async (request) => {
  try {
    /* ======================================================
       METHOD
    ====================================================== */

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed",
        }),
        {
          status: 405,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    /* ======================================================
       WEBHOOK SECURITY
    ====================================================== */

    const expectedSecret =
      Deno.env.get(
        "EMAIL_WEBHOOK_SECRET"
      );

    const suppliedSecret =
      request.headers.get(
        "x-sensys-webhook-secret"
      );

    if (
      !expectedSecret ||
      suppliedSecret !==
        expectedSecret
    ) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
        }),
        {
          status: 401,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    /* ======================================================
       ENVIRONMENT
    ====================================================== */

    const supabaseUrl =
      Deno.env.get(
        "SUPABASE_URL"
      );

    const serviceRoleKey =
      Deno.env.get(
        "SUPABASE_SERVICE_ROLE_KEY"
      );

    const resendApiKey =
      Deno.env.get(
        "RESEND_API_KEY"
      );

    const fromEmail =
      Deno.env.get(
        "SENSYS_FROM_EMAIL"
      );

    const hubBaseUrl =
      Deno.env.get(
        "SENSYS_HUB_BASE_URL"
      );

    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !resendApiKey ||
      !fromEmail ||
      !hubBaseUrl
    ) {
      throw new Error(
        "Missing required environment variables."
      );
    }

    const supabase =
      createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            persistSession: false,
          },
        }
      );

    /* ======================================================
       WEBHOOK PAYLOAD
    ====================================================== */

    const payload =
      (await request.json()) as WebhookPayload;

    const email =
      payload.record;

    if (!email?.id) {
      throw new Error(
        "Email outbox record missing."
      );
    }

    /*
     * Database webhook should fire only on INSERT,
     * but keep this safeguard.
     */
    if (
      email.status !==
      "Pending"
    ) {
      return new Response(
        JSON.stringify({
          skipped: true,
          reason:
            "Email is not pending.",
        }),
        {
          status: 200,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    /* ======================================================
       MARK PROCESSING
    ====================================================== */

    await supabase
      .from("email_outbox")
      .update({
        status:
          "Processing",

        attempts:
          (email.attempts ??
            0) + 1,

        last_attempt_at:
          new Date().toISOString(),

        error_message:
          null,
      })
      .eq(
        "id",
        email.id
      );

    /* ======================================================
       ABSOLUTE HUB LINKS
    ====================================================== */

    const cleanBaseUrl =
      hubBaseUrl.replace(
        /\/$/,
        ""
      );

    let htmlBody =
      email.html_body ??
      `<p>${email.text_body ?? ""}</p>`;

    /*
     * create_hub_notification currently stores
     * relative Hub links such as:
     *
     * href="/hub/lab/bookings/..."
     *
     * Convert them to absolute URLs for email.
     */
    htmlBody =
      htmlBody.replaceAll(
        'href="/hub/',
        `href="${cleanBaseUrl}/hub/`
      );

    /* ======================================================
       SEND THROUGH RESEND
    ====================================================== */

    const resendResponse =
      await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${resendApiKey}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            from:
              fromEmail,

            to: [
              email.recipient_email,
            ],

            subject:
              email.subject,

            html:
              htmlBody,

            text:
              email.text_body ??
              undefined,
          }),
        }
      );

    const resendResult =
      await resendResponse.json();

    /* ======================================================
       FAILURE
    ====================================================== */

    if (
      !resendResponse.ok
    ) {
      const message =
        resendResult?.message ??
        resendResult?.error ??
        "Resend rejected the email.";

      await supabase
        .from(
          "email_outbox"
        )
        .update({
          status:
            "Failed",

          error_message:
            String(
              message
            ),

          last_attempt_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          email.id
        );

      return new Response(
        JSON.stringify({
          success: false,
          error:
            message,
        }),
        {
          status: 502,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    /* ======================================================
       SUCCESS
    ====================================================== */

    await supabase
      .from(
        "email_outbox"
      )
      .update({
        status:
          "Sent",

        provider_message_id:
          resendResult?.id ??
          null,

        sent_at:
          new Date().toISOString(),

        last_attempt_at:
          new Date().toISOString(),

        error_message:
          null,
      })
      .eq(
        "id",
        email.id
      );

    return new Response(
      JSON.stringify({
        success: true,
        email_id:
          email.id,
        provider_message_id:
          resendResult?.id ??
          null,
      }),
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "SenSys email error:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof
          Error
            ? error.message
            : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  }
});