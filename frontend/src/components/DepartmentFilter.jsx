function DepartmentFilter({ department, setDepartment }) {

    return (

       <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className=" w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 "
        >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Testing">Testing</option>
        </select>
    );

}

export default DepartmentFilter;