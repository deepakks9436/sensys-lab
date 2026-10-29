"use client";

import { FormEvent, useState } from "react";

const positions = [
  "Ph.D. Researcher",
  "M.Sc. Researcher",
  "M.Eng. Student",
  "Postdoctoral Fellow",
  "Undergraduate Researcher",
  "Internship",
  "Research Engineer / Technical Staff",
  "Project Manager / Research Operations",
  "Other",
];

const researchAreas = [
  "Intelligent Microsystems",
  "Biointegrated Systems",
  "Intelligent Diagnostics",
  "Agri & Environmental Intelligence",
  "Microfluidics / Lab-on-Chip",
  "Electrochemical Sensing",
  "Optical Sensing",
  "Wearable / Implantable Devices",
  "Flexible Electronics",
  "Advanced Materials",
  "Embedded Systems / Instrumentation",
  "AI / Data Analytics",
  "Water / Soil / Food Sensing",
  "Other",
];

type SubmitState =
  | "idle"
  | "submitting"
  | "success"
  | "error";

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
      {children}

      {required && (
        <span className="ml-1 text-[#A23B35]">*</span>
      )}
    </label>
  );
}

const inputClass =
  "w-full rounded-none border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground-muted)]/60 focus:border-[var(--um-blue)] focus:ring-2 focus:ring-[var(--um-blue)]/10";

