import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link";

export default async function GoalPage() {

    const user = await getCurrentUser();
    if (!user) return;

    const goals = await prisma.goal.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            title: true,
            _count: {
                select: {
                    subjects: true,
                },
            },
        },
    });

    return (

        <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Goals
                    </h1>

                    <p className="mt-1 text-sm text-gray-600">
                        Track what you&apos;re working toward.
                    </p>
                </div>

                <Link
                    href="/dashboard/goals/new"
                    className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
                >
                    Create Goal
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {goals.map((goal) => (

                    <Link
                        key={goal.id}
                        href={`/dashboard/goals/${goal.id}`}
                        className="block rounded-2xl border p-6 hover:bg-gray-50 transition"
                    >
                        <h2 className="text-lg font-semibold">
                            {goal.title}
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            {goal._count.subjects} subjects connected
                        </p>
                    </Link>

                ))}

            </div>

        </div>

    )
}