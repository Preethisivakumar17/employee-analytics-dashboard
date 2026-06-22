import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import DepartmentOverview from "../components/DepartmentOverview";
import StatusChart from "../components/StatusChart";
import PositionChart from "../components/PositionChart";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    getDashboard,
    getEmployees
} from "../services/employeeService";

function Reports() {

    const [dashboardData, setDashboardData] = useState({});
    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const dashboardResponse =
                await getDashboard();

            setDashboardData(
                dashboardResponse.data
            );

            const employeeResponse =
                await getEmployees();

            setEmployees(
                employeeResponse.data
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const averageSalary = employees.length > 0
        ? (
            employees.reduce(
                (sum, employee) =>
                    sum + employee.salary,
                0
            ) / employees.length
        ).toFixed(0)
        : 0;

    const positionCounts = {};

    employees.forEach((employee) => {

        positionCounts[employee.position] =
            (positionCounts[employee.position] || 0) + 1;

    });

    const positionChartData =
        Object.keys(positionCounts).map(
            (position) => ({

                position,
                count: positionCounts[position]

            })
        );

    const recentEmployees =
        [...employees]
            .slice(-5)
            .reverse();



    const exportToExcel = () => {

    const worksheet =
        XLSX.utils.json_to_sheet(employees);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Employees"
    );

    const excelBuffer =
        XLSX.write(
            workbook,
            {
                bookType: "xlsx",
                type: "array"
            }
        );

    const fileData =
        new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        );

    saveAs(
        fileData,
        "Employee_Report.xlsx"
    );

};

const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
        "Employee Analytics Report",
        14,
        20
    );

    autoTable(doc, {

        startY: 35,

        head: [[
            "ID",
            "Name",
            "Department",
            "Position",
            "Salary",
            "Status"
        ]],

        body:

            employees.map(

                (employee) => [

                    employee.emp_id,

                    employee.name,

                    employee.department,

                    employee.position,

                    employee.salary,

                    employee.status

                ]

            )

    });

    doc.save(
        "Employee_Report.pdf"
    );

};
    return (

        <div>

            {/* Header */}

            <div className="mb-10">

                <h1
                    className="
                    text-4xl
                    font-bold
                    text-white
                    "
                >
                    Reports
                </h1>

                <p
                    className="
                    text-slate-400
                    mt-2
                    "
                >
                    Workforce analytics and insights
                </p>

            </div>

            {/* KPI Cards */}

            <div
                className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
                "
            >

                <DashboardCard
                    title="Total Employees"
                    value={
                        dashboardData.total_employees
                    }
                />

                <DashboardCard
                    title="Active Employees"
                    value={
                        dashboardData.active_employees
                    }
                />

                <DashboardCard
                    title="Average Salary"
                    value={`₹${averageSalary}`}
                />

            </div>

            {/* Charts */}

            <div
                className="
                grid
                lg:grid-cols-2
                gap-8
                mt-10
                "
            >

                <DepartmentOverview
                    employees={employees}
                />

                <StatusChart
                    dashboardData={dashboardData}
                />

            </div>

            <div className="mt-10">

                <PositionChart
                    positionChartData={
                        positionChartData
                    }
                />

            </div>

            {/* Recent Employees */}

            <div
                className="
                mt-10
                bg-slate-900
                border border-slate-800
                rounded-3xl
                p-8
                shadow-xl
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    text-white
                    mb-6
                    "
                >
                    Recent Employees
                </h2>

                <table className="w-full">

                    <thead>

                        <tr
                            className="
                            text-slate-400
                            border-b
                            border-slate-800
                            "
                        >

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Department
                            </th>

                            <th className="p-4 text-left">
                                Position
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            recentEmployees.map(
                                (employee) => (

                                    <tr
                                        key={
                                            employee.emp_id
                                        }
                                        className="
                                        border-b
                                        border-slate-800
                                        "
                                    >

                                        <td className="p-4">
                                            {employee.name}
                                        </td>

                                        <td className="p-4">
                                            {
                                                employee.department
                                            }
                                        </td>

                                        <td className="p-4">
                                            {
                                                employee.position
                                            }
                                        </td>

                                    </tr>

                                )
                            )

                        }

                    </tbody>

                </table>

            </div>

            <div
            className="
            flex
            justify-end
            gap-6
            mt-10
            "
        >

            <button

                onClick={exportToExcel}

                className="
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-emerald-500
                to-green-600
                text-white
                font-semibold
                shadow-lg
                hover:scale-105
                transition
                duration-300
                "
            >

                📊 Export Excel

            </button>

            <button

                onClick={downloadPDF}

                className="
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-red-500
                to-rose-600
                text-white
                font-semibold
                shadow-lg
                hover:scale-105
                transition
                duration-300
                "
            >

                📄 Download PDF

            </button>

        </div>

        </div>

    );

}

export default Reports;