import { prisma } from "@/lib/prisma";
import { updateTask } from "@/actions/task-actions";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";

export default async function EditTask({
    params,
}: {
    params: Promise<{ taskId: string, subjectId: string }>
}) {
    const { taskId, subjectId } = await params;

    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    const task = await prisma.task.findFirst({
        where: {
            id: Number(taskId),
            subjectId: Number(subjectId),
            subject: {
                userId: user.id,
            },
        },
    });

    if (!task) {
        notFound();
    }

    return (
        <div>
            <form action={updateTask}>
                <input
                    type="hidden"
                    name="taskId"
                    value={task.id}
                />

                <input
                    type="hidden"
                    name="subjectId"
                    value={subjectId}
                />

                <input
                    type="text"
                    name="title"
                    defaultValue={task.title}
                />

                <button type="submit">
                    Update Task
                </button>
            </form>
        </div>
    )
}