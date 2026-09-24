"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function createGoal(formdata: FormData) {

    const title = formdata.get("title") as string;
    const goalName = title.trim();

    if (!goalName) return;
    if (goalName.length < 3) return;
    if (goalName.length > 50) return;

    const user = await getCurrentUser();
    if (!user) return;

    await prisma.goal.create({
        data: {
            title: goalName,
            userId: user.id,
        },
    });

    redirect("/dashboard/goals");
}

export async function connectSubject(formData: FormData) {
    const goalId = Number(formData.get("goalId"));
    const subjectId = Number(formData.get("subjectId"));

    const user = await getCurrentUser();

    if (!user) return;

    const goal = await prisma.goal.findFirst({
        where: {
            id: goalId,
            userId: user.id,
        },
    });

    if (!goal) return;

    const subject = await prisma.subject.findFirst({
        where: {
            id: subjectId,
            userId: user.id,
        },
    });

    if (!subject) return;

    await prisma.goalSubject.create({
        data: {
            goalId,
            subjectId,
        },
    });

    redirect(`/dashboard/goals/${goalId}`);
}

export async function disconnectSubject(formData: FormData) {
    const goalId = Number(formData.get("goalId"));
    const subjectId = Number(formData.get("subjectId"));

    const user = await getCurrentUser();

    if (!user) return;

    const goal = await prisma.goal.findFirst({
        where: {
            id: goalId,
            userId: user.id,
        },
    });

    if (!goal) return;

    const subject = await prisma.subject.findFirst({
        where: {
            id: subjectId,
            userId: user.id,
        },
    });

    if (!subject) return;

    await prisma.goalSubject.delete({
        where: {
            goalId_subjectId: {
                goalId,
                subjectId,
            },
        },
    });

    redirect(`/dashboard/goals/${goalId}`);
}