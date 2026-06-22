
import StatusBadge from "./StatusBadge";
import { Pencil, Trash2 } from "lucide-react";




function EmployeeTable({employees,onEdit,onDelete
}) {
    if (employees.length === 0) {

        return <h3>No Employees Found</h3>;

}

    return (
    <div className="overflow-x-auto mt-8">
        <table className=" w-full overflow-hidden rounded-3xl bg-slate-900/70 border border-slate-800 ">

            <thead className=" sticky top-0 bg-slate-950 text-slate-400 ">

                <tr>

                    <th className="p-4 text-left">Employee ID</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Department</th>
                    <th className="p-4 text-left">Position</th>
                    <th className="p-4 text-left">Salary</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Actions</th>

                </tr>

            </thead>

            <tbody className="divide-y divide-slate-800">

                {

                    employees.map((employee) => (

                        <tr key={employee.emp_id} className=" hover:bg-slate-800/60 transition">

                            <td className="p-4">{employee.emp_id}</td>
                            <td className="p-4">{employee.name}</td>
                            <td className="p-4">{employee.department}</td>
                            <td className="p-4">{employee.position}</td>
                            <td className="p-4">{employee.salary}</td>
                            <td className="p-4"><StatusBadge status={employee.status}/></td>
                            <td className="p-4 flex gap-3">

                                    <button
                                        className=" text-indigo-400
                                        hover:text-indigo-300
                                        transition"
                                        onClick={() => {
                                        console.log("Edit clicked", employee);
                                        onEdit(employee);
                                         
                                        }}>
                                            <Pencil size={18} />

                                    </button>

                                    <button
                                        className="
                                        text-red-400
                                        hover:text-red-300
                                        transition
                                        "
                                        onClick={() =>
                                            onDelete(employee.emp_id)
                                        }
                                    >

                                        <Trash2 size={18} />

                                    </button>

                            </td>
                        </tr>

                    ))

                }

            </tbody>

        </table>

    </div>

    );



}

export default EmployeeTable;