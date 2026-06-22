function DepartmentOverview({ employees }) {

    const departmentCounts = {};

    employees.forEach((employee) => {

        departmentCounts[employee.department] =
            (departmentCounts[employee.department] || 0) + 1;

    });

    return (

        <div
            className=" bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl "
        >

            <h2 className="text-2xl font-bold text-white mb-6">

                Department Overview

            </h2>

            <div className="space-y-5">

                {

                    Object.entries(departmentCounts).map(

                        ([department, count]) => (

                            <div
                                key={department}
                                className="
                                flex
                                justify-between
                                items-center
                                border-b
                                border-slate-800
                                pb-3
                                "
                            >

                                <h3 className="text-slate-300">

                                    {department}

                                </h3>

                                <span
                                    className="
                                    px-4 py-1
                                    rounded-full
                                    bg-indigo-600
                                    text-white
                                    text-sm
                                    "
                                >

                                    {count} Employees

                                </span>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default DepartmentOverview;