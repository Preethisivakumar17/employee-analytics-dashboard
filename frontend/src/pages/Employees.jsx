import { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import SearchBar from "../components/SearchBar";
import DepartmentFilter from "../components/DepartmentFilter";
import PositionFilter from "../components/PositionFilter";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
    getEmployees,
    updateEmployee,
    deleteEmployee
} from "../services/employeeService";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;
    const [sortOption, setSortOption] = useState("");
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDepartment, setEditDepartment] = useState("");
    const [editPosition, setEditPosition] = useState("");
    const [editSalary, setEditSalary] = useState("");
    const [editStatus, setEditStatus] = useState("");

    useEffect(() => {

    setCurrentPage(1);

    }, [searchTerm, department, position]);

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
    
    const sortedEmployees = [...employees];

if (sortOption === "name") {

    sortedEmployees.sort(
        (a, b) => a.name.localeCompare(b.name)
    );

}

if (sortOption === "salaryLow") {

    sortedEmployees.sort(
        (a, b) => a.salary - b.salary
    );

}

if (sortOption === "salaryHigh") {

    sortedEmployees.sort(
        (a, b) => b.salary - a.salary
    );

}

   const filteredEmployees = sortedEmployees.filter(
    (employee) =>

        employee.name.toLowerCase().includes(
            searchTerm.toLowerCase()
        ) &&

        employee.department.toLowerCase().includes(
            department.toLowerCase()
        ) &&

        employee.position.toLowerCase().includes(
            position.toLowerCase()
        )


);

const indexOfLastEmployee =
    currentPage * employeesPerPage;

const indexOfFirstEmployee =
    indexOfLastEmployee - employeesPerPage;

const currentEmployees =
    filteredEmployees.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee
    );
console.log(employees);
console.log(filteredEmployees);
console.log(currentEmployees);

const totalPages = Math.ceil(
    filteredEmployees.length /
    employeesPerPage
);

const handleEdit = (employee) => {

     console.log("Edit clicked:", employee);

    setEditingEmployee(employee);

    setEditName(employee.name);

    setEditDepartment(employee.department);

    setEditPosition(employee.position);

    setEditSalary(employee.salary);

    setEditStatus(employee.status);

};

const handleUpdate = async () => {

    try {

        await updateEmployee(

            editingEmployee.emp_id,

            {

                name: editName,

                department: editDepartment,

                position: editPosition,

                salary: Number(editSalary),

                status: editStatus

            }

        );

        alert("Employee updated successfully!");

        fetchEmployees();

        setEditingEmployee(null);

    }

    catch (error) {

        console.log(error);

        alert("Failed to update employee");

    }

};

const handleDelete = async (empId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {

        return;

    }

    try {

        await deleteEmployee(empId);

        alert("Employee deleted successfully!");

        fetchEmployees();

    }

    catch (error) {

        console.log(error);

        alert("Failed to delete employee");

    }

};

const exportToExcel = () => {

    const excelData = employees.map((employee) => ({
        EmployeeID: employee.emp_id,
        Name: employee.name,
        Department: employee.department,
        Position: employee.position,
        Salary: employee.salary,
        Status: employee.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Employees"
    );

    const excelBuffer = XLSX.write(
        workbook,
        {
            bookType: "xlsx",
            type: "array"
        }
    );

    const file = new Blob(
        [excelBuffer],
        {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    saveAs(file, "employees.xlsx");

};

    return (

    <div className=" bg-slate-900 border border-slate-800 rounded-3xl p- shadow-xl ">
      {/* Header */}

            <div
                className="
                flex
                justify-between
                items-start
                px-8
                 py-8
                mb-10
                "
            >

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            Employees
                        </h1>

                        <p className="text-slate-400 mt-3 text-lg">
                            Manage your workforce
                        </p>

                    </div>

                        <button
                            onClick={exportToExcel}
                            className="
                            px-7
                            py-4
                            rounded-2xl
                            bg-gradient-to-r
                            from-emerald-500
                            to-green-600
                            text-white
                            font-semibold
                            text-lg
                            shadow-lg
                            hover:scale-105
                            hover:shadow-green-500/30
                            transition
                            duration-300
                            "
                        >
                            📥 Export Excel
                        </button>

                    </div>

        

        {/* Search Row */}

                    <div
                className="
                flex
                flex-wrap
                items-center
                gap-4
                mb-8
                "
            >

                <div className="flex-1 min-w-[260px]">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

                <div className="min-w-[220px]">
                    <DepartmentFilter
                        department={department}
                        setDepartment={setDepartment}
                    />
                </div>

                <div className="min-w-[220px]">
                    <PositionFilter
                        position={position}
                        setPosition={setPosition}
                    />
                </div>

                <div className="min-w-[220px]">
                    <select
                        className="
                        w-full
                        bg-slate-900
                        border border-slate-800
                        rounded-2xl
                        px-6 py-4
                        text-white
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                        "
                    >
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>On Leave</option>
                        <option>Resigned</option>
                    </select>
                </div>

                <button
                    onClick={() => {
                        setSearchTerm("");
                        setDepartment("");
                        setPosition("");
                    }}
                    className="
                    px-8 py-4
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-600
                    to-violet-600
                    text-white
                    font-semibold
                    shadow-lg
                    hover:scale-105
                    transition
                    duration-300
                    "
                >
                    ↻ Clear Filters
                </button>

            </div>
        {/* Table */}

        {
            currentEmployees.length > 0 ?

            (
            <>
                <EmployeeTable
                    employees={currentEmployees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                {editingEmployee && (

                        <div className="
                        mt-10
                        bg-slate-800
                        border border-slate-700
                        rounded-3xl
                        p-8
                        ">

                            <h2 className="text-2xl font-bold text-white mb-6">
                                Edit Employee
                            </h2>

                            <input
                                className="w-full p-3 rounded-xl bg-slate-900 text-white mb-4"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />

                            <input
                                className="w-full p-3 rounded-xl bg-slate-900 text-white mb-4"
                                value={editDepartment}
                                onChange={(e) => setEditDepartment(e.target.value)}
                            />

                            <input
                                className="w-full p-3 rounded-xl bg-slate-900 text-white mb-4"
                                value={editPosition}
                                onChange={(e) => setEditPosition(e.target.value)}
                            />

                            <input
                                className="w-full p-3 rounded-xl bg-slate-900 text-white mb-4"
                                value={editSalary}
                                onChange={(e) => setEditSalary(e.target.value)}
                            />

                            <input
                                className="w-full p-3 rounded-xl bg-slate-900 text-white mb-6"
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                            />

                            <button
                                className="
                                bg-indigo-600
                                px-6
                                py-3
                                rounded-2xl
                                text-white
                                font-semibold
                                hover:bg-indigo-500
                                "
                                onClick={handleUpdate}
                            >
                                Update Employee
                            </button>

                        </div>

                        )}
            </>
            ):


            (

                <EmptyState />

            )
        }

        {/* Pagination */}

        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
        />

    </div>

);
}

export default Employees;