import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

type Params = { slug: string };

const query = `
  *[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    publishedAt,
    "category": category->title
  }
`;

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
  return slugs.map((post: any) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) return notFound();

  return (
    <article className="prose prose-invert max-w-3xl mx-auto px-6 py-20">
      <h1>{post.title}</h1>
      <p className="text-sm text-white/60 mb-4">
        Category: {post.category} • {new Date(post.publishedAt).toDateString()}
      </p>
      <PortableText value={post.body} />
    </article>
  );
}
