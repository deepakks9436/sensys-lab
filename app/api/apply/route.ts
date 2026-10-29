import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
        160
      );

    const otherPosition =
      cleanText(
        body.otherPosition,
        160
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

    const citizenship =
      cleanText(
        body.citizenship,
        100
      );

    const residenceCountry =
      cleanText(
        body.residenceCountry,
        100
      );

    const canadaStatus =
      cleanText(
        body.canadaStatus,
        160
      );

    const needsCanadianAuthorization =
      cleanText(
        body.needsCanadianAuthorization,
        120
      );

    const ugDegree =
      cleanText(
        body.ugDegree,
        120
      );

    const ugField =
      cleanText(
        body.ugField,
        160
      );

    const ugUniversity =
      cleanText(
        body.ugUniversity,
        200
      );

    const ugYear =
      cleanText(
        body.ugYear,
        30
      );

    const ugGrade =
      cleanText(
        body.ugGrade,
        60
      );

    const ugScale =
      cleanText(
        body.ugScale,
        60
      );

    const mastersStatus =
      cleanText(
        body.mastersStatus,
        80
      );

    const phdStatus =
      cleanText(
        body.phdStatus,
        80
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
      !citizenship ||
      !residenceCountry ||
      !canadaStatus ||
      !needsCanadianAuthorization ||
      !ugDegree ||
      !ugField ||
      !ugUniversity ||
      !ugYear ||
      !ugGrade ||
      !ugScale ||
      !mastersStatus ||
      !phdStatus ||
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

    if (
      position === "Other" &&
      !otherPosition
    ) {
      return NextResponse.json(
        {
          error:
            "Please specify the position or opportunity you are interested in.",
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

    const otherResearchArea =
      cleanText(
        body.otherResearchArea,
        160
      );

    if (
      researchAreas.includes(
        "Other"
      ) &&
      !otherResearchArea
    ) {
      return NextResponse.json(
        {
          error:
            "Please specify your other research area.",
        },
        {
          status: 400,
        }
      );
    }

    const hasMasters =
      mastersStatus ===
        "Currently pursuing" ||
      mastersStatus ===
        "Completed";

    if (
      hasMasters &&
      (
        !cleanText(
          body.pgDegree,
          120
        ) ||
        !cleanText(
          body.pgField,
          160
        ) ||
        !cleanText(
          body.pgUniversity,
          200
        ) ||
        !cleanText(
          body.pgYear,
          30
        )
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete your Master's degree details.",
        },
        {
          status: 400,
        }
      );
    }

    const hasPhd =
      phdStatus ===
        "Currently pursuing" ||
      phdStatus ===
        "Completed";

    if (
      hasPhd &&
      (
        !cleanText(
          body.phdField,
          160
        ) ||
        !cleanText(
          body.phdUniversity,
          200
        ) ||
        !cleanText(
          body.phdYear,
          30
        )
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete your Ph.D. details.",
        },
        {
          status: 400,
        }
      );
    }

    const priorContact =
      cleanText(
        body.priorContact,
        40
      );

    const contactPerson =
      cleanText(
        body.contactPerson,
        160
      );

    if (
      priorContact ===
        "Yes" &&
      !contactPerson
    ) {
      return NextResponse.json(
        {
          error:
            "Please specify whom you previously contacted.",
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
      otherPosition,

      fullName,
      email,

      phone:
        cleanText(
          body.phone,
          60
        ),

      dateOfBirth:
        cleanText(
          body.dateOfBirth,
          40
        ),

      gender:
        cleanText(
          body.gender,
          100
        ),

      citizenship,
      residenceCountry,

      canadaStatus,
      needsCanadianAuthorization,

      institution,
      currentRole,

      ugDegree,
      ugField,
      ugUniversity,

      ugCountry:
        cleanText(
          body.ugCountry,
          100
        ),

      ugYear,
      ugGrade,
      ugScale,

      mastersStatus,

      pgDegree:
        cleanText(
          body.pgDegree,
          120
        ),

      pgField:
        cleanText(
          body.pgField,
          160
        ),

      pgUniversity:
        cleanText(
          body.pgUniversity,
          200
        ),

      pgCountry:
        cleanText(
          body.pgCountry,
          100
        ),

      pgYear:
        cleanText(
          body.pgYear,
          30
        ),

      pgGrade:
        cleanText(
          body.pgGrade,
          60
        ),

      pgScale:
        cleanText(
          body.pgScale,
          60
        ),

      phdStatus,

      phdField:
        cleanText(
          body.phdField,
          160
        ),

      phdUniversity:
        cleanText(
          body.phdUniversity,
          200
        ),

      phdCountry:
        cleanText(
          body.phdCountry,
          100
        ),

      phdYear:
        cleanText(
          body.phdYear,
          30
        ),

      phdThesisTitle:
        cleanText(
          body.phdThesisTitle,
          500
        ),

      phdSupervisor:
        cleanText(
          body.phdSupervisor,
          200
        ),

      researchAreas,
      otherResearchArea,

      researchInterests,
      whySensys,

      skills:
        cleanText(
          body.skills,
          1800
        ),

      publicationCount:
        cleanText(
          body.publicationCount,
          20
        ),

      selectedWorkUrl:
        cleanUrl(
          body.selectedWorkUrl
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

      startDate:
        cleanText(
          body.startDate,
          40
        ),

      preferredIntake:
        cleanText(
          body.preferredIntake,
          80
        ),

      umApplicationStatus:
        cleanText(
          body.umApplicationStatus,
          100
        ),

      umApplicantId:
        cleanText(
          body.umApplicantId,
          100
        ),

      priorContact,
      contactPerson,

      howHeard:
        cleanText(
          body.howHeard,
          120
        ),

      otherHowHeard:
        cleanText(
          body.otherHowHeard,
          160
        ),

      source:
        "sensys.ca",
    };

    const response =
      await fetch(
        webhookUrl,
        {
          method:
            "POST",

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