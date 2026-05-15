import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";

export default function Mission() {
  return (
    <>
      <SeoHead
        title="Mission"
        description="Corporate mission for Productive Security Inc.—professional security services across Ontario."
        path="/about/mission"
      />
      <section className="relative overflow-hidden border-y border-brand-border dot-bg bg-brand-surface">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2000&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/80 to-brand-dark" />
        <Container className="relative py-16 sm:py-20">
          <Reveal>
            <h2 className="max-w-3xl font-display text-3xl text-white sm:text-4xl">
              Protect people and property with calm confidence—without compromising respect.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-text/90">
              Our mission is to deliver dependable security outcomes through trained professionals, accountable
              supervision, and partnerships built on honesty. We show up prepared, communicate clearly, and adapt as your
              site evolves.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
