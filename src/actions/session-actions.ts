"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


export async function startSession(formdata: FormData) {

    const subjectId = Number(formdata.get("subjectId"));

    const user = await getCurrentUser();       // getting the current user
    if (!user) return;

    const activeSession = await prisma.session.findFirst({      // does the user have an active session
        where: {
            userId: user.id,
            endedAt: null,
        },
    });

    if (activeSession) return;          // if yes then reject the request

    const subject = await prisma.subject.findFirst({     // is current user the owner of the subject
        where: {
            userId: user.id,
            id: subjectId,
        },
    });

    if (!subject) return;      // if not then reject the request

    await prisma.session.create({
        data: {
            userId: user.id,
            subjectId,
        },
    });

    redirect(`/dashboard/subjects/${subjectId}`);
}

export async function endSession(formdata: FormData) {

    const subjectId = Number(formdata.get("subjectId"));

    const user = await getCurrentUser();       // getting the current user
    if (!user) return;

    const activeSession = await prisma.session.findFirst({      // does the user have an active session
        where: {
            userId: user.id,
            subjectId,
            endedAt: null,
        },
    });

    if (activeSession) {
        await prisma.session.update({
            where: {
                id: activeSession.id,
            },
            data: {
                endedAt: new Date(),
            },
        });
    }

    redirect(`/dashboard/subjects/${subjectId}`);
}