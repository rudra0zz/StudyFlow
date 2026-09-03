"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export async function createSubject(formdata: FormData) {

    const subjectName = formdata.get("subjectName") as string;

    const name = subjectName.trim();

    if (!subjectName?.toString().trim()) {
        return;
    }

    if (name.length < 3) {
        return;
    }

    if (name.length > 50) {
        return;
    }

    const user = await getCurrentUser();

    if (!user) return;

    await prisma.subject.create({
        data: {
            name,
            userId: user.id,
        },
    });

    redirect("/dashboard/subjects");
}

export async function updateSubject(formData: FormData) {

    const subjectId = Number(formData.get("subjectId"));
    const subject = formData.get("subject") as string;

    const name = subject.trim();

    if (!subject?.toString().trim()) {
        return;
    }

    if (name.length < 3) {
        return;
    }

    if (name.length > 50) {
        return;
    }

    const user = await getCurrentUser();
    if (!user) return;

    const existingSubject = await prisma.subject.findFirst({
        where: {
            id: subjectId,
            userId: user.id,
        },
    });

    if (!existingSubject) {
        return;
    }

    await prisma.subject.update({
        where: {
            id: subjectId,
        },
        data: {
            name
        }
    })

    redirect("/dashboard/subjects");
}

export async function deleteSubject(formData: FormData) {

    const subjectId = Number(formData.get("subjectId"));

    const user = await getCurrentUser();
    if (!user) return;

    await prisma.subject.delete({
        where: {
            id: subjectId,
            userId: user.id,
        },
    })

    redirect("/dashboard/subjects");
}