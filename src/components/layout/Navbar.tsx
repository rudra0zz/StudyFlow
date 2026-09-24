import { logoutUser } from "@/actions/auth/logout";

export default function Navbar() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b bg-gray-200 rounded-2xl">

            <h1 className="text-xl font-semibold">
                StudyFlow
            </h1>

            <div className="flex gap-10 items-center">
                <div>
                    <span>Rivaan</span>
                </div>

                <div>
                    <form action={logoutUser}>
                        <button
                            className="border px-4 py-2 rounded-md hover:bg-gray-100"
                            type="submit"
                        >
                            Logout
                        </button>
                    </form>
                </div>
                
            </div>
        </header>
    );
}