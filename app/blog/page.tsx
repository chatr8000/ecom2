// app/blog/page.tsx
import Link from 'next/link';
import { getPosts, Post } from '../../lib/posts';

const BlogPage = async () => {
  const posts: Post[] = getPosts();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
            <p>{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
