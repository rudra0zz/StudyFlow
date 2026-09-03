import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SubjectCard from "@/components/subjects/SubjectCard";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SubjectsPage() {

    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const subjects = await prisma.subject.findMany({
        where: {
            userId: user.id,
        },
        include: {
            _count: {
                select: {
                    tasks: true,
                },
            },
        },
    });

    if (subjects.length === 0) {
        return (
            <div>
                <p>No subjects yet 🥱🥱🥱</p>
                <div>
                    <Link href="/dashboard/subjects/new">
                        New Subject
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto">

            <div className="flex items-center justify-between mb-5 mt-5">
                <h1 className="text-3xl font-bold">
                    Subjects
                </h1>

                <Link
                    href="/dashboard/subjects/new"
                    className="px-4 py-2 rounded-xl border-2 bg-black text-white hover:bg-white hover:text-black transition-colors"
                >
                    New Subject
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {subjects.map((subject) => (

                    <SubjectCard
                        key={subject.id}
                        id={subject.id}
                        name={subject.name}
                        taskCount={subject._count.tasks}
                    />

                ))}

            </div>

        </div>
    );
}