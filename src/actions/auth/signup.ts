"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function signupUser(formData: FormData) {

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) return;
    if (!cleanEmail) return;
    if (!password) return;

    if (password.length < 6) return;

    const user = await prisma.user.findUnique({
        where: {
            email: cleanEmail,
        },
    });

    if (user) return;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name: cleanName,
            email: cleanEmail,
            password: hashedPassword,
        },
    });

    redirect("/login");
}