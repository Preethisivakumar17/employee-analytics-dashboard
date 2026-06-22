import {
    LayoutDashboard,
    Users,
    UserPlus,
    Building2,
    BarChart3
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
    return (

        <div
            className="
            h-screen
            w-64
            bg-slate-950
            border-r
            border-slate-800
            flex
            flex-col
            justify-between
            p-6
            "
        >

            {/* Top */}

            <div>

                {/* Logo */}

                <div className="flex items-center gap-3 mb-12">

                    <Users
                        size={42}
                        className="text-indigo-500"
                    />

                    <div>

                        <h1 className="text-white text-2xl font-bold">

                            Employee

                        </h1>

                        <p className="text-slate-400">

                            Analytics Dashboard

                        </p>

                    </div>

                </div>

                {/* Menu */}

                <div className="space-y-3">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-300 hover:bg-slate-900"
                            }`
                        }
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/employees"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-300 hover:bg-slate-900"
                            }`
                        }
                    >
                        <Users size={20} />
                        Employees
                    </NavLink>

                    <NavLink
                        to="/add-employee"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-300 hover:bg-slate-900"
                            }`
                        }
                    >
                        <UserPlus size={20} />
                        Add Employee
                    </NavLink>

                    <NavLink
                        to="/departments"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-300 hover:bg-slate-900"
                            }`
                        }
                    >
                        <Building2 size={20} />
                        Departments
                    </NavLink>

                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-300 hover:bg-slate-900"
                            }`
                        }
                    >
                        <BarChart3 size={20} />
                        Reports
                    </NavLink>

                    

                </div>

            </div>

            

            </div>

        
    );
}

export default Sidebar;