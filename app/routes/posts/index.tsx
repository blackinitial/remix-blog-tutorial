import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { getPosts } from '~/models/post.server';

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json<LoaderData>({posts});
}

export default function PostsRoute() {
  const { posts } = useLoaderData() as LoaderData;
  
  return (
    <main>
      <h1>Posts</h1>

      <Link to="admin" className="text-red-500 underline">
        Admin
      </Link>

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