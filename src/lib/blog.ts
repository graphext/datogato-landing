import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogMetadata = {
  title: string;
  description: string;
  date: string;
  author: string;
};

export type BlogPost = BlogMetadata & {
  slug: string;
  content: string;
};

export type BlogSummary = BlogMetadata & {
  slug: string;
};

async function readPostFile(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const file = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(file);

  const metadata = {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? ""),
  } satisfies BlogMetadata;

  if (!metadata.title || !metadata.description || !metadata.date || !metadata.author) {
    throw new Error(`Invalid frontmatter in post: ${slug}`);
  }

  return { metadata, content };
}

export async function getAllPostSlugs() {
  const files = await fs.readdir(BLOG_DIR);
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""));
}

export async function getPostSummaries(): Promise<BlogSummary[]> {
  try {
    const slugs = await getAllPostSlugs();
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const { metadata } = await readPostFile(slug);

        return {
          slug,
          ...metadata,
        } satisfies BlogSummary;
      }),
    );

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Failed to read blog summaries", error);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const summaries = await getPostSummaries();
  const posts = await Promise.all(
    summaries.map(async ({ slug, ...metadata }) => {
      const { content } = await readPostFile(slug);
      const htmlContent = await remark().use(html).process(content);

      return {
        slug,
        ...metadata,
        content: String(htmlContent),
      } satisfies BlogPost;
    }),
  );

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { metadata, content } = await readPostFile(slug);
    const htmlContent = await remark().use(html).process(content);

    return {
      slug,
      ...metadata,
      content: String(htmlContent),
    } satisfies BlogPost;
  } catch (error) {
    console.error(`Failed to load post ${slug}`, error);
    return null;
  }
}

