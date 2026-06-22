import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";

function Departments() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        fetchEmployees();

    }, []);

    const fetchEmployees = async () => {

        try {

            const response = await getEmployees();

            setEmployees(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const departmentCounts = {};

    employees.forEach((employee) => {

        departmentCounts[employee.department] =
            (departmentCounts[employee.department] || 0) + 1;

    });

    const departmentData = Object.keys(departmentCounts).map(
        (department) => ({

            department,
            count: departmentCounts[department]

        })
    );

    return (

        <div
            className="
            bg-slate-900
            border border-slate-800
            rounded-3xl
            p-8
            shadow-xl
            "
        >

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-white">

                    Departments

                </h1>

                <p className="text-slate-400 mt-2">

                    View department-wise employee statistics

                </p>

            </div>

            {/* Department Cards */}

            <div
                className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
                "
            >

                {

                    departmentData.map((item) => (

                        <div
                            key={item.department}
                            className="
                            bg-slate-800
                            border border-slate-700
                            rounded-3xl
                            p-8
                            shadow-lg
                            hover:scale-105
                            transition
                            duration-300
                            "
                        >

                            <h2
                                className="
                                text-2xl
                                font-bold
                                text-white
                                "
                            >

                                {item.department}

                            </h2>

                            <p
                                className="
                                text-slate-400
                                mt-4
                                text-lg
                                "
                            >

                                {item.count} Employees

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Departments;