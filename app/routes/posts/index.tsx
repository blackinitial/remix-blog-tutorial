import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

export const loader = async () => {
  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post"
    },
    {
      slug: "second-post-ready",
      title: "Second Post Ready"
    }
  ];

  return json({posts});
}

export default function PostsRoute() {
  const { posts } = useLoaderData();
  
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}