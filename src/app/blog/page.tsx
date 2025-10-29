import Link from "next/link";
import { getPostSummaries } from "@/lib/blog";

export const metadata = {
  title: "Blog Gatodato",
  description:
    "Historias, guías y aprendizajes sobre visibilidad en asistentes IA, IA Overview y estrategias conversacionales.",
};

export default async function BlogPage() {
  const posts = await getPostSummaries();

  return (
    <main className="bg-texture">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:px-10">
        <header className="space-y-4 text-center">
          <h1 className="section-title text-4xl">Blog Gatodato</h1>
          <p className="text-foreground-80">
            Experimentamos con prompts, datos y frameworks para conquistar los nuevos motores de búsqueda impulsados
            por IA.
          </p>
        </header>

        <div className="mt-16 space-y-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[32px] border border-theme bg-card p-8 shadow-[10px_14px_0_var(--shadow-md)] transition hover:shadow-[12px_18px_0_var(--shadow-xl)]"
            >
              <header className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  {new Date(post.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                  <Link href={`/blog/${post.slug}`} className="transition hover:text-[var(--accent)]">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-foreground-80">Por {post.author}</p>
              </header>
              <p className="mt-4 text-foreground-80">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center font-semibold text-accent transition hover:text-foreground"
              >
                Leer artículo →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

