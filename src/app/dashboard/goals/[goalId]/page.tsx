import { connectSubject, disconnectSubject } from "@/actions/goal-actions";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation";
import ProgressCard from "../../../../components/dashboard/ProgressCard";

export default async function GoalDetailsPage({
    params,
}: {
    params: Promise<{ goalId: string }>
}) {
    const { goalId } = await params;
    const id = Number(goalId);

    const user = await getCurrentUser();
    if (!user) return;

    const goal = await prisma.goal.findUnique({
        where: {
            id,
            userId: user?.id,
        },
    });

    const goalSubject = await prisma.goalSubject.findMany({
        where: {
            goalId: id,
        },
        include: {
            subject: true,
        }
    });

    if (!goal) return notFound();

    const availableSubjects = await prisma.subject.findMany({
        where: {
            userId: user.id,

            goals: {
                none: {
                    goalId: id,
                },
            },
        },
    });

    const totalTasks = await prisma.task.count({
        where: {
            subject: {
                goals: {
                    some: {
                        goalId: id,
                    },
                },
            },
        },
    });

    const completedTasks = await prisma.task.count({
        where: {
            completed: true,
            subject: {
                goals: {
                    some: {
                        goalId: id,
                    },
                },
            },
        },
    });

    return (

        <div className="px-6 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold">
                    {goal.title}
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                    Track your progress and manage the subjects contributing to this goal.
                </p>
            </div>

            <ProgressCard
                title={`${goal.title} Progress`}
                completed={completedTasks}
                total={totalTasks}
            />

            <section className="mb-8 mt-10">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                        Connected Subjects
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Subjects contributing to this goal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goalSubject.map((x) => (
                        <div
                            key={x.subject.id}
                            className="rounded-2xl border p-5 flex items-center justify-between"
                        >
                            <h3 className="font-medium">
                                {x.subject.name}
                            </h3>

                            <form action={disconnectSubject}>
                                <input
                                    type="hidden"
                                    value={x.subjectId}
                                    name="subjectId"
                                />

                                <input
                                    type="hidden"
                                    value={x.goalId}
                                    name="goalId"
                                />

                                <button
                                    type="submit"
                                    className="text-sm underline hover:no-underline"
                                >
                                    Disconnect
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                        Add Subjects
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Connect subjects that contribute to this goal.
                    </p>
                </div>

                {availableSubjects.length === 0 ? (
                    <div className="rounded-2xl border p-6 text-center">
                        <p className="text-sm text-gray-600">
                            All your subjects are already connected to this goal.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableSubjects.map((x) => (
                            <div
                                key={x.id}
                                className="rounded-2xl border p-5 flex items-center justify-between"
                            >
                                <h3 className="font-medium">
                                    {x.name}
                                </h3>

                                <form action={connectSubject}>
                                    <input
                                        type="hidden"
                                        value={x.id}
                                        name="subjectId"
                                    />

                                    <input
                                        type="hidden"
                                        value={goalId}
                                        name="goalId"
                                    />

                                    <button
                                        type="submit"
                                        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 transition"
                                    >
                                        Connect
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}