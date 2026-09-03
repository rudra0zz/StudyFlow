"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) return;
    if (!password) return;

    if (password.length < 6) return;

    const user = await prisma.user.findUnique({
        where: {
            email: cleanEmail,
        },
    });

    if (!user) return;

    const isPasswordValid = await bcrypt.compare(password, user.password!);

    if (!isPasswordValid) return;

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    redirect("/dashboard");
}