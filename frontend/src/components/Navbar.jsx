import { Bell, Search } from "lucide-react";

function Navbar() {
    return (
        <header
            className="
            h-20
            border-b border-slate-800
            bg-slate-950
            px-8
            flex
            justify-between
            items-center
            "
        >

            <div>

                <h1 className="text-3xl font-bold text-white">

                    Employee Management

                </h1>

                <p className="text-slate-400">

                    Dashboard Overview

                </p>

            </div>

            <div className="flex gap-6">

                <Search
                    className="text-slate-400"
                />

                <Bell
                    className="text-slate-400"
                />

            </div>

        </header>
    );
}

export default Navbar;