import { Link } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  return (
    <>
      <SeoHead
        title="Insights"
        description="Security insights for property teams across Ontario—construction, condos, healthcare, and more."
        path="/blog"
      />
      <Container className="pt-4 pb-16">
        <p className="font-mono text-xs text-brand-yellow">Blog</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">News & industry insights</h1>
        <p className="mt-4 max-w-2xl text-sm text-brand-muted">
          Practical articles for boards, operators, and site teams—written to be useful, not salesy.
        </p>

        <div className="mt-10 grid gap-4">
          {blogPosts.map((p, idx) => (
            <Reveal key={p.slug} delay={idx * 0.04}>
              <article className="rounded-2xl border border-brand-border dot-bg bg-brand-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-yellow/25">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl text-white">
                      <Link to={`/blog/${p.slug}`} className="hover:text-brand-yellow">
                        {p.title}
                      </Link>
                    </h2>
                    <div className="mt-2 text-xs text-brand-muted">
                      {p.date} · {p.readMinutes} min read
                    </div>
                  </div>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="inline-flex rounded-xl border border-brand-border bg-black/20 px-4 py-2 text-sm font-semibold text-white hover:border-brand-yellow/35"
                  >
                    Read
                  </Link>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">{p.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
