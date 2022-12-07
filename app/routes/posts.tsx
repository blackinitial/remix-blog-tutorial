import { Outlet } from "@remix-run/react";

export default function PostsRoute () {
  return <Outlet />
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="text-red-500">
      <p>Oh no, something went wrong!</p>
      <pre>{error.message}</pre>
    </div>
  );
}