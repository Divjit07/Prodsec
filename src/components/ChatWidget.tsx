import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Msg = { id: string; role: "user" | "assistant"; text: string };

const WELCOME =
  "Hi! I’m Productive Security’s on-site assistant. Ask about services, careers, or how to get a quote — I’m here 24/7.";

const EMERGENCY = "416.535.9341";

function classify(input: string) {
  const q = input.toLowerCase();
  if (/(urgent|emergency|help now|someone broke|weapon|attack|robbery|assault)/i.test(input)) {
    return "emergency" as const;
  }
  if (/(quote|pricing|proposal|hire|contract|site assessment)/i.test(q)) return "quote" as const;
  if (/(job|career|apply|shift|pay|interview|resume)/i.test(q)) return "careers" as const;
  if (/(service|guard|patrol|condo|retail|construction|healthcare|event)/i.test(q)) return "services" as const;
  if (/(contact|email|phone|address|who is)/i.test(q)) return "contact" as const;
  if (/(license|insured|wsib|bond|training)/i.test(q)) return "trust" as const;
  return "general" as const;
}

function reply(intent: ReturnType<typeof classify>) {
  switch (intent) {
    case "emergency":
      return `If this is an urgent security concern, call **${EMERGENCY}** immediately. If someone is in danger, contact local emergency services (9-1-1) first.`;
    case "quote":
      return `I can help with that. The fastest path is our quote form — it routes directly to our sales team. Tap **Get a Quote** below, or visit **/quote**. Typical follow-up is within one business day.`;
    case "careers":
      return `We’re hiring across multiple roles. You can browse openings and apply online at **/careers/jobs**. Common requirements include Grade 12+, First Aid/CPR, bondability, and strong communication.`;
    case "services":
      return `We support **Commercial**, **Construction**, **Apartment/Condo**, **Retail**, **Healthcare**, and **Special Events** programs across Ontario. Tell me your sector and I’ll point you to the right page — start at **/services**.`;
    case "contact":
      return `Head office: **18 Wynford Drive, Suite 711B, Toronto**. Phone **416.535.9341** (24/7) and email **info@prodsec.ca**. For sales questions, **sean@prodsec.ca**. For careers, **elie@prodsec.ca**.`;
    case "trust":
      return `We operate with licensed personnel and insurance appropriate to client requirements. For compliance specifics (WSIB, coverage limits, licensing), our team will confirm details with your procurement team during onboarding.`;
    default:
      return `Productive Security has served Ontario since **1997** with 120+ professionals. Ask about **services**, **careers**, or say **quote** for next steps.`;
  }
}

function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-white">
          {m[1]}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const CHIPS = [
  { label: "Get a Quote", to: "/quote" },
  { label: "View Jobs", to: "/careers/jobs" },
  { label: "Our Services", to: "/services" },
  { label: "Contact Us", to: "/contact" },
];

export function ChatWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: "w", role: "assistant", text: WELCOME }]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  const titleId = useMemo(() => `${panelId}-title`, [panelId]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise((r) => window.setTimeout(r, 450 + Math.random() * 250));
    const intent = classify(trimmed);
    const assistantMsg: Msg = { id: crypto.randomUUID(), role: "assistant", text: reply(intent) };
    setMsgs((m) => [...m, assistantMsg]);
    setTyping(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && !minimized ? (
          <motion.section
            layout
            id={panelId}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className=" dot-bg flex h-[min(520px,calc(100dvh-7rem))] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-850 shadow-lift max-sm:fixed max-sm:inset-3 max-sm:h-[calc(100dvh-1.5rem)] max-sm:w-auto"
          >
            <div className=" flex items-center justify-between gap-2 border-b border-white/10 bg-ink-950/60 px-4 py-3">
              <div>
                <div id={titleId} className="text-sm font-semibold text-white">
                  Productive Security Assistant
                </div>
                <div className="text-xs text-brand-muted">Routing help for services, careers, and proposals</div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="rounded-lg px-2 py-1 text-xs text-brand-muted hover:bg-white/5 hover:text-white"
                  onClick={() => setMinimized(true)}
                >
                  Minimize
                </button>
                <button
                  type="button"
                  className="rounded-lg px-2 py-1 text-xs text-brand-muted hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m) => (
                <div
                  key={m.id}
                  className={[
                    "max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "ml-auto bg-white text-ink-950"
                      : "mr-auto border border-white/10 bg-ink-900 text-brand-text",
                  ].join(" ")}
                >
                  {m.role === "assistant" ? renderText(m.text) : m.text}
                </div>
              ))}
              {typing ? (
                <div className="mr-auto flex items-center gap-1 rounded-xl border border-white/10 bg-ink-900 px-3 py-2 text-xs text-brand-muted">
                  <span className="inline-flex gap-1" aria-label="Assistant is typing">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-brand-accent"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                    />
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-brand-accent"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.15 }}
                    />
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-brand-accent"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
                    />
                  </span>
                  Thinking…
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2 pt-1">
                {CHIPS.map((c) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    className="rounded-full border border-white/10 bg-ink-950/50 px-3 py-1 text-xs text-brand-text hover:border-white/25 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            <form
              className="border-t border-white/10 bg-ink-950/50 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Message
              </label>
              <div className="flex gap-2">
                <input
                  id="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  className="flex-1 rounded-xl border border-white/10 bg-ink-900 px-3 py-2 text-sm text-white placeholder:text-brand-muted focus:border-white/25 focus:outline-none"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="rounded-xl border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-white/95"
                >
                  Send
                </button>
              </div>
              <div className="mt-2.5 text-[11px] leading-relaxed text-brand-muted">
                For urgent security concerns, call{" "}
                <a className="font-medium tabular-nums text-white hover:underline" href="tel:+14165359341">
                  {EMERGENCY}
                </a>{" "}
                — do not wait on chat.
              </div>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {open && minimized ? (
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="mb-3 w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-2 text-left text-sm text-white shadow-card"
        >
          Resume chat
        </button>
      ) : null}

      <motion.button
        type="button"
        layout
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        onClick={() => {
          setOpen((v) => !v);
          setMinimized(false);
        }}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white text-ink-950 shadow-lift"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="sr-only">Open chat assistant</span>
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path
            d="M16 6l8 4v8c0 5-3.5 9.2-8 10-4.5-.8-8-5-8-10v-4l8-4z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M16 12v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </motion.button>
    </div>
  );
}
