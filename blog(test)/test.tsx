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

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <article className="max-w-3xl mx-auto bg-[#111] p-8 rounded-2xl shadow-lg shadow-white/5 border border-white/10 transition duration-300">
        <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>

        <div className="flex items-center justify-between text-sm text-white/60 mb-8">
          <span className="inline-block px-3 py-1 bg-white/10 text-xs font-medium rounded-full">
            {post.category}
          </span>
          <time>{formattedDate}</time>
        </div>

        <hr className="border-white/10 mb-8" />

        <div className="prose prose-invert prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-blockquote:border-l-white/20">
          <PortableText value={post.body} />
        </div>
      </article>
    </div>
  );
}
