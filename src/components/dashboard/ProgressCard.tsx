

type ProgressCardProps = {
    title: string;
    completed: number;
    total: number;
};

export default function ProgressCard({ title, completed, total }: ProgressCardProps) {

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="px-10">
            <div className="flex flex-col max-w-xl items-start w-fit p-6 border rounded-2xl gap-3 mt-10">
                <h1 className="text-2xl font-mono font-semibold">
                    {title}
                </h1>

                <p>
                    {completed} of {total} tasks completed
                </p>

                <div className="w-80 h-6 bg-gray-200 rounded-2xl border">
                    <div
                        className="h-full bg-black/70 rounded-2xl"
                        style={{ width: `${percentage}%` }}>

                    </div>
                </div>

                <p>
                    {percentage}%
                </p>
            </div>
        </div>
    )
}