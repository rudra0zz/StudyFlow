import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {

    const user = await getCurrentUser();

    return (
        <div>
            <Link href="/dashboard/subjects">
                Subjects
            </Link>
        </div>
    );
}