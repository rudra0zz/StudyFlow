"use client";

import { useActionState } from "react";
import { createSubject } from "@/actions/subject-actions";

export default function CreateSubjectPage() {

    const [state, formAction, isPending] = useActionState(createSubject, null);

    return (

        <div className="min-h-screen flex items-center justify-center px-4">

            <form
                action={formAction}
                className="w-full max-w-md flex flex-col gap-4"
            >

                <div>
                    <label
                        htmlFor="subjectName"
                        className="block text-sm font-medium mb-2"
                    >
                        Subject name
                    </label>

                    <input
                        id="subjectName"
                        type="text"
                        name="subjectName"
                        required
                        placeholder="e.g. Data Structures"
                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-gray-700"
                    />

                    {state?.error && (
                        <p className="mt-2 text-sm text-red-500">
                            {state.error}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white py-3 rounded-xl border-2 border-black transition hover:bg-white hover:text-black"
                >
                    {isPending? "Creating..." : "Create Subject"}
                </button>

            </form>

        </div>

    )
}