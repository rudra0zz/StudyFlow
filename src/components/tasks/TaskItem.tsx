"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleTask, deleteTask } from "@/actions/task-actions";

type TaskItemProps = {
    id: number;
    title: string;
    completed: boolean;
    subjectId: number;
};

export default function TaskItem({ id, title, completed, subjectId }: TaskItemProps) {

    const [isCompleted, setIsCompleted] = useState(completed);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    async function handleToggle() {

        const previousState = isCompleted;

        // Optimistically update the UI
        setIsCompleted(!previousState);

        try {

            await toggleTask(id);

        } catch {
            // Revert if the server action fails
            setIsCompleted(previousState);
        }
    }

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
            px-4
            py-3
            hover:shadow-md
            hover:bg-gray-100 
            transition-all
        ">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleToggle}
                />

                <span
                    className={
                        isCompleted
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                    }
                >
                    {title}
                </span>
            </div>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded hover:bg-gray-300"
                >
                    ⋮
                </button>

                {isMenuOpen && (
                    <div className="absolute bottom-full right-0 mb-2 w-28 rounded-lg border border-gray-200 bg-white shadow-md">
                        <Link
                            href={`/dashboard/subjects/${subjectId}/tasks/${id}`}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            Edit
                        </Link>

                        <form action={deleteTask}>
                            <input
                                type="hidden"
                                name="taskId"
                                value={id}
                            />

                            <input
                                type="hidden"
                                name="subjectId"
                                value={subjectId}
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
    )
}