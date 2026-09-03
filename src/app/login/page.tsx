import { loginUser } from "@/actions/auth/login";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <form
                action={loginUser}
                className="w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-bold">
                    Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-gray-400"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-gray-400"
                />

                <button
                    type="submit"
                    className="w-full rounded-lg border-2 border-black bg-black px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                >
                    Login
                </button>
            </form>
        </main>
    );
}