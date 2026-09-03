import { logoutUser } from "@/actions/auth/logout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                {children}
            </main>

            <div className="border-t p-4">
                <form action={logoutUser}>
                    <button
                        type="submit"
                        className="border px-4 py-2 rounded hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
}