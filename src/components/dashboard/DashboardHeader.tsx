

type DashboardHeaderProps = {
    name: string;
    createdAt: Date;
};

export default function DashboardHeader({ name, createdAt }: DashboardHeaderProps) {

    const today = new Date();

    const difference = today.getTime() - createdAt.getTime();

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    return (
        <section className="px-6 py-8">
            <h1 className="inline-block text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome, {name}
            </h1>

            <p className="mt-2 text-gray-500">
                Your StudyFlow journey started{" "}
                <span className="font-medium font-serif text-gray-700">
                    {days} {days === 1 ? "day" : "days"} ago
                </span>.
            </p>
        </section>
    );
}