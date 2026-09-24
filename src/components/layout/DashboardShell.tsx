import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">

            <Navbar />

            <main className="flex-1 flex">
                <Sidebar />

                <div className="flex-1">
                    {children}
                </div>
            </main>

        </div>
    );
}