import { useState, type InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { SeoHead } from "../components/SeoHead";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { submitInquiry } from "../lib/submitInquiry";

type Values = {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  propertyType: string;
  locations: string;
  sqft: string;
  startDate: string;
  notes: string;
  svcOfficers: boolean;
  svcPatrol: boolean;
  svcParking: boolean;
  svcEvent: boolean;
  svcCctv: boolean;
};

export default function Quote() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const form = useForm<Values>({
    defaultValues: {
      company: "",
      contactName: "",
      email: "",
      phone: "",
      propertyType: "Commercial",
      locations: "",
      sqft: "",
      startDate: "",
      notes: "",
      svcOfficers: true,
      svcPatrol: false,
      svcParking: false,
      svcEvent: false,
      svcCctv: false,
    },
  });

  async function onSubmit(values: Values) {
    setStatus("sending");
    setErrorMsg(null);
    const services: string[] = [];
    if (values.svcOfficers) services.push("Uniformed Officers");
    if (values.svcPatrol) services.push("Mobile Patrol");
    if (values.svcParking) services.push("Parking Enforcement");
    if (values.svcEvent) services.push("Event Security");
    if (values.svcCctv) services.push("CCTV Monitoring");

    const message = [
      `Company: ${values.company}`,
      `Contact: ${values.contactName}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      "",
      `Property type: ${values.propertyType}`,
      `Locations: ${values.locations}`,
      `Size (sq ft est): ${values.sqft}`,
      `Start date: ${values.startDate}`,
      "",
      `Services: ${services.join(", ") || "None selected"}`,
      "",
      "Notes:",
      values.notes,
      "",
      "Requested follow-up: Sales (sean@prodsec.ca) per website routing guidance.",
    ].join("\n");

    try {
      await submitInquiry({
        type: "quote",
        name: values.contactName,
        email: values.email,
        phone: values.phone,
        subject: `Quote request — ${values.company || values.contactName}`,
        message,
        payload: {
          company: values.company,
          propertyType: values.propertyType,
          locations: values.locations,
          sqft: values.sqft,
          startDate: values.startDate,
          services,
          notes: values.notes,
        },
      });
      setStatus("sent");
      form.reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Could not send.");
    }
  }

  return (
    <>
      <SeoHead
        title="Get a Quote"
        description="Request a free security program quote from Productive Security Inc."
        path="/quote"
      />
      <section className="border-b border-brand-border bg-gradient-to-b from-brand-surface to-brand-dark">
        <Container className="py-12 sm:py-14">
          <p className="font-mono text-xs text-brand-yellow">Lead form</p>
          <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Get a free quote</h1>
          <p className="mt-4 max-w-2xl text-sm text-brand-muted">
            Tell us what you are protecting. We will respond with practical options—not a generic brochure dump.
          </p>
        </Container>
      </section>

      <Container className="py-12">
        <Reveal>
          <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl border border-brand-border dot-bg bg-brand-surface p-6 shadow-card sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold text-brand-muted">Company name</span>
                <input className={inp} {...form.register("company", { required: true })} />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-brand-muted">Contact name</span>
                <input className={inp} {...form.register("contactName", { required: true })} />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-brand-muted">Phone</span>
                <input className={inp} {...form.register("phone", { required: true })} />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold text-brand-muted">Email</span>
                <input className={inp} type="email" {...form.register("email", { required: true })} />
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-brand-muted">Property type</span>
                <select className={inp} {...form.register("propertyType")}>
                  <option>Commercial</option>
                  <option>Construction</option>
                  <option>Residential</option>
                  <option>Retail</option>
                  <option>Healthcare</option>
                  <option>Event</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-brand-muted">Number of locations</span>
                <input className={inp} {...form.register("locations", { required: true })} />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-brand-muted">Property size (sq ft est.)</span>
                <input className={inp} {...form.register("sqft", { required: true })} />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-brand-muted">Start date needed</span>
                <input className={inp} type="date" {...form.register("startDate", { required: true })} />
              </label>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold text-brand-muted">Services needed</div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Toggle label="Uniformed Officers" {...form.register("svcOfficers")} />
                <Toggle label="Mobile Patrol" {...form.register("svcPatrol")} />
                <Toggle label="Parking Enforcement" {...form.register("svcParking")} />
                <Toggle label="Event Security" {...form.register("svcEvent")} />
                <Toggle label="CCTV Monitoring" {...form.register("svcCctv")} />
              </div>
            </div>

            <label className="mt-6 block">
              <span className="text-xs font-semibold text-brand-muted">Additional notes</span>
              <textarea className={`${inp} min-h-[140px]`} {...form.register("notes")} />
            </label>

            {status === "sent" ? (
              <div className="mt-4 rounded-xl border border-brand-success/30 bg-brand-success/10 p-3 text-sm">
                Received. Thank you — our sales team will follow up shortly.
              </div>
            ) : null}
            {status === "error" ? (
              <div className="mt-4 rounded-xl border border-brand-danger/30 bg-brand-danger/10 p-3 text-sm">
                {errorMsg}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 inline-flex rounded-xl bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-dark hover:brightness-105 disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Submit quote request"}
            </button>
          </form>
        </Reveal>
      </Container>
    </>
  );
}

const inp =
  "mt-2 w-full rounded-xl border border-brand-border bg-brand-dark px-3 py-2 text-sm text-white focus:border-brand-yellow/45 focus:outline-none";

function Toggle({ label, ...rest }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-dark px-3 py-2 text-sm text-white">
      <input type="checkbox" className="h-4 w-4 accent-brand-yellow" {...rest} />
      {label}
    </label>
  );
}
