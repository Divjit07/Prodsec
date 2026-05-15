import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ctaNav, headerFlatLinks } from "../data/nav";
import { services } from "../data/services";
import { brandImages } from "../data/brandAssets";
import { ChatWidget } from "./ChatWidget";

function navClass(isActive: boolean) {
  return [
    "whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] font-medium tracking-wide transition sm:px-2.5 sm:text-sm",
    isActive
      ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
      : "text-brand-muted hover:bg-white/5 hover:text-white",
  ].join(" ");
}

export function Layout() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="noise dot-canvas relative min-h-dvh text-brand-text">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="dot-bg sticky top-0 z-40 border-b border-white/10 bg-brand-navy-900/90 backdrop-blur-md">
        <div className="border-b border-slate-300/80 bg-[#eef2f8] py-2 sm:py-2.5">
          <p
            className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 text-center font-sans text-[0.8125rem] font-bold leading-none tracking-[0.12em] text-brand-ink sm:gap-x-10 sm:px-6 sm:text-sm sm:tracking-[0.16em] md:gap-x-14 md:text-base md:tracking-[0.2em]"
          >
            <span>Safe.</span>
            <span>Secure.</span>
            <span>Productive.</span>
          </p>
        </div>
        <div className="dot-bg border-b border-white/5 bg-brand-navy-950/80">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
            <Link to="/" className="group flex min-w-0 items-center gap-3 sm:gap-3.5">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-[52px] sm:w-[52px]">
                <img
                  src={brandImages.logo}
                  alt="Productive Security"
                  className="max-h-full max-w-full object-contain object-center"
                  width={52}
                  height={52}
                  decoding="async"
                />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate font-display text-base tracking-[0.12em] text-white sm:text-lg">
                  PRODUCTIVE SECURITY
                </span>
                <span className="block text-[11px] text-brand-muted sm:text-xs">
                  Established 1997 · Private security · Ontario
                </span>
              </span>
            </Link>
            <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              <a
                className="hidden text-right text-sm leading-snug text-brand-muted transition hover:text-brand-text md:block"
                href="tel:+14165359341"
              >
                <span className="block text-[11px] font-medium tracking-wide text-brand-muted">Give us a call at</span>
                <span className="mt-0.5 block font-semibold tabular-nums text-white">416.535.9341</span>
              </a>
              <Link
                to={ctaNav.to}
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-brand-ink shadow-sm transition hover:bg-white/95 sm:text-sm"
              >
                {ctaNav.label}
              </Link>
            </div>
          </div>
        </div>

        <nav
          className="mx-auto hidden max-w-7xl items-center gap-0.5 overflow-x-auto px-4 py-2 sm:px-6 lg:flex"
          aria-label="Primary"
        >
          {headerFlatLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => navClass(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-2 border-t border-white/5 px-4 py-2.5 sm:px-6 lg:hidden">
          <a className="min-w-0 text-xs leading-snug text-brand-muted hover:text-brand-text" href="tel:+14165359341">
            <span className="block text-[10px] font-medium uppercase tracking-wide text-brand-muted/90">
              Give us a call at
            </span>
            <span className="font-semibold tabular-nums text-white">416.535.9341</span>
          </a>
          <div className="flex items-center gap-2">
            <Link
              to={ctaNav.to}
              className="inline-flex rounded-md border border-white/20 bg-white px-3 py-1.5 text-xs font-semibold text-brand-ink"
            >
              Quote
            </Link>
            <button
              type="button"
              className="dot-bg inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-brand-surface text-white"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">Open menu</span>
              <span aria-hidden className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-4 rounded bg-white transition ${
                    mobileOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-4 rounded bg-white transition ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-4 rounded bg-white transition ${
                    mobileOpen ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="dot-bg border-t border-white/10 bg-brand-navy-950 lg:hidden"
            >
              <div className="mx-auto max-h-[min(70vh,calc(100dvh-8rem))] max-w-7xl space-y-4 overflow-y-auto px-4 py-4">
                <div className="flex flex-wrap gap-1">
                  {headerFlatLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          "rounded-md border border-white/10 px-3 py-2 text-sm",
                          isActive ? "bg-white/10 text-white" : "text-brand-muted hover:bg-white/5 hover:text-white",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
                <div className="dot-bg rounded-xl border border-white/10 bg-brand-surface/80 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                    Service sectors
                  </div>
                  <div className="mt-2 grid gap-1 sm:grid-cols-2">
                    {services.map((s) => (
                      <NavLink
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className={({ isActive }) =>
                          [
                            "rounded-md px-2 py-1.5 text-sm",
                            isActive ? "bg-white/10 text-white" : "text-brand-muted hover:bg-white/5 hover:text-white",
                          ].join(" ")
                        }
                      >
                        {s.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="main" className="pb-16">
        <Outlet />
      </main>

      <footer className="dot-bg border-t border-white/10 bg-brand-navy-950/90">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={brandImages.logo}
                alt="Productive Security Inc."
                className="h-14 w-14 shrink-0 object-contain object-center sm:h-16 sm:w-16"
                width={64}
                height={64}
                decoding="async"
              />
              <div className="font-display text-lg tracking-wide text-white">Productive Security</div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              Toronto-headquartered private security since 1997. We staff commercial, residential, retail, healthcare,
              construction, and event programs with licensed professionals, accountable supervision, and reporting your
              leadership team can rely on.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Visit</div>
            <address className="mt-3 not-italic text-sm leading-relaxed text-brand-muted">
              18 Wynford Drive, Suite 711B
              <br />
              Toronto, ON
            </address>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              <li>
                <span className="text-brand-muted">Give us a call at </span>
                <a className="font-semibold text-white hover:text-white" href="tel:+14165359341">
                  416.535.9341
                </a>{" "}
                <span className="text-brand-muted/80">(24/7)</span>
              </li>
              <li>
                <a className="hover:text-white" href="mailto:info@prodsec.ca">
                  info@prodsec.ca
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Explore</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-brand-muted hover:text-white" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="text-brand-muted hover:text-white" to="/careers/jobs">
                  Careers & jobs
                </Link>
              </li>
              <li>
                <Link className="text-brand-muted hover:text-white" to="/quote">
                  Request a proposal
                </Link>
              </li>
              <li>
                <Link className="text-brand-muted hover:text-white" to="/blog">
                  Insights
                </Link>
              </li>
              <li>
                <Link className="text-brand-muted hover:text-white" to="/client-portal">
                  Client portal
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-brand-muted">
          © {new Date().getFullYear()} Productive Security Inc. All rights reserved.
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
