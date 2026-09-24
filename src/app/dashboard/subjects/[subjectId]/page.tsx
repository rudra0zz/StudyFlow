import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { createTask } from "@/actions/task-actions";
import TaskItem from "@/components/tasks/TaskItem";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { endSession, startSession } from "@/actions/session-actions";

function formatDuration(seconds: number) {

    if (seconds < 60) {
        return `${Math.floor(seconds)} second`;
    }
    else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)} min`;
    }
    else if (seconds >= 3600) {
        const hours = Math.floor(seconds / (60 * 60));
        const remainingSecs = seconds % 3600;

        if (remainingSecs >= 60) {
            return `${hours} hours ${Math.floor(remainingSecs / 60)} minutes`
        }

        return `${hours} hours`;
    }
}

export default async function SubjectPage({
    params,
}: {
    params: Promise<{ subjectId: string }>
}) {
    const { subjectId } = await params;

    const id = Number(subjectId);

    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const subject = await prisma.subject.findFirst({
        where: {
            id,
            userId: user.id,
        },
    });

    if (!subject) {
        return notFound();
    }

    const tasks = await prisma.task.findMany({
        where: {
            subjectId: id,
        },
    })

    const activeSession = await prisma.session.findFirst({
        where: {
            userId: user.id,
            subjectId: id,
            endedAt: null,
        },
    });

    const sessionHistory = await prisma.session.findMany({
        where: {
            userId: user.id,
            subjectId: id,
        },
        orderBy: {
            startedAt: "desc",
        },
    });

    return (
        <div className="max-w-6xl mx-auto">

            <Link
                href="/dashboard/subjects"
                className="text-sm text-gray-500 hover:text-black transition-colors"
            >
                ← Subjects
            </Link>

            <h1 className="mt-3 text-3xl font-bold">
                {subject.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
                {tasks.length} tasks
            </p>

            <form
                action={createTask}
                className="mt-6 mb-5 flex gap-2"
            >
                <input
                    type="hidden"
                    name="subjectId"
                    value={subject.id}
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Add a task..."
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-gray-400"
                />

                <button
                    type="submit"
                    className="rounded-lg bg-black px-4 py-2 border-2 border-black text-white hover:bg-white hover:text-black transition-colors"
                >
                    Add Task
                </button>
            </form>

            {tasks.length === 0 ? (

                <p>No Tasks Yet🥱</p>

            ) : (
                <div className="space-y-2">

                    {tasks.map(task => (

                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            completed={task.completed}
                            subjectId={id}
                        />
                    ))}
                </div>
            )}

            <section className="mb-8 mt-8">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                        Study Session
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Start a focused study session for this subject.
                    </p>
                </div>

                <div className="rounded-2xl border p-6">
                    {activeSession ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Session in progress
                                </p>

                                <p className="mt-1 text-sm text-gray-600">
                                    Started {activeSession.startedAt.toLocaleString()}
                                </p>
                            </div>

                            <form action={endSession}>
                                <input
                                    type="hidden"
                                    value={id}
                                    name="subjectId"
                                />

                                <button
                                    type="submit"
                                    className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
                                >
                                    End Session
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Ready to study?
                                </p>

                                <p className="mt-1 text-sm text-gray-600">
                                    Start a session when you&apos;re ready to focus.
                                </p>
                            </div>

                            <form action={startSession}>
                                <input
                                    type="hidden"
                                    value={id}
                                    name="subjectId"
                                />

                                <button
                                    type="submit"
                                    className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
                                >
                                    Start Session
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </section>

            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                        Session History
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Your previous study sessions for this subject.
                    </p>
                </div>

                {sessionHistory.length === 0 ? (
                    <div className="rounded-2xl border p-6 text-center">
                        <p className="text-sm text-gray-600">
                            No study sessions yet.
                        </p>
                    </div>
                ) : (
                    <div className="rounded-2xl border divide-y">
                        {sessionHistory.map((session) => {
                            const duration = session.endedAt
                                ? (session.endedAt.getTime() - session.startedAt.getTime()) / 1000
                                : null;

                            const durationText =
                                duration !== null
                                    ? formatDuration(duration)
                                    : null;

                            return (
                                <div
                                    key={session.id}
                                    className="p-5 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {session.startedAt.toLocaleString()}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-600">
                                            {session.endedAt
                                                ? `Ended ${session.endedAt.toLocaleString()}`
                                                : "Currently active"}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-600">
                                        {session.endedAt ? durationText : "Active"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

        </div>
    )
}