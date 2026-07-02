import { useEffect, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { submitInquiry } from "../../lib/submitInquiry";

type FormValues = {
  role: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  resumeLink: string;
  grade12: "yes" | "no";
  firstAid: "yes" | "no";
  drivers: "yes" | "no" | "g2";
  bondable: "yes" | "no";
  secLicense: string;
  experienceYears: string;
  shiftDays: boolean;
  shiftEvenings: boolean;
  shiftNights: boolean;
  shiftWeekends: boolean;
  ref1: string;
  ref1Phone: string;
  ref1Rel: string;
  ref2: string;
  ref2Phone: string;
  ref2Rel: string;
  ref3: string;
  ref3Phone: string;
  ref3Rel: string;
  cover: string;
};

const defaults: FormValues = {
  role: "Security Officer",
  fullName: "",
  email: "",
  phone: "",
  address: "",
  resumeLink: "",
  grade12: "yes",
  firstAid: "no",
  drivers: "yes",
  bondable: "yes",
  secLicense: "",
  experienceYears: "",
  shiftDays: true,
  shiftEvenings: false,
  shiftNights: false,
  shiftWeekends: false,
  ref1: "",
  ref1Phone: "",
  ref1Rel: "",
  ref2: "",
  ref2Phone: "",
  ref2Rel: "",
  ref3: "",
  ref3Phone: "",
  ref3Rel: "",
  cover: "",
};

export default function Apply() {
  const [params] = useSearchParams();
  const roleFromQuery = params.get("role") || "";
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<FormValues>({ defaultValues: defaults });

  useEffect(() => {
    form.setValue("role", roleFromQuery || defaults.role);
  }, [roleFromQuery, form]);

  const steps = ["Personal", "Qualifications", "Availability & references"];

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    setErrorMsg(null);
    const shifts: string[] = [];
    if (values.shiftDays) shifts.push("Days");
    if (values.shiftEvenings) shifts.push("Evenings");
    if (values.shiftNights) shifts.push("Nights");
    if (values.shiftWeekends) shifts.push("Weekends");

    const message = [
      `Role: ${values.role}`,
      "",
      "— Personal —",
      `Name: ${values.fullName}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Address: ${values.address}`,
      `Resume link: ${values.resumeLink}`,
      "",
      "— Qualifications —",
      `Grade 12: ${values.grade12}`,
      `First Aid/CPR: ${values.firstAid}`,
      `Driver license: ${values.drivers}`,
      `Bondable: ${values.bondable}`,
      `Security license #: ${values.secLicense || "N/A"}`,
      `Years experience: ${values.experienceYears}`,
      "",
      "— Availability —",
      `Shifts: ${shifts.join(", ") || "None selected"}`,
      "",
      "— References —",
      `1) ${values.ref1} | ${values.ref1Phone} | ${values.ref1Rel}`,
      `2) ${values.ref2} | ${values.ref2Phone} | ${values.ref2Rel}`,
      `3) ${values.ref3} | ${values.ref3Phone} | ${values.ref3Rel}`,
      "",
      "— Message —",
      values.cover,
    ].join("\n");

    try {
      await submitInquiry({
        type: "career",
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        subject: `Careers application: ${values.role}`,
        message,
        payload: {
          role: values.role,
          address: values.address,
          resumeLink: values.resumeLink,
          grade12: values.grade12,
          firstAid: values.firstAid,
          drivers: values.drivers,
          bondable: values.bondable,
          secLicense: values.secLicense,
          experienceYears: values.experienceYears,
          shifts,
        },
      });
      setStatus("sent");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <>
      <SeoHead
        title="Apply"
        description="Apply online to Productive Security Inc.—secure multi-step application."
        path="/careers/jobs/apply"
      />
      <Container className="pt-4 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-brand-yellow">Careers</p>
            <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Apply online</h1>
            <p className="mt-3 max-w-2xl text-sm text-brand-muted">
              Three quick steps. You can paste a link to your resume (Google Drive/Dropbox) for fastest processing.
            </p>
          </div>
          <Link to="/careers/jobs" className="text-sm font-semibold text-brand-yellow hover:underline">
            ← Back to jobs
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-brand-border dot-bg bg-brand-surface p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            {steps.map((s, idx) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div
                  className={[
                    "grid h-9 w-9 place-items-center rounded-full border text-xs font-semibold",
                    idx === step
                      ? "border-brand-yellow bg-brand-yellow text-brand-dark"
                      : idx < step
                        ? "border-brand-success/40 bg-brand-success/10 text-brand-success"
                        : "border-brand-border bg-black/20 text-brand-muted",
                  ].join(" ")}
                  aria-current={idx === step ? "step" : undefined}
                >
                  {idx + 1}
                </div>
                <div className="hidden min-w-0 sm:block">
                  <div className="truncate text-xs font-semibold text-white">{s}</div>
                </div>
                {idx < steps.length - 1 ? (
                  <div className="mx-2 hidden h-px flex-1 bg-brand-border sm:block" aria-hidden />
                ) : null}
              </div>
            ))}
          </div>

          <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <Field label="Role applying for">
                    <input className={input} {...form.register("role", { required: true })} />
                  </Field>
                  <Field label="Full name">
                    <input className={input} {...form.register("fullName", { required: true })} />
                  </Field>
                  <Field label="Email">
                    <input className={input} type="email" {...form.register("email", { required: true })} />
                  </Field>
                  <Field label="Phone">
                    <input className={input} {...form.register("phone", { required: true })} />
                  </Field>
                  <Field label="Address" className="sm:col-span-2">
                    <input className={input} {...form.register("address", { required: true })} />
                  </Field>
                  <Field label="Resume link (PDF on Drive/Dropbox)" className="sm:col-span-2">
                    <input className={input} {...form.register("resumeLink", { required: true })} />
                  </Field>
                </motion.div>
              ) : null}

              {step === 1 ? (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <YesNo label="Grade 12 diploma?" name="grade12" form={form} />
                  <YesNo label="First Aid & CPR?" name="firstAid" form={form} />
                  <Field label="Driver’s license">
                    <select className={input} {...form.register("drivers")}>
                      <option value="yes">Full G / equivalent</option>
                      <option value="g2">G2</option>
                      <option value="no">No</option>
                    </select>
                  </Field>
                  <YesNo label="Bondable?" name="bondable" form={form} />
                  <Field label="Security license # (if applicable)">
                    <input className={input} {...form.register("secLicense")} />
                  </Field>
                  <Field label="Years of experience">
                    <input className={input} {...form.register("experienceYears", { required: true })} />
                  </Field>
                </motion.div>
              ) : null}

              {step === 2 ? (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-5"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">Available shifts</div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <Checkbox label="Days" {...form.register("shiftDays")} />
                      <Checkbox label="Evenings" {...form.register("shiftEvenings")} />
                      <Checkbox label="Nights" {...form.register("shiftNights")} />
                      <Checkbox label="Weekends" {...form.register("shiftWeekends")} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Reference 1 — name">
                      <input className={input} {...form.register("ref1", { required: true })} />
                    </Field>
                    <Field label="Phone">
                      <input className={input} {...form.register("ref1Phone", { required: true })} />
                    </Field>
                    <Field label="Relationship">
                      <input className={input} {...form.register("ref1Rel", { required: true })} />
                    </Field>
                    <Field label="Reference 2 — name">
                      <input className={input} {...form.register("ref2", { required: true })} />
                    </Field>
                    <Field label="Phone">
                      <input className={input} {...form.register("ref2Phone", { required: true })} />
                    </Field>
                    <Field label="Relationship">
                      <input className={input} {...form.register("ref2Rel", { required: true })} />
                    </Field>
                    <Field label="Reference 3 — name">
                      <input className={input} {...form.register("ref3", { required: true })} />
                    </Field>
                    <Field label="Phone">
                      <input className={input} {...form.register("ref3Phone", { required: true })} />
                    </Field>
                    <Field label="Relationship">
                      <input className={input} {...form.register("ref3Rel", { required: true })} />
                    </Field>
                  </div>

                  <Field label="Cover message">
                    <textarea className={`${input} min-h-[140px]`} {...form.register("cover", { required: true })} />
                  </Field>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {status === "sent" ? (
              <div className="mt-6 rounded-xl border border-brand-success/30 bg-brand-success/10 p-4 text-sm text-brand-text">
                Application received. Thank you — our team will follow up shortly.
              </div>
            ) : null}
            {status === "error" ? (
              <div className="mt-6 rounded-xl border border-brand-danger/30 bg-brand-danger/10 p-4 text-sm text-brand-text">
                {errorMsg}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                className="rounded-xl border border-brand-border bg-black/20 px-4 py-2 text-sm font-semibold text-white hover:border-brand-yellow/35 disabled:opacity-40"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </button>
              {step < 2 ? (
                <button
                  type="button"
                  className="rounded-xl bg-brand-yellow px-5 py-2 text-sm font-semibold text-brand-dark hover:brightness-105"
                  onClick={async () => {
                    const fields: Record<number, (keyof FormValues)[]> = {
                      0: ["role", "fullName", "email", "phone", "address", "resumeLink"],
                      1: ["experienceYears"],
                    };
                    const ok = await form.trigger(fields[step] as never);
                    if (ok) setStep((s) => s + 1);
                  }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="rounded-xl bg-brand-yellow px-5 py-2 text-sm font-semibold text-brand-dark hover:brightness-105 disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Submit application"}
                </button>
              )}
            </div>

            <p className="mt-4 text-xs text-brand-muted">
              Submissions are stored securely and your team is notified by email. Allow one business day for follow-up.
            </p>
          </form>
        </div>
      </Container>
    </>
  );
}

const input =
  "w-full rounded-xl border border-brand-border bg-brand-dark px-3 py-2 text-sm text-white placeholder:text-brand-muted focus:border-brand-yellow/45 focus:outline-none";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold text-brand-muted">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Checkbox({ label, ...rest }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-dark px-3 py-2 text-sm text-white">
      <input type="checkbox" className="h-4 w-4 accent-brand-yellow" {...rest} />
      {label}
    </label>
  );
}

function YesNo({
  label,
  name,
  form,
}: {
  label: string;
  name: "grade12" | "firstAid" | "bondable";
  form: ReturnType<typeof useForm<FormValues>>;
}) {
  return (
    <Field label={label}>
      <select className={input} {...form.register(name)}>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </Field>
  );
}
