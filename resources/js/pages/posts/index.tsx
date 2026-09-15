import { Head, Link } from '@inertiajs/react';

interface Post {
  id: number;
  title: string;
  content: string;
  status: 'pending' | 'completed';
  updated_at: string;
}

interface Props {
  posts: Post[];
}

export default function Posts({ posts }: Props) {
  return (
    <>
      <Head title="My Tasks" />

      <div className="p-4">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <p className="mt-1 text-gray-600">
              Manage your tasks here.
            </p>
          </div>

          <Link
            href="/posts/create"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            + Create Task
          </Link>
        </div>

        {/* Posts Table */}
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b last:border-0"
                >
                  <td className="px-4 py-3">
                    {post.id}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {post.title}
                  </td>

                  <td className="max-w-md px-4 py-3">
                    {post.content}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/posts/${post.id}/status`}
                      method="patch"
                      as="button"
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${post.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                    >
                      {post.status === 'completed' ? 'Completed' : 'Pending'}
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(
                      post.updated_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">

                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="rounded-md border px-3 py-1.5 hover:bg-gray-100"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/posts/${post.id}`}
                        method="delete"
                        as="button"
                        className="rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
                      >
                        Delete
                      </Link>

                    </div>
                  </td>
                </tr>
              ))}

              {posts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Posts.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Posts',
      href: '/posts',
    },
  ],
};