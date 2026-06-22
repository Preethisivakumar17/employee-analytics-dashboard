import { useState } from "react";
import { addEmployee } from "../services/employeeService";

function AddEmployee() {

    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async () => {

    try {

        const employeeData = {

            name,
            department,
            position,
            salary: Number(salary),
            status

        };

        await addEmployee(employeeData);

        alert("Employee added successfully!");

        setName("");
        setDepartment("");
        setPosition("");
        setSalary("");
        setStatus("");

    }

    catch (error) {

    console.log(error);

    console.log(error.response);

    alert("Failed to add employee");

}

};

    return (

        <div className="max-w-3xl mx-auto mt-12">
            <div className=" bg-slate-900/80 border border-slate-800 rounded-3xl p-10 shadow-2xl " >

            <h1 className="text-3xl font-bold text-white">
                Add Employee
            </h1>

            <p className="text-slate-400 mt-2">
                Create a new employee record
            </p>

           <div className="grid md:grid-cols-2 gap-6 mt-8">

                {/* Name */}
                <div>
                    <label className="block text-slate-400 mb-2">
                        Employee Name
                    </label>

                    <input
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        type="text"
                        placeholder="Enter employee name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Department */}
                <div>
                    <label className="block text-slate-400 mb-2">
                        Department
                    </label>

                    <select
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Testing">Testing</option>
                        <option value="Finance">Finance</option>
                        <option value="Designing">Designing</option>
                    </select>
                </div>

                {/* Position */}
                <div>
                    <label className="block text-slate-400 mb-2">
                        Position
                    </label>

                    <input
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        type="text"
                        placeholder="Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>

                {/* Salary */}
                <div>
                    <label className="block text-slate-400 mb-2">
                        Salary
                    </label>

                    <input
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        type="number"
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                    <label className="block text-slate-400 mb-2">
                        Status
                    </label>

                    <select
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Resigned">Resigned</option>
                    </select>
                </div>

            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className=" w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] hover:shadow-indigo-500/30 transition duration-300 " >
                Add Employee
            </button>
       </div>
    </div>

    );

}

export default AddEmployee;