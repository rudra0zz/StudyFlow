import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { createTask } from "@/actions/task-actions";
import TaskItem from "@/components/tasks/TaskItem";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

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

        </div>
    )
}