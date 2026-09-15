import { Head, Link, useForm } from '@inertiajs/react';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Props {
  post: Post;
}

export default function Edit({ post }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    title: post.title,
    content: post.content,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    put(`/posts/${post.id}`);
  };

  return (
    <>
      <Head title="Edit Post" />

      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Post</h1>

          <Link
            href="/posts"
            className="rounded-lg border px-4 py-2"
          >
            Back
          </Link>
        </div>

        <form onSubmit={submit} className="max-w-xl space-y-5">

          <div>
            <label className="mb-2 block font-medium">
              Title
            </label>

            <input
              type="text"
              value={data.title}
              onChange={(e) =>
                setData('title', e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              value={data.content}
              onChange={(e) =>
                setData('content', e.target.value)
              }
              rows={5}
              className="w-full rounded-lg border px-3 py-2"
            />

            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
          >
            {processing ? 'Updating...' : 'Update Post'}
          </button>

        </form>
      </div>
    </>
  );
}
Edit.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Posts',
      href: '/posts',
    },
    {
      title: 'Edit',
      href: '/posts',
    },
  ],
};