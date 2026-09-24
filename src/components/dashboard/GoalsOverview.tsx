import Link from "next/link";

type Goal = {
    id: number;
    title: string;
    totalTasks: number;
    completedTasks: number;
};

type GoalsOverviewProps = {
    goals: Goal[];
};

export default function GoalsOverview({
    goals,
}: GoalsOverviewProps) {
    return (
        <section className="px-6 mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    Goals
                </h2>

                <Link
                    href="/dashboard/goals"
                    className="text-sm underline hover:no-underline"
                >
                    View all
                </Link>
            </div>

            {goals.length === 0 ? (
                <div className="rounded-2xl border p-6 text-center">
                    <p className="text-gray-600">
                        No goals yet.
                    </p>

                    <Link
                        href="/dashboard/goals/new"
                        className="mt-3 inline-block underline"
                    >
                        Create your first goal
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goals.map((goal) => {
                        const percentage =
                            goal.totalTasks === 0
                                ? 0
                                : Math.round(
                                    (goal.completedTasks / goal.totalTasks) * 100
                                );

                        return (
                            <Link
                                key={goal.id}
                                href={`/dashboard/goals/${goal.id}`}
                                className="rounded-2xl border p-5 hover:bg-gray-50 transition"
                            >
                                <h3 className="font-semibold">
                                    {goal.title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    {goal.completedTasks} / {goal.totalTasks} tasks completed
                                </p>

                                <div className="mt-4 h-2 rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-black"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                                <p className="mt-2 text-sm text-gray-600">
                                    {percentage}%
                                </p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

