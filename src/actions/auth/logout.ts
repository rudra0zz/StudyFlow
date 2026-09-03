"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logoutUser() {

    const cookieStore = await cookies();

    cookieStore.delete("token");

    redirect("/login");
}