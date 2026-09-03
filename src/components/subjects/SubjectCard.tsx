"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteSubject } from "@/actions/subject-actions";

type SubjectCardProps = {
    id: number;
    name: string;
    taskCount: number;
}

export default function SubjectCard({ id, name, taskCount }: SubjectCardProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="
            group 
            relative 
            flex 
            items-center 
            justify-between 
            gap-3 
            border
            border-gray-200 
            rounded-lg
            p-8
            min-h-28
            hover:shadow-md
           hover:bg-gray-100 
           transition-colors
           ">

            <Link href={`/dashboard/subjects/${id}`}>
                <h2 className="font-semibold">
                    {name}
                </h2>

                <p className="text-sm text-gray-500">
                    {taskCount} tasks
                </p>
            </Link>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="opacity-0 absolute left-2 bottom-4 group-hover:opacity-100 transition-opacity px-2 py-1 rounded hover:bg-gray-200"
                >
                    ⋮
                </button>

                {isMenuOpen && (
                    <div className="absolute bottom-8 right-1 w-28 rounded-lg border border-gray-200 bg-white shadow-md">
                        <Link
                            href={`/dashboard/subjects/${id}/edit`}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            Edit
                        </Link>

                        <form action={deleteSubject}>

                            <input
                                type="hidden"
                                name="subjectId"
                                value={id}
                            />

                            <button
                                type="submit"
                                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                )}
            </div>

        </div>
    );
}