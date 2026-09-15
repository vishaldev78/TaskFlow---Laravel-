import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

interface Post {
  id: number;
  title: string;
  content: string;
  status: 'pending' | 'completed';
  updated_at: string;
}

interface Props {
  totalPosts: number;
  myPosts: number;
  pendingPosts: number;
  completedPosts: number;
  recentPosts: Post[];
}

export default function Dashboard({
  totalPosts,
  myPosts,
  pendingPosts,
  completedPosts,
  recentPosts,
}: Props) {
  return (
    <>
      <Head title="Dashboard" />

      <div className="space-y-6 p-6">

        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back 👋
          </h1>

          <p className="mt-1 text-gray-500">
              Manage your tasks and workspace from here.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {/* Total Posts */}
          <div className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-blue-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Total Tasks
                </p>

                <h2 className="mt-2 text-3xl font-bold text-blue-900">
                  {totalPosts}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-xl text-white">
                📝
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-linear-to-br from-amber-50 to-amber-100 p-4 shadow-sm">
            <p className="text-sm font-medium text-amber-700">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-amber-950">
              {pendingPosts}
            </h2>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50 to-emerald-100 p-4 shadow-sm">
            <p className="text-sm font-medium text-emerald-700">Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-emerald-950">
              {completedPosts}
            </h2>
          </div>

          {/* My Posts */}
          <div className="rounded-2xl border border-purple-100 bg-linear-to-br from-purple-50 to-purple-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  My Tasks
                </p>

                <h2 className="mt-2 text-3xl font-bold text-purple-900">
                  {myPosts}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-xl text-white">
                👤
              </div>
            </div>
          </div>

          {/* Create Post */}
          <Link
            href="/posts/create"
            className="rounded-2xl border border-green-100 bg-linear-to-br from-green-50 to-green-100 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Quick Action
                </p>

                <h2 className="mt-2 text-xl font-bold text-green-900">
                  Create Task
                </h2>

                <p className="mt-1 text-sm text-green-700">
                  Add a new task
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-xl text-white">
                +
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Posts */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Tasks
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest tasks
              </p>
            </div>

            <Link
              href="/posts"
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
                View All Tasks
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="divide-y">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between px-6 py-4 transition hover:bg-gray-50"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        #{post.id}
                      </span>

                      <h3 className="truncate font-semibold text-gray-800">
                        {post.title}
                      </h3>
                    </div>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {post.content}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Updated{' '}
                      {new Date(post.updated_at).toLocaleDateString()}
                    </p>

                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${post.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {post.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </div>

                  <div className="ml-4 flex shrink-0 gap-2">
                    <Link
                      href={`/posts/${post.id}/status`}
                      method="patch"
                      as="button"
                      className="rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-gray-100"
                    >
                      {post.status === 'completed' ? 'Reopen' : 'Done'}
                    </Link>
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className="rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-4xl">📝</div>

              <h3 className="mt-3 font-semibold text-gray-800">
                No tasks yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Create your first task to get started.
              </p>

              <Link
                href="/posts/create"
                className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
              >
                Create Task
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Dashboard.layout = {
  breadcrumbs: [
  {
      title: 'Dashboard',
      href: dashboard(),
    },
  ],
};