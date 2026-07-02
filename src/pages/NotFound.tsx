import { Link } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
import { Container } from "../components/Container";

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="Page not found"
        description="The page you requested could not be found."
        path="/404"
        noIndex
      />
      <Container className="py-20 text-center">
        <p className="font-mono text-xs text-brand-yellow">404</p>
        <h1 className="mt-3 font-display text-5xl text-white">Lost on patrol</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-brand-muted">
          This route doesn’t exist. Head back to HQ and we’ll get you oriented.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex rounded-xl bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-dark hover:brightness-105"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex rounded-xl border border-brand-border dot-bg bg-brand-surface px-5 py-3 text-sm font-semibold text-white hover:border-brand-yellow/35"
          >
            Contact
          </Link>
        </div>
      </Container>
    </>
  );
}