export default function JoinApplicationForm() {
  const [submitState, setSubmitState] =
    useState<SubmitState>("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [position, setPosition] =
    useState("");

  const [mastersStatus, setMastersStatus] =
    useState("");

  const [phdStatus, setPhdStatus] =
    useState("");

  const [howHeard, setHowHeard] =
    useState("");

  const [
    researchOtherSelected,
    setResearchOtherSelected,
  ] = useState(false);

  const [
    umApplicationStatus,
    setUmApplicationStatus,
  ] = useState("");

  const [
    priorContact,
    setPriorContact,
  ] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    const payload = {
      position:
        String(
          formData.get("position") ?? ""
        ).trim(),

      otherPosition:
        String(
          formData.get("otherPosition") ?? ""
        ).trim(),

      fullName:
        String(
          formData.get("fullName") ?? ""
        ).trim(),

      email:
        String(
          formData.get("email") ?? ""
        ).trim(),

      phone:
        String(
          formData.get("phone") ?? ""
        ).trim(),

      dateOfBirth:
        String(
          formData.get("dateOfBirth") ?? ""
        ).trim(),

      gender:
        String(
          formData.get("gender") ?? ""
        ).trim(),

      citizenship:
        String(
          formData.get("citizenship") ?? ""
        ).trim(),

      residenceCountry:
        String(
          formData.get("residenceCountry") ?? ""
        ).trim(),

      canadaStatus:
        String(
          formData.get("canadaStatus") ?? ""
        ).trim(),

      needsCanadianAuthorization:
        String(
          formData.get(
            "needsCanadianAuthorization"
          ) ?? ""
        ).trim(),

      institution:
        String(
          formData.get("institution") ?? ""
        ).trim(),

      currentRole:
        String(
          formData.get("currentRole") ?? ""
        ).trim(),

      ugDegree:
        String(
          formData.get("ugDegree") ?? ""
        ).trim(),

      ugField:
        String(
          formData.get("ugField") ?? ""
        ).trim(),

      ugUniversity:
        String(
          formData.get("ugUniversity") ?? ""
        ).trim(),

      ugCountry:
        String(
          formData.get("ugCountry") ?? ""
        ).trim(),

      ugYear:
        String(
          formData.get("ugYear") ?? ""
        ).trim(),

      ugGrade:
        String(
          formData.get("ugGrade") ?? ""
        ).trim(),

      ugScale:
        String(
          formData.get("ugScale") ?? ""
        ).trim(),

      mastersStatus:
        String(
          formData.get("mastersStatus") ?? ""
        ).trim(),

      pgDegree:
        String(
          formData.get("pgDegree") ?? ""
        ).trim(),

      pgField:
        String(
          formData.get("pgField") ?? ""
        ).trim(),

      pgUniversity:
        String(
          formData.get("pgUniversity") ?? ""
        ).trim(),

      pgCountry:
        String(
          formData.get("pgCountry") ?? ""
        ).trim(),

      pgYear:
        String(
          formData.get("pgYear") ?? ""
        ).trim(),

      pgGrade:
        String(
          formData.get("pgGrade") ?? ""
        ).trim(),

      pgScale:
        String(
          formData.get("pgScale") ?? ""
        ).trim(),

      phdStatus:
        String(
          formData.get("phdStatus") ?? ""
        ).trim(),

      phdField:
        String(
          formData.get("phdField") ?? ""
        ).trim(),

      phdUniversity:
        String(
          formData.get("phdUniversity") ?? ""
        ).trim(),

      phdCountry:
        String(
          formData.get("phdCountry") ?? ""
        ).trim(),

      phdYear:
        String(
          formData.get("phdYear") ?? ""
        ).trim(),

      phdThesisTitle:
        String(
          formData.get("phdThesisTitle") ?? ""
        ).trim(),

      phdSupervisor:
        String(
          formData.get("phdSupervisor") ?? ""
        ).trim(),

      researchAreas:
        formData
          .getAll("researchAreas")
          .map(String),

      otherResearchArea:
        String(
          formData.get(
            "otherResearchArea"
          ) ?? ""
        ).trim(),

      researchInterests:
        String(
          formData.get(
            "researchInterests"
          ) ?? ""
        ).trim(),

      whySensys:
        String(
          formData.get("whySensys") ?? ""
        ).trim(),

      skills:
        String(
          formData.get("skills") ?? ""
        ).trim(),

      publicationCount:
        String(
          formData.get(
            "publicationCount"
          ) ?? ""
        ).trim(),

      selectedWorkUrl:
        String(
          formData.get(
            "selectedWorkUrl"
          ) ?? ""
        ).trim(),

      cvUrl:
        String(
          formData.get("cvUrl") ?? ""
        ).trim(),

      additionalDocumentUrl:
        String(
          formData.get(
            "additionalDocumentUrl"
          ) ?? ""
        ).trim(),

      scholarOrOrcid:
        String(
          formData.get(
            "scholarOrOrcid"
          ) ?? ""
        ).trim(),

      linkedin:
        String(
          formData.get("linkedin") ?? ""
        ).trim(),

      website:
        String(
          formData.get("website") ?? ""
        ).trim(),

      startDate:
        String(
          formData.get("startDate") ?? ""
        ).trim(),

      preferredIntake:
        String(
          formData.get(
            "preferredIntake"
          ) ?? ""
        ).trim(),

      umApplicationStatus:
        String(
          formData.get(
            "umApplicationStatus"
          ) ?? ""
        ).trim(),

      umApplicantId:
        String(
          formData.get(
            "umApplicantId"
          ) ?? ""
        ).trim(),

      priorContact:
        String(
          formData.get("priorContact") ?? ""
        ).trim(),

      contactPerson:
        String(
          formData.get("contactPerson") ?? ""
        ).trim(),

      howHeard:
        String(
          formData.get("howHeard") ?? ""
        ).trim(),

      otherHowHeard:
        String(
          formData.get(
            "otherHowHeard"
          ) ?? ""
        ).trim(),

      botField:
        String(
          formData.get(
            "companyWebsite"
          ) ?? ""
        ).trim(),
    };

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response =
        await fetch(
          "/api/apply",
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
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Unable to submit the application."
        );
      }

      form.reset();

      setPosition("");
      setMastersStatus("");
      setPhdStatus("");
      setHowHeard("");
      setResearchOtherSelected(false);
      setUmApplicationStatus("");
      setPriorContact("");

      setSubmitState(
        "success"
      );
    } catch (error) {
      setSubmitState(
        "error"
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit the application."
      );
    }
  }

  if (
    submitState ===
    "success"
  ) {
    return (
      <div className="border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F4EC] text-xl text-[#2D6A45]">
          &#10003;
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
          Application received
        </p>

        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          Thank you for your interest in SenSys.
        </h3>

        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
          Your expression of interest has been recorded for review.
          Shortlisted applicants may be contacted for additional information
          or an interview.
        </p>

        <button
          type="button"
          onClick={() =>
            setSubmitState(
              "idle"
            )
          }
          className="mt-8 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--um-blue)] hover:text-[var(--um-blue)]"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] md:p-9"
    >
      <div className="border-b border-[var(--border)] pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
          SenSys Application
        </p>

        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          Expression of Interest
        </h3>

        <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
          Fields marked with * are required. This expression of interest
          does not replace the formal University of Manitoba admission or
          employment process.
        </p>
      </div>

      {/* Honeypot */}
      <div
        className="hidden"
        aria-hidden="true"
      >
        <label>
          Company website
          <input
            name="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="mt-8 space-y-12">

        {/* 01 POSITION */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            01 · Position
          </p>

          <div className="mt-5">
            <FieldLabel required>
              Position applying for
            </FieldLabel>

            <select
              name="position"
              required
              value={position}
              onChange={(event) =>
                setPosition(
                  event.target.value
                )
              }
              className={
                inputClass
              }
            >
              <option
                value=""
                disabled
              >
                Select a position
              </option>

              {positions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {position === "Other" && (
            <div className="mt-5">
              <FieldLabel required>
                Please specify
              </FieldLabel>

              <input
                name="otherPosition"
                required
                maxLength={160}
                placeholder="Describe the opportunity or role you are interested in"
                className={
                  inputClass
                }
              />
            </div>
          )}
        </section>

        {/* 02 PERSONAL */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            02 · Personal & Immigration Information
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>
              <FieldLabel required>
                Full name
              </FieldLabel>

              <input
                name="fullName"
                required
                maxLength={120}
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <FieldLabel required>
                Email
              </FieldLabel>

              <input
                name="email"
                type="email"
                required
                maxLength={160}
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <FieldLabel>
                Phone / WhatsApp
              </FieldLabel>

              <input
                name="phone"
                type="tel"
                maxLength={60}
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <FieldLabel>
                Date of birth — optional
              </FieldLabel>

              <input
                name="dateOfBirth"
                type="date"
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <FieldLabel>
                Gender — optional
              </FieldLabel>

              <select
                name="gender"
                defaultValue=""
                className={
                  inputClass
                }
              >
                <option value="">
                  Select
                </option>

                <option>
                  Male
                </option>

                <option>
                  Female
                </option>

                <option>
                  Non-binary / another identity
                </option>

                <option>
                  Prefer to self-describe
                </option>

                <option>
                  Prefer not to say
                </option>
              </select>
            </div>

            <div>
              <FieldLabel required>
                Country of citizenship
              </FieldLabel>

              <input
                name="citizenship"
                required
                maxLength={100}
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <FieldLabel required>
                Country of residence
              </FieldLabel>

              <input
                name="residenceCountry"
                required
                maxLength={100}
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <FieldLabel required>
                Current Canadian status
              </FieldLabel>

              <select
                name="canadaStatus"
                required
                defaultValue=""
                className={
                  inputClass
                }
              >
                <option
                  value=""
                  disabled
                >
                  Select
                </option>

                <option>
                  Canadian citizen or permanent resident
                </option>

                <option>
                  In Canada on a study permit
                </option>

                <option>
                  In Canada on a work permit
                </option>

                <option>
                  In Canada on another temporary status
                </option>

                <option>
                  Currently outside Canada
                </option>
              </select>
            </div>

            <div>
              <FieldLabel required>
                Will you require Canadian study/work authorization?
              </FieldLabel>

              <select
                name="needsCanadianAuthorization"
                required
                defaultValue=""
                className={
                  inputClass
                }
              >
                <option
                  value=""
                  disabled
                >
                  Select
                </option>

                <option>
                  Yes
                </option>

                <option>
                  No
                </option>

                <option>
                  Unsure
                </option>
              </select>
            </div>

            <div>
              <FieldLabel required>
                Current institution / organisation
              </FieldLabel>

              <input
                name="institution"
                required
                maxLength={180}
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <FieldLabel required>
                Current degree / position
              </FieldLabel>

              <input
                name="currentRole"
                required
                maxLength={160}
                placeholder="e.g. M.Tech student, Ph.D. candidate, Research Associate"
                className={
                  inputClass
                }
              />
            </div>
          </div>
        </section>

        {/* 03 ACADEMIC */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            03 · Academic Background
          </p>

          {/* Undergraduate */}

          <div className="mt-5 border border-[var(--border)] bg-[var(--background)] p-5">
            <p className="text-sm font-semibold">
              Undergraduate degree
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <div>
                <FieldLabel required>
                  Degree
                </FieldLabel>

                <input
                  name="ugDegree"
                  required
                  placeholder="e.g. B.Tech, B.E., B.Sc."
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <FieldLabel required>
                  Field / discipline
                </FieldLabel>

                <input
                  name="ugField"
                  required
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <FieldLabel required>
                  University / institution
                </FieldLabel>

                <input
                  name="ugUniversity"
                  required
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <FieldLabel>
                  Country
                </FieldLabel>

                <input
                  name="ugCountry"
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <FieldLabel required>
                  Year completed / expected
                </FieldLabel>

                <input
                  name="ugYear"
                  required
                  placeholder="e.g. 2026"
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <FieldLabel required>
                  GPA / CGPA / percentage
                </FieldLabel>

                <input
                  name="ugGrade"
                  required
                  placeholder="e.g. 8.70"
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <FieldLabel required>
                  Grading scale
                </FieldLabel>

                <input
                  name="ugScale"
                  required
                  placeholder="e.g. 10, 4.0, 100%"
                  className={
                    inputClass
                  }
                />
              </div>
            </div>
          </div>

          {/* Masters */}

          <div className="mt-5 border border-[var(--border)] bg-[var(--background)] p-5">
            <FieldLabel required>
              Master&apos;s degree status
            </FieldLabel>

            <select
              name="mastersStatus"
              required
              value={
                mastersStatus
              }
              onChange={(event) =>
                setMastersStatus(
                  event.target.value
                )
              }
              className={
                inputClass
              }
            >
              <option
                value=""
                disabled
              >
                Select
              </option>

              <option>
                No Master&apos;s degree
              </option>

              <option>
                Currently pursuing
              </option>

              <option>
                Completed
              </option>
            </select>

            {(mastersStatus ===
              "Currently pursuing" ||
              mastersStatus ===
                "Completed") && (
              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div>
                  <FieldLabel required>
                    Degree
                  </FieldLabel>

                  <input
                    name="pgDegree"
                    required
                    placeholder="e.g. M.Tech, M.E., M.Sc."
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel required>
                    Field / discipline
                  </FieldLabel>

                  <input
                    name="pgField"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel required>
                    University / institution
                  </FieldLabel>

                  <input
                    name="pgUniversity"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    Country
                  </FieldLabel>

                  <input
                    name="pgCountry"
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel required>
                    Year completed / expected
                  </FieldLabel>

                  <input
                    name="pgYear"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    GPA / CGPA / percentage
                  </FieldLabel>

                  <input
                    name="pgGrade"
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    Grading scale
                  </FieldLabel>

                  <input
                    name="pgScale"
                    placeholder="e.g. 10, 4.0, 100%"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* PhD */}

          <div className="mt-5 border border-[var(--border)] bg-[var(--background)] p-5">
            <FieldLabel required>
              Ph.D. status
            </FieldLabel>

            <select
              name="phdStatus"
              required
              value={
                phdStatus
              }
              onChange={(event) =>
                setPhdStatus(
                  event.target.value
                )
              }
              className={
                inputClass
              }
            >
              <option
                value=""
                disabled
              >
                Select
              </option>

              <option>
                No Ph.D.
              </option>

              <option>
                Currently pursuing
              </option>

              <option>
                Completed
              </option>
            </select>

            {(phdStatus ===
              "Currently pursuing" ||
              phdStatus ===
                "Completed") && (
              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div>
                  <FieldLabel required>
                    Field / discipline
                  </FieldLabel>

                  <input
                    name="phdField"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel required>
                    University / institution
                  </FieldLabel>

                  <input
                    name="phdUniversity"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel>
                    Country
                  </FieldLabel>

                  <input
                    name="phdCountry"
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <FieldLabel required>
                    Year completed / expected
                  </FieldLabel>

                  <input
                    name="phdYear"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <FieldLabel>
                    Thesis title
                  </FieldLabel>

                  <input
                    name="phdThesisTitle"
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <FieldLabel>
                    Supervisor
                  </FieldLabel>

                  <input
                    name="phdSupervisor"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 04 RESEARCH */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            04 · Research Fit
          </p>

          <div className="mt-5">
            <FieldLabel required>
              Research areas of interest
            </FieldLabel>

            <div className="grid gap-2 sm:grid-cols-2">
              {researchAreas.map(
                (area) => (
                  <label
                    key={area}
                    className="flex cursor-pointer items-start gap-3 border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-xs leading-5 transition hover:border-[var(--um-blue)]"
                  >
                    <input
                      type="checkbox"
                      name="researchAreas"
                      value={area}
                      onChange={(event) => {
                        if (
                          area ===
                          "Other"
                        ) {
                          setResearchOtherSelected(
                            event
                              .target
                              .checked
                          );
                        }
                      }}
                      className="mt-0.5 h-4 w-4 accent-[#385E9D]"
                    />

                    <span>
                      {area}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          {researchOtherSelected && (
            <div className="mt-5">
              <FieldLabel required>
                Other research area
              </FieldLabel>

              <input
                name="otherResearchArea"
                required
                className={
                  inputClass
                }
              />
            </div>
          )}

          <div className="mt-5">
            <FieldLabel required>
              Research interests / proposed direction
            </FieldLabel>

            <textarea
              name="researchInterests"
              required
              rows={5}
              maxLength={2500}
              placeholder="Briefly describe the research problem, technology, or application you would like to work on."
              className={
                inputClass
              }
            />
          </div>

          <div className="mt-5">
            <FieldLabel required>
              Why SenSys?
            </FieldLabel>

            <textarea
              name="whySensys"
              required
              rows={4}
              maxLength={1800}
              placeholder="Briefly explain why SenSys is a suitable research environment for your interests."
              className={
                inputClass
              }
            />
          </div>

          <div className="mt-5">
            <FieldLabel>
              Relevant skills / techniques
            </FieldLabel>

            <textarea
              name="skills"
              rows={4}
              maxLength={1800}
              placeholder="Fabrication, microfluidics, electrochemistry, electronics, programming, AI/ML, materials characterization, instrumentation, project management, etc."
              className={
                inputClass
              }
            />
          </div>
        </section>

        {/* 05 MATERIALS */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            05 · Research Profile & Application Materials
          </p>

          <div className="mt-5 grid gap-5">

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <FieldLabel>
                  Peer-reviewed publications, if applicable
                </FieldLabel>

                <input
                  name="publicationCount"
                  type="number"
                  min="0"
                  placeholder="e.g. 5"
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <FieldLabel>
                  Selected publication / project link
                </FieldLabel>

                <input
                  name="selectedWorkUrl"
                  type="url"
                  placeholder="https://..."
                  className={
                    inputClass
                  }
                />
              </div>
            </div>

            <div>
              <FieldLabel required>
                CV / résumé link
              </FieldLabel>

              <input
                name="cvUrl"
                type="url"
                required
                placeholder="https://..."
                className={
                  inputClass
                }
              />

              <p className="mt-2 text-[10px] leading-5 text-[var(--foreground-muted)]">
                Make sure the link is accessible to anyone with the link.
              </p>
            </div>

            <div>
              <FieldLabel>
                Additional document link
              </FieldLabel>

              <input
                name="additionalDocumentUrl"
                type="url"
                placeholder="Research proposal, transcript, portfolio, publication list, etc."
                className={
                  inputClass
                }
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <FieldLabel>
                  Google Scholar / ORCID
                </FieldLabel>

                <input
                  name="scholarOrOrcid"
                  type="url"
                  placeholder="https://..."
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <FieldLabel>
                  LinkedIn
                </FieldLabel>

                <input
                  name="linkedin"
                  type="url"
                  placeholder="https://..."
                  className={
                    inputClass
                  }
                />
              </div>
            </div>

            <div>
              <FieldLabel>
                Website / GitHub / portfolio
              </FieldLabel>

              <input
                name="website"
                type="url"
                placeholder="https://..."
                className={
                  inputClass
                }
              />
            </div>
          </div>
        </section>

        {/* 06 AVAILABILITY */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            06 · Availability & University Application
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>
              <FieldLabel>
                Earliest intended start date
              </FieldLabel>

              <input
                name="startDate"
                type="date"
                className={
                  inputClass
                }
              />
            </div>

            <div>
              <FieldLabel>
                Preferred intake
              </FieldLabel>

              <select
                name="preferredIntake"
                defaultValue=""
                className={
                  inputClass
                }
              >
                <option value="">
                  Select
                </option>

                <option>
                  Winter / January
                </option>

                <option>
                  Summer / May
                </option>

                <option>
                  Fall / September
                </option>

                <option>
                  Flexible / earliest available
                </option>
              </select>
            </div>

            <div>
              <FieldLabel>
                University of Manitoba application status
              </FieldLabel>

              <select
                name="umApplicationStatus"
                value={
                  umApplicationStatus
                }
                onChange={(event) =>
                  setUmApplicationStatus(
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
              >
                <option value="">
                  Select
                </option>

                <option>
                  Already applied
                </option>

                <option>
                  Planning to apply
                </option>

                <option>
                  Not yet applied
                </option>

                <option>
                  Not applicable to this opportunity
                </option>
              </select>
            </div>

            {umApplicationStatus ===
              "Already applied" && (
              <div>
                <FieldLabel>
                  UM application / applicant ID
                </FieldLabel>

                <input
                  name="umApplicantId"
                  maxLength={100}
                  className={
                    inputClass
                  }
                />
              </div>
            )}

            <div>
              <FieldLabel>
                Have you previously contacted Prof. Sanket Goel or another SenSys member?
              </FieldLabel>

              <select
                name="priorContact"
                value={
                  priorContact
                }
                onChange={(event) =>
                  setPriorContact(
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
              >
                <option value="">
                  Select
                </option>

                <option>
                  Yes
                </option>

                <option>
                  No
                </option>
              </select>
            </div>

            {priorContact ===
              "Yes" && (
              <div>
                <FieldLabel>
                  Whom did you contact?
                </FieldLabel>

                <input
                  name="contactPerson"
                  maxLength={160}
                  placeholder="Name of faculty member, researcher, or SenSys member"
                  className={
                    inputClass
                  }
                />
              </div>
            )}

            <div>
              <FieldLabel>
                How did you hear about SenSys?
              </FieldLabel>

              <select
                name="howHeard"
                value={
                  howHeard
                }
                onChange={(event) =>
                  setHowHeard(
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
              >
                <option value="">
                  Select
                </option>

                <option>
                  SenSys website
                </option>

                <option>
                  University of Manitoba website
                </option>

                <option>
                  LinkedIn
                </option>

                <option>
                  Google Scholar / publication
                </option>

                <option>
                  Conference / seminar
                </option>

                <option>
                  Referral from faculty / student
                </option>

                <option>
                  Search engine
                </option>

                <option>
                  Other
                </option>
              </select>
            </div>

            {howHeard ===
              "Other" && (
              <div>
                <FieldLabel>
                  Please specify
                </FieldLabel>

                <input
                  name="otherHowHeard"
                  maxLength={160}
                  className={
                    inputClass
                  }
                />
              </div>
            )}
          </div>

          <div className="mt-7 border border-[var(--border)] bg-[var(--background)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--um-blue)]">
              University of Manitoba admissions
            </p>

            <p className="mt-3 text-xs leading-6 text-[var(--foreground-soft)]">
              The SenSys expression of interest is separate from the formal
              University of Manitoba admissions process. Applicants must
              satisfy the relevant University and programme requirements.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <a
                href="https://umanitoba.ca/admissions/apply-um"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-[var(--um-blue)] transition hover:border-[var(--um-blue)]"
              >
                Apply to UM &#8599;
              </a>

              <a
                href="https://umanitoba.ca/explore/undergraduate-admissions"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-[var(--um-blue)] transition hover:border-[var(--um-blue)]"
              >
                Undergraduate admissions &#8599;
              </a>

              <a
                href="https://umanitoba.ca/graduate-studies/admissions/apply"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-[var(--um-blue)] transition hover:border-[var(--um-blue)]"
              >
                Graduate admissions &#8599;
              </a>

              <a
                href="https://umanitoba.ca/graduate-studies/admissions/programs-of-study/electrical-and-computer-engineering-msc-meng"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-[var(--um-blue)] transition hover:border-[var(--um-blue)]"
              >
                ECE M.Sc. / M.Eng. &#8599;
              </a>
            </div>
          </div>
        </section>

        {/* 07 DECLARATION */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            07 · Declaration
          </p>

          <label className="mt-5 flex cursor-pointer items-start gap-3 border-t border-[var(--border)] pt-6 text-xs leading-6 text-[var(--foreground-soft)]">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 accent-[#385E9D]"
            />

            <span>
              I confirm that the information provided is accurate and may be
              used by SenSys Lab for recruitment, research-opportunity
              evaluation, and related academic communication.
            </span>
          </label>
        </section>

        {submitState ===
          "error" && (
          <div className="border border-[#E3B7B2] bg-[#FBE7E5] px-4 py-3 text-sm text-[#A23B35]">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={
            submitState ===
            "submitting"
          }
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--um-blue)] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--um-blue-dark)] disabled:cursor-wait disabled:opacity-60"
        >
          {submitState ===
          "submitting"
            ? "Submitting..."
            : "Submit Application →"}
        </button>

        <p className="text-[10px] leading-5 text-[var(--foreground-muted)]">
          Submission does not constitute an offer of admission, employment,
          funding, immigration support, or supervision.
        </p>
      </div>
    </form>
  );
}