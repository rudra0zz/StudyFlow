import NavLinks from "./NavLinks";

export default function Sidebar() {
    return (
        <aside className="w-64 border-r p-5">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-5">
                Workspace
            </h2>

            <nav>
                <NavLinks />
            </nav>
        </aside>
    );
}