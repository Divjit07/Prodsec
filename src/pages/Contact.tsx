import { useState } from "react";
import { useForm } from "react-hook-form";
import { SeoHead } from "../components/SeoHead";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { submitInquiry } from "../lib/submitInquiry";

type Values = { name: string; email: string; phone: string; topic: string; message: string };

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const form = useForm<Values>({
    defaultValues: { name: "", email: "", phone: "", topic: "General inquiry", message: "" },
  });

  async function onSubmit(values: Values) {
    setStatus("sending");
    setErrorMsg(null);
    try {
      await submitInquiry({
        type: "contact",
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: `Website inquiry: ${values.topic}`,
        message: values.message,
        payload: { topic: values.topic },
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
        title="Contact"
        description="Contact Productive Security Inc.—18 Wynford Drive, Toronto. Phone 416.535.9341."
        path="/contact"
      />
      <Container className="pt-4 pb-16">
        <p className="font-mono text-xs text-brand-yellow">Contact</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Let’s talk</h1>
        <p className="mt-4 max-w-2xl text-sm text-brand-muted">
          For urgent security concerns, call <span className="text-white">416.535.9341</span>. For general inquiries,
          use the form—we&apos;ll respond within one business day.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-2xl border border-brand-border dot-bg bg-brand-surface p-6 shadow-card">
                <h2 className="font-display text-2xl text-white">Head office</h2>
                <address className="mt-4 not-italic text-sm leading-relaxed text-brand-muted">
                  18 Wynford Drive, Suite 711B
                  <br />
                  Toronto, ON
                </address>
                <div className="mt-6 space-y-3 text-sm">
                  <div>
                    <div className="text-xs font-semibold text-brand-muted">Phone (24/7)</div>
                    <a className="text-white hover:underline" href="tel:+14165359341">
                      416.535.9341
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brand-muted">Email</div>
                    <a className="text-white hover:underline" href="mailto:info@prodsec.ca">
                      info@prodsec.ca
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="mt-6">
              <div className="rounded-2xl border border-brand-border dot-bg bg-brand-surface-2 p-6">
                <h3 className="text-sm font-semibold text-white">Key contacts</h3>
                <ul className="mt-4 space-y-3 text-sm text-brand-muted">
                  <li>
                    <span className="text-white">Rose Rupani</span> — President
                    <div>
                      <a className="hover:text-white" href="mailto:rose@prodsec.ca">
                        rose@prodsec.ca
                      </a>
                    </div>
                  </li>
                  <li>
                    <span className="text-white">Elie Dagher</span> — Operations & HR
                    <div>
                      <a className="hover:text-white" href="mailto:elie@prodsec.ca">
                        elie@prodsec.ca
                      </a>
                    </div>
                  </li>
                  <li>
                    <span className="text-white">Sean Hatchett</span> — Sales
                    <div>
                      <a className="hover:text-white" href="mailto:sean@prodsec.ca">
                        sean@prodsec.ca
                      </a>
                    </div>
                  </li>
                  <li>
                    <span className="text-white">Divjit Singh</span> — IT Support Technician
                    <div>
                      <a className="hover:text-white" href="mailto:divjit@prodsec.ca">
                        divjit@prodsec.ca
                      </a>
                    </div>
                  </li>
                  <li>
                    <span className="text-white">Naeem Khan</span> — IT Services
                    <div>
                      <a className="hover:text-white" href="mailto:nkhan@prodsec.ca">
                        nkhan@prodsec.ca
                      </a>
                    </div>
                  </li>
                  <li>
                    <span className="text-white">Emy T.</span> — Admin Manager
                    <div>
                      <a className="hover:text-white" href="mailto:emy@prodsec.ca">
                        emy@prodsec.ca
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl border border-brand-border dot-bg bg-brand-surface p-6 shadow-card">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold text-brand-muted">Name</span>
                    <input className={inp} {...form.register("name", { required: true })} />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-brand-muted">Email</span>
                    <input className={inp} type="email" {...form.register("email", { required: true })} />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-brand-muted">Phone</span>
                    <input className={inp} {...form.register("phone")} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold text-brand-muted">Topic</span>
                    <select className={inp} {...form.register("topic")}>
                      <option>General inquiry</option>
                      <option>Service question</option>
                      <option>Billing / admin</option>
                      <option>Media</option>
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold text-brand-muted">Message</span>
                    <textarea className={`${inp} min-h-[160px]`} {...form.register("message", { required: true })} />
                  </label>
                </div>

                {status === "sent" ? (
                  <div className="mt-4 rounded-xl border border-brand-success/30 bg-brand-success/10 p-3 text-sm">
                    Sent. Thank you — we will respond as soon as possible.
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
                  className="mt-5 inline-flex rounded-xl bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-dark hover:brightness-105 disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            </Reveal>

            <Reveal delay={0.06} className="mt-6 overflow-hidden rounded-2xl border border-brand-border shadow-card">
              <iframe
                title="Map — 18 Wynford Drive, Toronto"
                className="h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=18%20Wynford%20Drive%20Toronto&output=embed"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}

const inp =
  "mt-2 w-full rounded-xl border border-brand-border bg-brand-dark px-3 py-2 text-sm text-white focus:border-brand-yellow/45 focus:outline-none";
