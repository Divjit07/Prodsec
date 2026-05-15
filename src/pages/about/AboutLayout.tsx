import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";

const tabs = [
  { to: "/about/mission", label: "Mission" },
  { to: "/about/history", label: "History" },
  { to: "/about/values", label: "Values" },
];

export default function AboutLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <SeoHead
        title="About"
        description="Mission, history, and values behind Productive Security Inc.—Toronto private security since 1997."
        path={pathname}
      />
      <div className="pt-4">
        <Container>
          <p className="font-mono text-xs text-brand-yellow">About</p>
          <h1 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-5xl">Built on discipline</h1>
          <p className="mt-4 max-w-2xl text-base text-brand-muted">
            A family-led company with a simple promise: professional people, clear communication, and security programs
            that respect your brand.
          </p>

          <div className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-brand-border dot-bg bg-brand-surface p-2">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                  [
                    "relative rounded-xl px-4 py-2 text-sm font-semibold transition",
                    isActive ? "text-brand-dark" : "text-brand-muted hover:text-white",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.span
                        layoutId="aboutTab"
                        className="absolute inset-0 rounded-xl bg-brand-yellow"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    ) : null}
                    <span className="relative z-10">{t.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </Container>

        <div className="mt-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
