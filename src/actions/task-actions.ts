"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export async function createTask(formData: FormData) {

    const title = formData.get("title") as string;
    const subjectId = Number(formData.get("subjectId"));

    const name = title.trim();

    if (!name) {
        return;
    }

    if (name.length < 3 || name.length > 100) {
        return;
    }

    const user = await getCurrentUser();
    if (!user) return;

    const subject = await prisma.subject.findUnique({
        where: {
            id: subjectId,
        },
    })

    if (subject?.userId !== user.id) {
        return;
    }

    await prisma.task.create({
        data: {
            title: name,
            subjectId,
        },
    });

    redirect(`/dashboard/subjects/${subjectId}`)
}

export async function updateTask(formData: FormData) {

    const subjectId = Number(formData.get("subjectId"));
    const title = formData.get("title") as string;

    const name = title.trim();

    if (!name) {
        return;
    }

    if (name.length < 3) {
        return;
    }

    if (name.length > 100) {
        return;
    }

    const user = await getCurrentUser();
    if (!user) return;

    redirect(`/dashboard/subjects/${subjectId}`)
}

export async function deleteTask(formData: FormData) {

    const id = Number(formData.get("taskId"))
    const subjectId = Number(formData.get("subjectId"))

    const user = await getCurrentUser();
    if (!user) return;

    await prisma.task.deleteMany({
        where: {
            id,
            subject: {
                userId: user.id,
            },
        },
    });

    redirect(`/dashboard/subjects/${subjectId}`);
}

export async function toggleTask(taskId: number) {

    const task = await prisma.task.findUnique({
        where: {
            id: taskId,
        },
    })

    if (!task) return;

    await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            completed: !task.completed,
        },
    });
}