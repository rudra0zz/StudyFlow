import { getCurrentUser } from "@/lib/auth";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import OverviewCards from "../../components/dashboard/OverviewCards";
import ProgressCard from "../../components/dashboard/ProgressCard";
import { prisma } from "@/lib/prisma";
import SubjectsOverview from "../../components/dashboard/SubjectsOverview";
import DashboardEmptyState from "../../components/dashboard/DashboardEmptyState";
import GoalsOverview from "../../components/dashboard/GoalsOverview";

export default async function DashboardPage() {

    // throw new Error("Testing error boundary");

    const user = await getCurrentUser();

    if (!user) return null;

    const subjectCount = await prisma.subject.count({
        where: {
            userId: user.id,
        },
    });

    const taskCount = await prisma.task.count({
        where: {
            subject: {
                userId: user.id,
            },
        },
    });

    const completedTaskCount = await prisma.task.count({
        where: {
            subject: {
                userId: user.id,
            },
            completed: true,
        },
    });

    const subjects = await prisma.subject.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    tasks: true,
                },
            },
        },
    });

    const goals = await prisma.goal.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            title: true,
            subjects: {
                select: {
                    subject: {
                        select: {
                            tasks: {
                                select: {
                                    completed: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const goalsWithProgress = goals.map((goal) => {
        const tasks = goal.subjects.flatMap(
            (goalSubject) => goalSubject.subject.tasks
        );

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
            (task) => task.completed
        ).length;

        return {
            id: goal.id,
            title: goal.title,
            totalTasks,
            completedTasks,
        };
    });

    return (
        <main>
            <DashboardHeader
                name={user.name}
                createdAt={user.createdAt}
            />

            <OverviewCards
                subjectCount={subjectCount}
                taskCount={taskCount}
                completedTaskCount={completedTaskCount}
            />

            <ProgressCard
                title="Overall Progress"
                completed={completedTaskCount}
                total={taskCount}
            />

            {
                subjects.length === 0
                    ?
                    <DashboardEmptyState />
                    :
                    <SubjectsOverview
                        subjects={subjects}
                    />
            }

            <GoalsOverview goals={goalsWithProgress} />
        </main>
    );
}