

type SubjectsOverviewProps = {
    subjects: {
        id: number;
        name: string;
        _count: {
            tasks: number;
        };
    }[];
};

export default function SubjectsOverview({ subjects }: SubjectsOverviewProps) {
    return (
        <div className="flex flex-col px-20 mt-10">

            <h1 className="font-bold text-2xl">
                Your Subjects
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-5">

                {subjects.map((subject) => (
                    <div key={subject.id} className=" bg-lime-200 w-full h-40 rounded-2xl border p-6">
                        <h3 className="font-serif font-semibold">
                            {subject.name}
                        </h3>
                        <p>
                            {subject._count.tasks} Tasks
                        </p>
                    </div>
                ))}

            </div>
        </div>
    )
}