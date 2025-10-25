import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSummaries } from "@/lib/blog";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const posts = await getPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "Blog Gatodato",
      description: "Artículos sobre visibilidad en asistentes IA.",
    } satisfies Metadata;
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: `${post.title} · Blog Gatodato`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  } satisfies Metadata;
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="bg-texture">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:px-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-semibold text-[#a04c2d] transition hover:text-[#5c2e1a]"
        >
          ← Volver al blog
        </Link>
        <article className="mt-8 space-y-6 rounded-[40px] border border-[#d9b38a] bg-[#fdf2e3] p-10 shadow-[12px_18px_0_rgba(92,46,26,0.18)]">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a04c2d]">{formattedDate}</p>
            <h1 className="text-3xl font-semibold text-[#5c2e1a]">{post.title}</h1>
            <p className="text-sm text-[#5c2e1a]/80">Por {post.author}</p>
            <p className="text-[#5c2e1a]/80">{post.description}</p>
          </header>
          <div
            className="blog-content prose prose-lg prose-headings:text-[#5c2e1a] prose-p:text-[#5c2e1a]/85 prose-strong:text-[#a04c2d] prose-li:marker:text-[#a04c2d]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  );
}

