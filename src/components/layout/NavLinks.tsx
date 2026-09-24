"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Subjects",
        href: "/dashboard/subjects",
    },
    {
        title: "Goals",
        href: "/dashboard/goals"
    },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-2">
            {navItems.map((item) => {

                const isActive =
                    item.href === "/dashboard"
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={isActive ? "border-b" : ""}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
}