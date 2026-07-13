import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ctaNav, phone, primaryNav, type NavGroup } from "../data/nav";
import { brandImages } from "../data/brandAssets";
import { EASE } from "../lib/motion";
import { ChatWidget } from "./ChatWidget";
import { ScrollToTop } from "./ScrollToTop";

/**
 * The crest artwork is drawn on a white card — the white *is* the shield's face,
 * so it cannot be knocked out without destroying the mark. Instead the card is
 * made deliberate: a white badge with a gold hairline that lifts off the dot field.
 * The artwork itself is untouched.
 */
function Crest({ className = "h-16" }: { className?: string }) {
  return (
    <span
      className={`${className} inline-flex aspect-square shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 ring-1 ring-brand-accent/40 transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-0.5 group-hover:scale-[1.03]`}
      style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.3), 0 16px 34px -14px rgba(5,10,28,0.85)" }}
    >
      <img
        src={brandImages.logoCrest}
        alt=""
        className="h-full w-full object-contain"
        width={248}
        height={288}
        decoding="async"
      />
    </span>
  );
}

/** Red maple leaf from the crest artwork. */
function MapleLeaf({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/maple-leaf.png`}
      alt=""
      aria-hidden
      className={`inline-block shrink-0 object-contain ${className}`}
      width={32}
      height={32}
      decoding="async"
    />
  );
}

/** Five-point gold star — same mark as the crest tip. */
function GoldStar({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={`inline-block shrink-0 ${className}`} aria-hidden>
      <path
        fill="#d4a84a"
        d="M0-12 L2.75-3.7 L11.5-3.7 L4.4 1.45 L7.05 9.8 L0 4.5 L-7.05 9.8 L-4.4 1.45 L-11.5-3.7 L-2.75-3.7 Z"
      />
    </svg>
  );
}

function StripStars() {
  return (
    <span className="flex items-center gap-1.5 sm:gap-2" aria-hidden>
      <GoldStar className="h-2.5 w-2.5 opacity-80 sm:h-3 sm:w-3" />
      <GoldStar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      <GoldStar className="h-2.5 w-2.5 opacity-80 sm:h-3 sm:w-3" />
    </span>
  );
}

/** Underline that wipes in from the left on hover, and stays put when active. */
function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute bottom-0.5 left-3 right-3 h-px origin-left bg-brand-accent transition-transform duration-500 ease-out ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}

/** Desktop top-level item. Items with children open a panel on hover or focus. */
function NavItem({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  if (!group.children) {
    return (
      <NavLink
        to={group.to}
        className={({ isActive }) =>
          `group relative whitespace-nowrap px-3 py-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
            isActive ? "text-white" : "text-brand-muted hover:text-white"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {group.label}
            <NavUnderline active={isActive} />
          </>
        )}
      </NavLink>
    );
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => {
        window.clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 120);
      }}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <NavLink
        to={group.to}
        aria-expanded={open}
        className={({ isActive }) =>
          `relative flex items-center gap-1.5 whitespace-nowrap px-3 py-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
            isActive ? "text-white" : "text-brand-muted hover:text-white"
          }`
        }
      >
        {group.label}
        <svg
          viewBox="0 0 10 6"
          aria-hidden
          className={`h-1.5 w-2.5 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
        <NavUnderline active={open} />
      </NavLink>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="absolute left-0 top-full z-50 w-[22rem] origin-top pt-2"
          >
            <motion.div
              className="dot-bg overflow-hidden rounded-lg border border-white/10 bg-ink-900/95 p-1.5 shadow-lift backdrop-blur-xl"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } } }}
            >
              {group.children.map((leaf) => (
                <motion.div
                  key={leaf.to}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
                  }}
                >
                  <NavLink
                    to={leaf.to}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2.5 transition-colors duration-300 ${
                        isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.06]"
                      }`
                    }
                  >
                    <span className="block text-sm font-medium text-white">{leaf.label}</span>
                    {leaf.hint ? (
                      <span className="mt-0.5 block text-xs leading-snug text-brand-muted">{leaf.hint}</span>
                    ) : null}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The header tightens once you leave the top of the page — the classic cue that
  // you have moved. Threshold well past 0 so it never flickers on rubber-band.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 64);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock the page behind the mobile sheet, and let Escape dismiss it.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <div className="dot-canvas relative min-h-dvh text-brand-text">
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Header sits above the mobile sheet (z-70), which sits above the chat launcher (z-60). */}
      <header
        className={`sticky top-0 z-[80] border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-out ${
          scrolled ? "border-white/[0.09] bg-ink-950/92 shadow-lift" : "border-white/[0.07] bg-ink-950/70"
        }`}
      >
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
          }`}
          aria-hidden={scrolled}
        >
          <div className="overflow-hidden">
            <div className="bg-white">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
                <StripStars />
                <p className="flex items-center justify-center gap-2.5 font-display text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-black sm:gap-3 sm:text-xs sm:tracking-[0.34em]">
                  <MapleLeaf className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>SAFE SECURE PRODUCTIVE</span>
                  <MapleLeaf className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </p>
                <StripStars />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`dot-bg mx-auto flex max-w-7xl items-center gap-4 px-4 transition-[min-height,padding] duration-500 ease-out sm:px-6 lg:gap-8 ${
            scrolled
              ? "min-h-[4.25rem] py-2 sm:min-h-[4.75rem] lg:min-h-[5.25rem]"
              : "min-h-[5.5rem] py-3 sm:min-h-[6.5rem] sm:py-4 lg:min-h-[7.5rem]"
          }`}
        >
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3 sm:gap-4"
            aria-label="Productive Security — home"
          >
            <Crest
              className={`transition-[height] duration-500 ease-out ${
                scrolled ? "h-11 sm:h-12 lg:h-[3.25rem]" : "h-14 sm:h-16 lg:h-[4.5rem]"
              }`}
            />
            <span className="leading-none">
              <span className="block whitespace-nowrap font-display text-sm font-extrabold uppercase tracking-[0.1em] text-white sm:text-base">
                Productive Security
              </span>
              <span className="mt-1.5 hidden whitespace-nowrap font-sans text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-brand-muted sm:block">
                Est. 1997 · Ontario
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center lg:flex" aria-label="Primary">
            {primaryNav.map((group) => (
              <NavItem key={group.to} group={group} />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-6 lg:gap-4">
            <a
              href={phone.href}
              className="hidden whitespace-nowrap font-display text-[0.6875rem] font-semibold tabular-nums tracking-[0.06em] text-brand-muted transition-colors hover:text-white xl:block"
            >
              {phone.display}
            </a>
            <Link
              to={ctaNav.to}
              className="hidden shrink-0 items-center whitespace-nowrap bg-white px-5 py-3 font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink-950 transition hover:bg-white/90 sm:inline-flex"
            >
              {ctaNav.label}
            </Link>

            <button
              type="button"
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ease-out ${
                    mobileOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ease-out ${
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet: a real grouped list, not a cloud of pills. */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dot-bg fixed inset-x-0 bottom-0 top-16 z-[70] overflow-y-auto overscroll-contain bg-ink-950 lg:hidden"
          >
            <motion.nav
              className="mx-auto max-w-7xl px-4 py-6 sm:px-6"
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
            >
              {primaryNav.map((group) => (
                <motion.div
                  key={group.to}
                  className="border-b border-white/[0.07] py-5 first:pt-0"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <NavLink to={group.to} className="block font-display text-3xl font-extrabold text-white">
                    {group.label}
                  </NavLink>
                  {group.children ? (
                    <div className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                      {group.children.map((leaf) => (
                        <NavLink
                          key={leaf.to}
                          to={leaf.to}
                          className={({ isActive }) =>
                            `-mx-2 rounded px-2 py-2 text-[0.9375rem] transition-colors duration-300 ${
                              isActive ? "text-white" : "text-brand-muted hover:text-white"
                            }`
                          }
                        >
                          {leaf.label}
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              ))}

              <motion.div
                className="mt-10 space-y-3 pb-12"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                <Link
                  to={ctaNav.to}
                  className="flex items-center justify-center bg-white py-3.5 font-display text-caps font-bold uppercase text-ink-950 transition-transform duration-300 active:scale-[0.98]"
                >
                  {ctaNav.label}
                </Link>
                <a
                  href={phone.href}
                  className="flex items-center justify-center border border-white/15 py-3.5 font-display text-caps font-bold uppercase tabular-nums text-white transition-colors duration-300 hover:border-white/40"
                >
                  {phone.display}
                </a>
                <p className="pt-3 text-center font-sans text-xs tracking-wide text-brand-muted">
                  Operations desk answers 24/7
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Route change is a cross-fade, not a cut. `mode="wait"` lets the outgoing
          page clear before the next one rises, so the two never overlap. */}
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="dot-bg border-t border-white/[0.07] bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="group flex items-center gap-4 sm:gap-5">
                <Crest className="h-20 sm:h-24" />
                <div>
                  <div className="font-display text-lg uppercase tracking-[0.14em] text-white">
                    Productive Security
                  </div>
                  <div className="mt-2 font-display text-[0.625rem] uppercase tracking-[0.24em] text-brand-accent">
                    SAFE. SECURE. PRODUCTIVE.
                  </div>
                </div>
              </div>
              <p className="mt-6 max-w-prose text-sm leading-relaxed text-brand-muted">
                Toronto-headquartered private security since 1997. Licensed officers, supervision you can audit, and
                reporting your leadership team can rely on.
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
              <div>
                <div className="font-display text-eyebrow uppercase text-brand-muted">Company</div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    { to: "/about/mission", label: "About" },
                    { to: "/services", label: "Services" },
                    { to: "/teams", label: "Teams" },
                    { to: "/blog", label: "Insights" },
                  ].map((l) => (
                    <li key={l.to}>
                      <Link className="text-brand-muted transition-colors hover:text-white" to={l.to}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-display text-eyebrow uppercase text-brand-muted">Careers</div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    { to: "/careers", label: "Working here" },
                    { to: "/careers/jobs", label: "Open roles" },
                    { to: "/careers/culture", label: "Culture" },
                  ].map((l) => (
                    <li key={l.to}>
                      <Link className="text-brand-muted transition-colors hover:text-white" to={l.to}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-display text-eyebrow uppercase text-brand-muted">Contact</div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <a className="font-medium tabular-nums text-white hover:underline" href={phone.href}>
                      {phone.display}
                    </a>
                    <div className="text-xs text-brand-muted">24 hours</div>
                  </li>
                  <li>
                    <a className="text-brand-muted transition-colors hover:text-white" href="mailto:info@prodsec.ca">
                      info@prodsec.ca
                    </a>
                  </li>
                  <li>
                    <address className="not-italic leading-relaxed text-brand-muted">
                      18 Wynford Drive, Suite 711B
                      <br />
                      Toronto, ON
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.07] pt-8 text-xs text-brand-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Productive Security Inc. All rights reserved.</p>
            <p className="font-credit text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-brand-accent sm:text-center">
              Website made and designed by{" "}
              <span className="bg-gradient-to-r from-brand-accent via-white to-brand-accent bg-clip-text text-transparent">
                Divjit Singh Dhatt
              </span>
            </p>
            {/* Ontario requires the agency licence number on advertising — drop it in here. */}
            <p>Toronto, Ontario, Canada</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
