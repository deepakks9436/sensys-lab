import {
  NextResponse,
} from "next/server";

export const runtime =
  "nodejs";

function cleanText(
  value: unknown,
  maxLength: number
) {
  return String(
    value ?? ""
  )
    .trim()
    .slice(
      0,
      maxLength
    );
}

function cleanUrl(
  value: unknown
) {
  const text =
    cleanText(
      value,
      1000
    );

  if (!text) {
    return "";
  }

  try {
    const url =
      new URL(
        text
      );

    if (
      ![
        "http:",
        "https:",
      ].includes(
        url.protocol
      )
    ) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

export async function POST(
  request: Request
) {
  try {
    const webhookUrl =
      process.env
        .SENSYS_APPLICATION_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error(
        "SENSYS_APPLICATION_WEBHOOK_URL is not configured."
      );

      return NextResponse.json(
        {
          error:
            "Application service is temporarily unavailable.",
        },
        {
          status: 503,
        }
      );
    }

    const body =
      await request.json();

    if (
      cleanText(
        body.botField,
        200
      )
    ) {
      return NextResponse.json({
        ok: true,
      });
    }

    const position =
      cleanText(
        body.position,
        120
      );

    const fullName =
      cleanText(
        body.fullName,
        120
      );

    const email =
      cleanText(
        body.email,
        160
      ).toLowerCase();

    const institution =
      cleanText(
        body.institution,
        180
      );

    const currentRole =
      cleanText(
        body.currentRole,
        160
      );

    const researchInterests =
      cleanText(
        body.researchInterests,
        2500
      );

    const whySensys =
      cleanText(
        body.whySensys,
        1800
      );

    const cvUrl =
      cleanUrl(
        body.cvUrl
      );

    if (
      !position ||
      !fullName ||
      !email ||
      !institution ||
      !currentRole ||
      !researchInterests ||
      !whySensys ||
      !cvUrl
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        email
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const researchAreas =
      Array.isArray(
        body.researchAreas
      )
        ? body.researchAreas
            .map(
              (
                item: unknown
              ) =>
                cleanText(
                  item,
                  120
                )
            )
            .filter(
              Boolean
            )
            .slice(
              0,
              20
            )
        : [];

    if (
      researchAreas.length ===
      0
    ) {
      return NextResponse.json(
        {
          error:
            "Please select at least one research area.",
        },
        {
          status: 400,
        }
      );
    }

    const payload = {
      submittedAt:
        new Date()
          .toISOString(),

      position,
      fullName,
      email,

      phone:
        cleanText(
          body.phone,
          60
        ),

      institution,
      currentRole,

      country:
        cleanText(
          body.country,
          100
        ),

      researchAreas,

      researchInterests,
      whySensys,

      skills:
        cleanText(
          body.skills,
          1800
        ),

      startDate:
        cleanText(
          body.startDate,
          40
        ),

      cvUrl,

      additionalDocumentUrl:
        cleanUrl(
          body.additionalDocumentUrl
        ),

      scholarOrOrcid:
        cleanUrl(
          body.scholarOrOrcid
        ),

      linkedin:
        cleanUrl(
          body.linkedin
        ),

      website:
        cleanUrl(
          body.website
        ),

      howHeard:
        cleanText(
          body.howHeard,
          120
        ),

      source:
        "sensys.ca",
    };

    const response =
      await fetch(
        webhookUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              payload
            ),

          redirect:
            "follow",

          cache:
            "no-store",
        }
      );

    const responseText =
      await response.text();

    if (!response.ok) {
      console.error(
        "SenSys application webhook HTTP failure:",
        response.status,
        responseText
      );

      return NextResponse.json(
        {
          error:
            "We could not record your application. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    let googleResult:
      | {
          ok?: boolean;
          error?: string;
        }
      | null =
      null;

    try {
      googleResult =
        JSON.parse(
          responseText
        );
    } catch {
      console.error(
        "Apps Script returned non-JSON:",
        responseText
      );

      return NextResponse.json(
        {
          error:
            "Application storage returned an unexpected response.",
        },
        {
          status: 502,
        }
      );
    }

    if (
      googleResult?.ok !==
      true
    ) {
      console.error(
        "Apps Script application failure:",
        googleResult
      );

      return NextResponse.json(
        {
          error:
            googleResult?.error ||
            "We could not record your application.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "SenSys application submission error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "We could not record your application. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}