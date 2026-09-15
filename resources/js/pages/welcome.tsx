import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="TaskFlow - Manage Your Tasks" />

            <div className="min-h-screen bg-white text-gray-900">
                {/* Navbar */}
                <nav className="border-b border-gray-100">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                                ✓
                            </div>
                            <span className="text-xl font-bold">
                                TaskFlow
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section className="relative overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 lg:pb-28 lg:pt-32">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                                ✨ Simple. Fast. Productive.
                            </div>

                            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                                Get Things Done
                                <span className="block text-blue-600">
                                    Without the Stress.
                                </span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                                TaskFlow helps you organize your daily tasks,
                                track your progress, and stay focused on what
                                matters most.
                            </p>

                            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    href="/register"
                                    className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                                >
                                    Start for Free →
                                </Link>

                                <Link
                                    href="/login"
                                    className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preview */}
                <section className="bg-gray-50 px-6 py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
                            {/* Fake browser header */}
                            <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
                                <div className="h-3 w-3 rounded-full bg-red-400" />
                                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                <div className="h-3 w-3 rounded-full bg-green-400" />

                                <div className="ml-4 flex-1 rounded-lg bg-gray-50 px-4 py-2 text-xs text-gray-400">
                                    taskflow.app/dashboard
                                </div>
                            </div>

                            <div className="grid gap-8 p-6 md:grid-cols-3">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Tasks
                                    </p>
                                    <p className="mt-2 text-3xl font-bold">
                                        24
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Completed
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-green-600">
                                        18
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Pending
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-orange-500">
                                        6
                                    </p>
                                </div>
                            </div>

                            <div className="mx-6 mb-6 space-y-3">
                                {[
                                    ['Complete Laravel project', true],
                                    ['Practice React components', true],
                                    ['Prepare for interview', false],
                                ].map(([task, completed], index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
                                    >
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                                                completed
                                                    ? 'border-blue-600 bg-blue-600 text-xs text-white'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {completed ? '✓' : ''}
                                        </div>

                                        <span
                                            className={
                                                completed
                                                    ? 'text-gray-400 line-through'
                                                    : 'font-medium'
                                            }
                                        >
                                            {task}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="px-6 py-24">
                    <div className="mx-auto max-w-6xl">
                        <div className="mx-auto mb-14 max-w-2xl text-center">
                            <p className="font-semibold text-blue-600">
                                EVERYTHING YOU NEED
                            </p>

                            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                Your productivity, simplified.
                            </h2>

                            <p className="mt-4 text-gray-500">
                                Everything you need to manage your tasks in one
                                clean and simple workspace.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <Feature
                                icon="✓"
                                title="Easy Task Management"
                                text="Create, update, complete, and delete tasks in seconds."
                            />

                            <Feature
                                icon="📊"
                                title="Track Progress"
                                text="See your completed and pending tasks at a glance."
                            />

                            <Feature
                                icon="⚡"
                                title="Stay Productive"
                                text="Keep your work organized and focus on what matters."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 pb-24">
                    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-blue-600 px-8 py-16 text-center text-white">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Ready to organize your day?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-blue-100">
                            Start managing your tasks today and make every day
                            more productive.
                        </p>

                        <Link
                            href="/register"
                            className="mt-8 inline-block rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-600 shadow-lg hover:bg-gray-50"
                        >
                            Create Your Free Account
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-100 px-6 py-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-gray-400 sm:flex-row">
                        <p>© 2026 TaskFlow. All rights reserved.</p>

                        <p>Built with Laravel + React</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

function Feature({
    icon,
    title,
    text,
}: {
    icon: string;
    title: string;
    text: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                {icon}
            </div>

            <h3 className="mt-6 text-lg font-bold">{title}</h3>

            <p className="mt-2 leading-7 text-gray-500">{text}</p>
        </div>
    );
}