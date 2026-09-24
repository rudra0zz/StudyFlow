import Link from "next/link"

export default function DashboardEmptyState() {
    return (
        <div className="p-20 flex flex-col items-center justify-center gap-3">

            <h2 className="text-xl font-bold">
                No subjects yet
            </h2>

            <div className="flex flex-col items-start">
                <p className="text-gray-700 font-serif">
                    You haven&apos;t created any subjects yet
                </p>
                <p className="text-gray-700 font-serif">
                    create your first subject now
                </p>
            </div>

            <Link
                href="/dashboard/subjects/new"
                className="px-3 py-2 bg-black outline-none text-white rounded-xl hover:bg-gray-700 hover:outline-2
            ">
                Create Subject
            </Link>

        </div>
    )
}