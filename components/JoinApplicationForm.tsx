"use client";

import {
  FormEvent,
  useState,
} from "react";

const positions = [
  "Ph.D. Researcher",
  "M.Sc. Researcher",
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
        <span className="ml-1 text-[#A23B35]">
          *
        </span>
      )}
    </label>
  );
}

const inputClass =
  "w-full rounded-none border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground-muted)]/60 focus:border-[var(--um-blue)] focus:ring-2 focus:ring-[var(--um-blue)]/10";

export default function JoinApplicationForm() {
  const [
    submitState,
    setSubmitState,
  ] =
    useState<SubmitState>(
      "idle"
    );

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form =
      event.currentTarget;

    const formData =
      new FormData(
        form
      );

    const payload = {
      position:
        String(
          formData.get(
            "position"
          ) ?? ""
        ).trim(),

      fullName:
        String(
          formData.get(
            "fullName"
          ) ?? ""
        ).trim(),

      email:
        String(
          formData.get(
            "email"
          ) ?? ""
        ).trim(),

      phone:
        String(
          formData.get(
            "phone"
          ) ?? ""
        ).trim(),

      institution:
        String(
          formData.get(
            "institution"
          ) ?? ""
        ).trim(),

      currentRole:
        String(
          formData.get(
            "currentRole"
          ) ?? ""
        ).trim(),

      country:
        String(
          formData.get(
            "country"
          ) ?? ""
        ).trim(),

      researchAreas:
        formData
          .getAll(
            "researchAreas"
          )
          .map(
            String
          ),

      researchInterests:
        String(
          formData.get(
            "researchInterests"
          ) ?? ""
        ).trim(),

      whySensys:
        String(
          formData.get(
            "whySensys"
          ) ?? ""
        ).trim(),

      skills:
        String(
          formData.get(
            "skills"
          ) ?? ""
        ).trim(),

      startDate:
        String(
          formData.get(
            "startDate"
          ) ?? ""
        ).trim(),

      cvUrl:
        String(
          formData.get(
            "cvUrl"
          ) ?? ""
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
          formData.get(
            "linkedin"
          ) ?? ""
        ).trim(),

      website:
        String(
          formData.get(
            "website"
          ) ?? ""
        ).trim(),

      howHeard:
        String(
          formData.get(
            "howHeard"
          ) ?? ""
        ).trim(),

      botField:
        String(
          formData.get(
            "companyWebsite"
          ) ?? ""
        ).trim(),
    };

    setSubmitState(
      "submitting"
    );

    setErrorMessage(
      ""
    );

    try {
      const response =
        await fetch(
          "/api/apply",
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
          }
        );

      const result =
        await response.json();

      if (
        !response.ok
      ) {
        throw new Error(
          result?.error ||
            "Unable to submit the application."
        );
      }

      form.reset();

      setSubmitState(
        "success"
      );
    } catch (
      error
    ) {
      setSubmitState(
        "error"
      );

      setErrorMessage(
        error instanceof
          Error
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
          ✓
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--um-blue)]">
          Application received
        </p>

        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          Thank you for your interest in SenSys.
        </h3>

        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
          Your application has been recorded for review. Shortlisted
          applicants may be contacted for additional information or an
          interview.
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
          Fields marked with * are required.
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

      <div className="mt-8 space-y-10">
        {/* ROLE */}

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
              defaultValue=""
              className={inputClass}
            >
              <option
                value=""
                disabled
              >
                Select a position
              </option>

              {positions.map(
                (
                  position
                ) => (
                  <option
                    key={
                      position
                    }
                    value={
                      position
                    }
                  >
                    {
                      position
                    }
                  </option>
                )
              )}
            </select>
          </div>
        </section>

        {/* ABOUT YOU */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            02 · About You
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
                className={inputClass}
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
                className={inputClass}
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
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel>
                Country
              </FieldLabel>

              <input
                name="country"
                maxLength={100}
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel required>
                Current institution / organisation
              </FieldLabel>

              <input
                name="institution"
                required
                maxLength={180}
                className={inputClass}
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
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* RESEARCH FIT */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            03 · Research Fit
          </p>

          <div className="mt-5">
            <FieldLabel required>
              Research areas of interest
            </FieldLabel>

            <div className="grid gap-2 sm:grid-cols-2">
              {researchAreas.map(
                (
                  area
                ) => (
                  <label
                    key={
                      area
                    }
                    className="flex cursor-pointer items-start gap-3 border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-xs leading-5 transition hover:border-[var(--um-blue)]"
                  >
                    <input
                      type="checkbox"
                      name="researchAreas"
                      value={
                        area
                      }
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

          <div className="mt-5">
            <FieldLabel required>
              Research interests
            </FieldLabel>

            <textarea
              name="researchInterests"
              required
              rows={5}
              maxLength={2500}
              placeholder="Briefly describe the research problems, technologies, or applications that interest you."
              className={inputClass}
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
              placeholder="Tell us why you are interested in joining SenSys and how your background aligns with the lab."
              className={inputClass}
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
              className={inputClass}
            />
          </div>
        </section>

        {/* MATERIALS */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            04 · Application Materials
          </p>

          <div className="mt-5 grid gap-5">
            <div>
              <FieldLabel required>
                CV / résumé link
              </FieldLabel>

              <input
                name="cvUrl"
                type="url"
                required
                placeholder="https://..."
                className={inputClass}
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
                className={inputClass}
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
                  className={inputClass}
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
                  className={inputClass}
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
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* AVAILABILITY */}

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--um-gold)]">
            05 · Availability
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel>
                Earliest intended start date
              </FieldLabel>

              <input
                name="startDate"
                type="date"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel>
                How did you hear about SenSys?
              </FieldLabel>

              <select
                name="howHeard"
                defaultValue=""
                className={inputClass}
              >
                <option value="">
                  Select
                </option>
                <option>
                  SenSys website
                </option>
                <option>
                  LinkedIn
                </option>
                <option>
                  University of Manitoba
                </option>
                <option>
                  Google Scholar / publication
                </option>
                <option>
                  Conference / seminar
                </option>
                <option>
                  Referral
                </option>
                <option>
                  Other
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* CONSENT */}

        <label className="flex cursor-pointer items-start gap-3 border-t border-[var(--border)] pt-6 text-xs leading-6 text-[var(--foreground-soft)]">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-[#385E9D]"
          />

          <span>
            I confirm that the information provided is accurate and may be
            used by SenSys Lab for recruitment and research-opportunity
            evaluation.
          </span>
        </label>

        {submitState ===
          "error" && (
          <div className="border border-[#E3B7B2] bg-[#FBE7E5] px-4 py-3 text-sm text-[#A23B35]">
            {
              errorMessage
            }
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
            ? "Submitting…"
            : "Submit Application →"}
        </button>

        <p className="text-[10px] leading-5 text-[var(--foreground-muted)]">
          Submission does not constitute an offer of admission, employment,
          funding, or supervision.
        </p>
      </div>
    </form>
  );
}
