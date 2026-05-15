import { Link, Navigate, useParams } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { blogBody, getBlogPost } from "../data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const body = blogBody(post.slug);

  return (
    <>
      <SeoHead title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <Container className="pt-4 pb-16">
        <p className="font-mono text-xs text-brand-yellow">Insights</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl text-white sm:text-5xl">{post.title}</h1>
        <div className="mt-3 text-xs text-brand-muted">
          {post.date} · {post.readMinutes} min read
        </div>

        <div className="mt-10 max-w-3xl space-y-5 text-sm leading-relaxed text-brand-text/90">
          {body.map((para, idx) => (
            <Reveal key={idx} delay={idx * 0.04}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link to="/blog" className="text-sm font-semibold text-brand-yellow hover:underline">
            ← Back to insights
          </Link>
        </Reveal>
      </Container>
    </>
  );
}
