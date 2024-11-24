// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

type PostPageProps = {
  params: { slug: string };
};

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'articles', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map(filename => ({
    slug: filename.replace('.md', ''),
  }));
}

export default PostPage;
