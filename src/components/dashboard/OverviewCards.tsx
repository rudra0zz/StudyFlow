

type OverviewCardsProps = {
    subjectCount: number;
    taskCount: number;
    completedTaskCount: number;
};


export default function OverviewCards({ subjectCount, taskCount, completedTaskCount }: OverviewCardsProps) {

    const cards = [
        {
            title: "Subjects",
            value: subjectCount,
        },
        {
            title: "Tasks",
            value: taskCount,
        },
        {
            title: "Completed",
            value: completedTaskCount,
        },
    ];

    return (
        <div className="grid gap-1 md:grid-cols-3 px-20">
            {cards.map((card) => (

                <div
                    className="flex flex-col h-45 w-60 border-0 hover:border-2 px-4 gap-3 transition bg-gray-300 rounded-2xl mt-3 py-3 hover:bg-slate-200 hover:shadow-xl"
                    key={card.title}
                >

                    <h1 className="text-xl font-bold">{card.title}</h1>

                    <p className="text-sm font-medium text-gray-700">
                        count:{" "}
                        <span className="font-serif text-black text-md">
                            {card.value}
                        </span>
                    </p>

                </div>

            ))}
        </div>
    )
}